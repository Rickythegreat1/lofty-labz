import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { StarMap } from '../components/StarMap';
import { ListView } from '../components/ListView';
import { getConstellationById, getStarById } from '../data/constellations';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function HomePage() {
  const { slug, starSlug } = useParams<{ slug?: string; starSlug?: string }>();
  const expanded = slug ? getConstellationById(slug) : null;
  const star =
    expanded && starSlug
      ? expanded.stars.find((s) => s.id === starSlug)
      : starSlug
      ? getStarById(starSlug)?.star
      : null;

  // Metadata mirrors the URL state so deep-links produce real titles and
  // shareable previews.
  useDocumentMeta({
    title: star && expanded
      ? `${star.name} — ${star.metric} · ${expanded.name} · Lofty Labz`
      : expanded
      ? `${expanded.name} — ${expanded.practice} · Lofty Labz`
      : 'Lofty Labz — A digital lab in Phoenix. Every engagement, in writing.',
    description: star && expanded
      ? `${star.client} · ${star.metric}. A guaranteed outcome from the ${expanded.name} practice.`
      : expanded
      ? `${expanded.tagline} — ${expanded.description}`
      : 'Lofty Labz is a Phoenix digital agency. Five practices, one written guarantee on every engagement.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const [viewMode, setViewMode] = useState<'map' | 'list'>(viewParam === 'list' ? 'list' : 'map');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile the constellation map UX is disabled; ListView is the path.
      if (mobile && viewMode === 'map' && !viewParam) {
        setViewMode('list');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [viewMode, viewParam]);

  const toggleView = () => {
    const newView = viewMode === 'map' ? 'list' : 'map';
    setViewMode(newView);
    setSearchParams(newView === 'list' ? { view: 'list' } : {});
  };

  // Suppress unused-var warning for isMobile (kept for read clarity).
  void isMobile;

  return (
    <div className="size-full">
      {viewMode === 'map' ? (
        <StarMap onViewToggle={toggleView} />
      ) : (
        <ListView onViewToggle={toggleView} />
      )}
    </div>
  );
}
