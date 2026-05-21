import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright smoke + visual-regression suite for Lofty Labz.
 *
 * Boots the production `vite preview` server, walks every route at three
 * viewports (desktop / tablet / mobile), captures full-page screenshots,
 * and asserts:
 *   - HTTP < 400 for the SPA shell
 *   - at least one <h1> rendered (some pages use sr-only)
 *   - document.title is non-empty
 *   - zero console errors and zero unhandled page errors
 *
 * Screenshots land in test-results/screenshots so a human (or the next
 * agent pass) can eyeball them for layout drift.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/report.json' }],
  ],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
