# YouTube Clone Web Application

A modern, responsive YouTube clone built with React that integrates with the YouTube Data API v3. Search, browse trending content, watch videos, filter by category, and switch between dark and light themes.

## Features

- **Video search** — Find videos by keyword
- **Trending videos** — Browse popular content on Home and Trending pages
- **Video playback** — Embedded YouTube player on the watch page
- **Video details** — Title, description, channel, views, likes, and publish date
- **Category browsing** — Music, Gaming, Sports, News, and Movies
- **Navigation** — Sidebar with Home, Trending, and category links
- **Dark / light theme** — Toggle persisted in localStorage
- **Responsive design** — Desktop, tablet, and mobile layouts

## Tech Stack

- React 19
- Vite
- React Router DOM
- Axios
- YouTube Data API v3

## Prerequisites

- Node.js 18+
- npm
- A [YouTube Data API v3 key](https://console.cloud.google.com/apis/credentials)

## Setup

1. Clone or navigate to the project directory:

   ```bash
   cd youtube-clone
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

4. Add your YouTube API key to `.env`:

   ```env
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the URL shown in the terminal (typically `http://localhost:5173`).

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Project Structure

```
src/
├── api/           # YouTube Data API service
├── components/    # Reusable UI components
├── context/       # Theme context provider
├── hooks/         # Custom React hooks
├── pages/         # Route pages
└── utils/         # Formatting helpers
```

## API Quota

The YouTube Data API has daily quota limits. Each search and video request consumes quota units. For development, keep requests reasonable and monitor usage in the Google Cloud Console.

## License

MIT

Run

https://youtube-clone-fj6p.vercel.app/
