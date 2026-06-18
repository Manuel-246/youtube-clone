import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function Header({ onMenuClick }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          className="icon-button header__menu"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">▶</span>
          <span>YouTube Clone</span>
        </Link>
      </div>

      <form className="header__search" onSubmit={handleSubmit}>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search videos..."
          aria-label="Search videos"
        />
        <button type="submit" aria-label="Submit search">
          🔍
        </button>
      </form>

      <div className="header__actions">
        <button
          type="button"
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
