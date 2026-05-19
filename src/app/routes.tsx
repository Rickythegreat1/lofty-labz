import { createBrowserRouter } from 'react-router';
import Root from './layouts/Root';
import HomePage from './pages/HomePage';

/**
 * Phase 4 / #39 — code-split every non-landing route.
 *
 * HomePage stays eager because it's the entry-point experience and we don't
 * want to pay a chunk-fetch latency cost on first paint. Everything else
 * routes through `lazy: async ()` so the initial bundle only ships the
 * landing star-map shell and each detail page arrives just-in-time.
 */
const lazyDefault = (loader: () => Promise<{ default: React.ComponentType<unknown> }>) =>
  async () => ({ Component: (await loader()).default });

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'constellation/:slug',
        lazy: lazyDefault(() => import('./pages/ConstellationPage')),
      },
      {
        path: 'star/:slug',
        lazy: lazyDefault(() => import('./pages/StarPage')),
      },
      {
        path: 'the-north-star',
        lazy: lazyDefault(() => import('./pages/NorthStarPage')),
      },
      {
        path: 'the-lab',
        lazy: lazyDefault(() => import('./pages/TheLabPage')),
      },
      {
        path: 'the-lab/:section',
        lazy: lazyDefault(() => import('./pages/TheLabPage')),
      },
      {
        path: 'transmissions',
        lazy: lazyDefault(() => import('./pages/TransmissionsPage')),
      },
      {
        path: 'transmissions/:slug',
        lazy: lazyDefault(() => import('./pages/TransmissionDetailPage')),
      },
      {
        path: 'hailing-frequency',
        lazy: lazyDefault(() => import('./pages/HailingFrequencyPage')),
      },
      {
        path: 'coordinates',
        lazy: lazyDefault(() => import('./pages/CoordinatesPage')),
      },
      {
        path: '*',
        lazy: lazyDefault(() => import('./pages/NotFoundPage')),
      },
    ],
  },
]);
