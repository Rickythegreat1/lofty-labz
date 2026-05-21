import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';

const SCREENSHOT_DIR = path.join('test-results', 'screenshots');

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-375', width: 375, height: 812 },
] as const;

interface RouteSpec {
  path: string;
  label: string;
  /** When true, do not pre-dismiss the hero. Only meaningful on `/`. */
  keepHero?: boolean;
}

const ROUTES: RouteSpec[] = [
  { path: '/', label: 'home-hero-visible', keepHero: true },
  { path: '/', label: 'home-map' },
  { path: '/?view=list', label: 'home-list' },
  { path: '/the-north-star', label: 'north-star' },
  { path: '/the-lab', label: 'the-lab' },
  { path: '/hailing-frequency', label: 'hailing-frequency' },
  { path: '/coordinates', label: 'coordinates' },
  { path: '/transmissions', label: 'transmissions' },
  {
    path: '/transmissions/why-your-agencys-case-studies-are-propaganda',
    label: 'transmission-detail',
  },
  { path: '/constellation/the-build', label: 'constellation-the-build' },
  { path: '/constellation/the-voice', label: 'constellation-the-voice' },
  { path: '/constellation/the-signal', label: 'constellation-the-signal' },
  { path: '/constellation/the-engine', label: 'constellation-the-engine' },
  { path: '/constellation/the-lighthouse', label: 'constellation-the-lighthouse' },
  { path: '/constellation/the-reel', label: 'constellation-the-reel' },
  { path: '/star/champro-merch-builder', label: 'star-champro-merch-builder' },
  { path: '/star/bright-path-wellness', label: 'star-bright-path-wellness' },
  { path: '/bogus-route-404', label: 'not-found' },
];

function attachConsoleCapture(page: Page): { errors: string[] } {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    errors.push(`[pageerror] ${err.message}`);
  });
  page.on('requestfailed', (req) => {
    // Vite preview serves SPA fallback, so 404s are unexpected for assets.
    const url = req.url();
    if (url.startsWith('http://localhost:4173') && req.failure()) {
      errors.push(`[requestfailed] ${url} :: ${req.failure()?.errorText}`);
    }
  });
  return { errors };
}

