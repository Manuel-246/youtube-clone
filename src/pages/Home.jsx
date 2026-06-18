import { getTrendingVideos } from '../api/youtube';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoGrid from '../components/VideoGrid';
import { useVideos } from '../hooks/useVideos';

export default function Home() {
  const { videos, loading, error, reload } = useVideos(getTrendingVideos);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h1 className="page-title">Recommended for you</h1>
      <VideoGrid videos={videos} />
    </section>
  );
}
