import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORIES, getVideosByCategory } from '../api/youtube';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoGrid from '../components/VideoGrid';
import { useVideos } from '../hooks/useVideos';

export default function Category() {
  const { categoryName } = useParams();
  const category = CATEGORIES[categoryName];

  const fetchCategoryVideos = useCallback(async () => {
    if (!category) return [];
    return getVideosByCategory(category.id);
  }, [category]);

  const { videos, loading, error, reload } = useVideos(fetchCategoryVideos);

  if (!category) {
    return <ErrorMessage message="Category not found." />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h1 className="page-title">{category.label}</h1>
      <VideoGrid
        videos={videos}
        emptyMessage={`No ${category.label.toLowerCase()} videos found.`}
      />
    </section>
  );
}
