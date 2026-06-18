import { Link } from 'react-router-dom';
import { formatPublishedDate } from '../utils/formatters';

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video.id}`} className="video-card">
      <div className="video-card__thumbnail">
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
      </div>
      <div className="video-card__info">
        <h3 className="video-card__title">{video.title}</h3>
        <p className="video-card__channel">{video.channelTitle}</p>
        <p className="video-card__meta">
          {formatPublishedDate(video.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