test.describe('Smoke + visual regression', () => {
  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route.label} @ ${viewport.name}`, async ({ page }) => {
        if (!route.keepHero) {
          await page.addInitScript(() => {
            window.localStorage.setItem(
              'lofty-hero-dismissed:v1',
              Date.now().toString()
            );
          });
        }
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });

        const { errors } = attachConsoleCapture(page);

        const response = await page.goto(route.path);
        expect(response, 'navigation response').not.toBeNull();
        expect(
          response!.status(),
          `HTTP status for ${route.path}`
        ).toBeLessThan(400);

        await page.waitForLoadState('networkidle', { timeout: 15_000 });

        // Some lazy-loaded routes mount their <h1> a tick after networkidle.
        // Wait for at least one h1 to attach before counting.
        await page
          .locator('h1')
          .first()
          .waitFor({ state: 'attached', timeout: 5_000 });

        const h1Count = await page.locator('h1').count();
        expect(h1Count, `expected at least one <h1> on ${route.path}`).toBeGreaterThanOrEqual(1);

        const title = await page.title();
        expect(title.length, `<title> set on ${route.path}`).toBeGreaterThan(0);

        const description = await page
          .locator('meta[name="description"]')
          .getAttribute('content');
        expect(
          description && description.length > 0,
          `<meta name="description"> set on ${route.path}`
        ).toBeTruthy();

        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `${route.label}-${viewport.name}.png`),
          fullPage: true,
          animations: 'disabled',
        });

        expect(
          errors,
          `no console / page / request errors on ${route.path}`
        ).toEqual([]);
      });
    }
  }
});

test.describe('Interaction flows', () => {
  test('hero is visible on first load and dismisses on explicit click', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#hero-headline')).toBeVisible();
    await expect(page.locator('#hero-headline')).toHaveText(
      'A digital lab in Phoenix. Every engagement, in writing.'
    );

    await expect(
      page.getByRole('link', { name: /Schedule a discovery call/ })
    ).toBeVisible();

    await page
      .getByRole('button', { name: /Dismiss hero and explore the constellation map/i })
      .click();

    await expect(page.locator('#hero-headline')).toHaveCount(0, { timeout: 5_000 });
    await expect(
      page.getByRole('link', { name: /Book a call/ })
    ).toBeVisible({ timeout: 5_000 });
  });

  test('Escape also dismisses the hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.keyboard.press('Escape');

    await expect(
      page.getByRole('link', { name: /Book a call/ })
    ).toBeVisible({ timeout: 5_000 });
  });

  test('hero dismissal persists across reloads (7-day cooldown)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('link', { name: /Book a call/ })
    ).toBeVisible();

    await page.reload();
    await page.waitForLoadState('networkidle');
    // The hero's #hero-headline node should not mount at all on the reload.
    await expect(page.locator('#hero-headline')).toHaveCount(0);
  });

  test('view toggle switches between map and list', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'lofty-hero-dismissed:v1',
        Date.now().toString()
      );
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page
      .getByRole('button', { name: /Toggle between star map and list view/i })
      .click();

    await page.waitForLoadState('networkidle');
    await expect(
      page.getByRole('heading', { name: /Lofty Labz/i }).first()
    ).toBeVisible();
  });

  test('skip link focuses main on Tab', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'lofty-hero-dismissed:v1',
        Date.now().toString()
      );
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      return el
        ? { tag: el.tagName, text: el.textContent?.trim() ?? '', href: el.getAttribute('href') ?? '' }
        : null;
    });
    expect(focused?.text).toMatch(/Skip to main content/i);
    expect(focused?.href).toBe('#main-content');
  });
});

test.describe('Star slug coverage (every star resolves)', () => {
  // Canonical star IDs from data/constellations.ts. Each is exercised
  // directly to ensure /star/:id always renders a real case study (not the
  // "Case study not found" fallback).
  const STAR_IDS = [
    // The Build (3 real)
    'champro-merch-builder',
    'edutrack-dashboard',
    'nexus',
    // The Voice (placeholder)
    'bright-path-wellness',
    'valley-ventures',
    'local-goods-market',
    // The Signal (placeholder)
    'az-auto-repair',
    'cactus-creative',
    'phoenix-fitness',
    // The Engine (1 real, 2 placeholder)
    'champro-asset-pipeline',
    'lead-qualifier-ai',
    'content-pipeline',
    // The Lighthouse (placeholder)
    'scottsdale-medical',
    'desert-dining',
    'valley-tech-hub',
    // The Reel (3 real)
    'easy-ice',
    'podunkton-2d',
    'iupui-math-center',
  ];

  for (const id of STAR_IDS) {
    test(`star ${id} resolves`, async ({ page }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem(
          'lofty-hero-dismissed:v1',
          Date.now().toString()
        );
      });
      await page.setViewportSize({ width: 1440, height: 900 });
      const { errors } = attachConsoleCapture(page);
      // Legacy /star/:slug path redirects through StarRedirect into the
      // nested URL shape. After the redirect, the document title should
      // reflect the real case study identity.
      await page.goto(`/star/${id}`);
      await page.waitForLoadState('networkidle');
      const title = (await page.title()) ?? '';
      expect(
        title.toLowerCase(),
        `star id "${id}" should resolve to a real case study`
      ).not.toMatch(/case study not found|not found/);
      expect(errors).toEqual([]);
    });
  }
});

test.describe('Link integrity from rendered pages', () => {
  // Each test walks 15+ links sequentially. Bump well above the default 30s.
  test.setTimeout(180_000);

  test('list view links to nested /constellation/:slug/star/:starId (must match data IDs)', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'lofty-hero-dismissed:v1',
        Date.now().toString()
      );
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/?view=list');
    await page.waitForLoadState('networkidle');

    // After the in-place rewrite, ListView links into the nested URL shape:
    //   /constellation/:slug/star/:starId
    // rather than the flat /star/:id path. The legacy /star/:slug path still
    // works — it redirects through StarRedirect — but ListView authors links
    // in the canonical nested form.
    const hrefs = await page
      .locator('a[href*="/star/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));

    expect(hrefs.length, 'at least one star link rendered').toBeGreaterThan(0);

    for (const href of hrefs) {
      const newPage = await page.context().newPage();
      await newPage.goto(href);
      await newPage.waitForLoadState('networkidle');
      const title = (await newPage.title()) ?? '';
      expect(
        title.toLowerCase(),
        `list-view link "${href}" must resolve to a real case study`
      ).not.toMatch(/case study not found|not found/);
      await newPage.close();
    }
  });

  test('every constellation card on the list view resolves', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'lofty-hero-dismissed:v1',
        Date.now().toString()
      );
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/?view=list');
    await page.waitForLoadState('networkidle');

    const hrefs = await page
      .locator('a[href^="/constellation/"]')
      .evaluateAll((els) =>
        Array.from(new Set(els.map((el) => el.getAttribute('href') ?? '')))
      );

    expect(hrefs.length, 'at least one constellation link rendered').toBeGreaterThan(0);

    for (const href of hrefs) {
      const newPage = await page.context().newPage();
      await newPage.goto(href);
      await newPage.waitForLoadState('networkidle');
      const status = await newPage.evaluate(() => document.title);
      expect(
        status.toLowerCase(),
        `constellation link "${href}" must not 404`
      ).not.toMatch(/not found/);
      await newPage.close();
    }
  });
});
