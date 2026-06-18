import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeProvider';
import Category from './pages/Category';
import Home from './pages/Home';
import Search from './pages/Search';
import Trending from './pages/Trending';
import VideoDetails from './pages/VideoDetails';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="trending" element={<Trending />} />
            <Route path="search" element={<Search />} />
            <Route path="category/:categoryName" element={<Category />} />
            <Route path="watch/:videoId" element={<VideoDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
