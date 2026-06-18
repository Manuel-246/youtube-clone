import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoGrid from '../components/VideoGrid';
import VideoPlayer from '../components/VideoPlayer';
import { useVideoDetails } from '../hooks/useVideoDetails';
import {
  formatFullDate,
  formatLikeCount,
  formatViewCount,
} from '../utils/formatters';

export default function VideoDetails() {
  const { videoId } = useParams();
  const { video, relatedVideos, loading, error, reload } =
    useVideoDetails(videoId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!video) return <ErrorMessage message="Video not found." />;

  return (
    <section className="video-details">
      <VideoPlayer videoId={video.id} title={video.title} />

      <div className="video-details__content">
        <h1 className="video-details__title">{video.title}</h1>

        <div className="video-details__stats">
          <span>{formatViewCount(video.viewCount)}</span>
          <span>{formatLikeCount(video.likeCount)} likes</span>
          <span>{formatFullDate(video.publishedAt)}</span>
        </div>

        <div className="video-details__channel">
          <div className="channel-avatar" aria-hidden="true">
            {video.channelTitle.charAt(0).toUpperCase()}
          </div>
          <div>
            <Link to={`/search?q=${encodeURIComponent(video.channelTitle)}`}>
              {video.channelTitle}
            </Link>
          </div>
        </div>

        <div className="video-details__description">
          <p>{video.description || 'No description available.'}</p>
        </div>
      </div>

      {relatedVideos.length > 0 && (
        <div className="related-videos">
          <h2>Related videos</h2>
          <VideoGrid videos={relatedVideos} />
        </div>
      )}
    </section>
  );
}
