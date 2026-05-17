import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { StarMap } from '../components/StarMap';
import { ListView } from '../components/ListView';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const [viewMode, setViewMode] = useState<'map' | 'list'>(viewParam === 'list' ? 'list' : 'map');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
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
