import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const api = axios.create({
  baseURL: BASE_URL,
  params: { key: API_KEY },
});

export const CATEGORIES = {
  music: { id: '10', label: 'Music' },
  gaming: { id: '20', label: 'Gaming' },
  sports: { id: '17', label: 'Sports' },
  news: { id: '25', label: 'News' },
  movies: { id: '1', label: 'Movies' },
};

function assertApiKey() {
  if (!API_KEY || API_KEY === 'your_youtube_data_api_key_here') {
    throw new Error(
      'YouTube API key is missing. Add VITE_YOUTUBE_API_KEY to your .env file.',
    );
  }
}

function mapSearchItem(item) {
  return {
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    publishedAt: item.snippet.publishedAt,
    thumbnail:
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url,
    description: item.snippet.description,
  };
}

function mapVideoItem(item) {
  return {
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    publishedAt: item.snippet.publishedAt,
    thumbnail:
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url,
    description: item.snippet.description,
    viewCount: item.statistics?.viewCount,
    likeCount: item.statistics?.likeCount,
  };
}

function handleApiError(error) {
  if (error.response?.data?.error?.message) {
    throw new Error(error.response.data.error.message);
  }
  if (error.message) {
    throw new Error(error.message);
  }
  throw new Error('An unexpected error occurred while fetching videos.');
}

export async function searchVideos(query, maxResults = 24) {
  assertApiKey();
  try {
    const { data } = await api.get('/search', {
      params: {
        part: 'snippet',
        type: 'video',
        q: query,
        maxResults,
      },
    });
    return data.items.map(mapSearchItem);
  } catch (error) {
    handleApiError(error);
  }
}

export async function getTrendingVideos(maxResults = 24) {
  assertApiKey();
  try {
    const { data } = await api.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults,
      },
    });
    return data.items.map(mapVideoItem);
  } catch (error) {
    handleApiError(error);
  }
}

export async function getVideosByCategory(categoryId, maxResults = 24) {
  assertApiKey();
  try {
    const { data } = await api.get('/search', {
      params: {
        part: 'snippet',
        type: 'video',
        videoCategoryId: categoryId,
        maxResults,
        order: 'viewCount',
      },
    });
    return data.items.map(mapSearchItem);
  } catch (error) {
    handleApiError(error);
  }
}

export async function getVideoDetails(videoId) {
  assertApiKey();
  try {
    const { data } = await api.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: videoId,
      },
    });

    if (!data.items?.length) {
      throw new Error('Video not found.');
    }

    return mapVideoItem(data.items[0]);
  } catch (error) {
    handleApiError(error);
  }
}
