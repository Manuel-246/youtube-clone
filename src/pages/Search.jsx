import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../api/youtube';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoGrid from '../components/VideoGrid';
import { useVideos } from '../hooks/useVideos';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const fetchResults = useCallback(
    () => searchVideos(query),
    [query],
  );

  const { videos, loading, error, reload } = useVideos(fetchResults);

  if (!query.trim()) {
    return (
      <section>
        <h1 className="page-title">Search</h1>
        <p className="empty-state">Enter a keyword to search for videos.</p>
      </section>
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h1 className="page-title">Results for &quot;{query}&quot;</h1>
      <VideoGrid
        videos={videos}
        emptyMessage={`No videos found for "${query}".`}
      />
    </section>
  );
}
