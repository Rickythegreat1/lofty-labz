import { createBrowserRouter } from 'react-router';
import Root from './layouts/Root';
import HomePage from './pages/HomePage';

/**
 * Routing model after the in-place rewrite.
 *
 *   /                                    -> map view
 *   /constellation/:slug                 -> map with `slug` constellation expanded
 *   /constellation/:slug/star/:starSlug  -> expanded constellation + star panel open
 *   /star/:slug                          -> legacy redirect path; StarMap resolves
 *                                           the star's parent constellation and
 *                                           opens both. Kept so old shared links
 *                                           still land somewhere coherent.
 *
 * The StarMap reads URL params via useParams() and derives its state. There
 * is no separate ConstellationPage or StarPage anymore — they're modes of
 * the same component.
 *
 * HomePage stays eager because it serves all four URL shapes above and the
 * landing experience must not pay a chunk-fetch latency cost.
 */
const lazyDefault = (loader: () => Promise<{ default: React.ComponentType<unknown> }>) =>
  async () => ({ Component: (await loader()).default });

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'constellation/:slug', Component: HomePage },
      { path: 'constellation/:slug/star/:starSlug', Component: HomePage },
      {
        path: 'star/:legacyStarSlug',
        lazy: lazyDefault(() => import('./pages/StarRedirect')),
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
