import { Navigate, useParams } from 'react-router';
import { getStarById } from '../data/constellations';

/**
 * Legacy `/star/:slug` URL handler.
 *
 * Old shared links (and any external citations) hit this route. We resolve
 * the star's parent constellation and 301-equivalent into the nested URL
 * shape the new in-place model expects.
 */
export default function StarRedirect() {
  const { legacyStarSlug } = useParams<{ legacyStarSlug: string }>();
  if (!legacyStarSlug) {
    return <Navigate to="/" replace />;
  }
  const result = getStarById(legacyStarSlug);
  if (!result) {
    return <Navigate to="/" replace />;
  }
  return (
    <Navigate
      to={`/constellation/${result.constellation.id}/star/${result.star.id}`}
      replace
    />
  );
}
