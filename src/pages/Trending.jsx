import { getTrendingVideos } from '../api/youtube';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoGrid from '../components/VideoGrid';
import { useVideos } from '../hooks/useVideos';

export default function Trending() {
  const { videos, loading, error, reload } = useVideos(getTrendingVideos);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h1 className="page-title">Trending</h1>
      <VideoGrid videos={videos} />
    </section>
  );
}
