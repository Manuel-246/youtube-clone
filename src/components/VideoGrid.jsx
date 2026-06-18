import VideoCard from './VideoCard';

export default function VideoGrid({ videos, emptyMessage = 'No videos found.' }) {
  if (!videos.length) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
