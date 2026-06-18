import { useCallback, useEffect, useState } from 'react';
import { getVideoDetails, searchVideos } from '../api/youtube';

export function useVideoDetails(videoId) {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await getVideoDetails(videoId);
      setVideo(details);

      const keywords = details.title.split(' ').slice(0, 4).join(' ');
      const related = await searchVideos(keywords, 8);
      setRelatedVideos(related.filter((item) => item.id !== videoId));
    } catch (err) {
      setVideo(null);
      setRelatedVideos([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await getVideoDetails(videoId);
        if (!active) return;
        setVideo(details);

        const keywords = details.title.split(' ').slice(0, 4).join(' ');
        const related = await searchVideos(keywords, 8);
        if (!active) return;
        setRelatedVideos(related.filter((item) => item.id !== videoId));
      } catch (err) {
        if (!active) return;
        setVideo(null);
        setRelatedVideos([]);
        setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [videoId]);

  return { video, relatedVideos, loading, error, reload };
}
