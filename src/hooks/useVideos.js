import { useCallback, useEffect, useState } from 'react';

export function useVideos(fetchFn) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFn();
      setVideos(data);
    } catch (err) {
      setVideos([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFn();
        if (!active) return;
        setVideos(data);
      } catch (err) {
        if (!active) return;
        setVideos([]);
        setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [fetchFn]);

  return { videos, loading, error, reload };
}
