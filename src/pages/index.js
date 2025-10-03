import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    window.location.href = `/api/search?q=${encodeURIComponent(search)}`;
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">Rafzhost API</h1>
        <p className="subtitle">Simple • Fast • Free</p>
      </header>

      {/* Search */}
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Search endpoint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn">
          Cari
        </button>
      </form>

      {/* Menu */}
      <nav className="nav">
        <Link href="/docs" className="btn nav-btn">
          📘 Docs
        </Link>
        <Link href="/post" className="btn nav-btn">
          📰 Post
        </Link>
      </nav>

      {/* Safe Mode */}
      <section className="card">
        <h2 className="card-title">🔒 Safe Mode</h2>
        <p className="card-text">
          Safe Mode membantu memfilter konten agar lebih aman digunakan.
        </p>
      </section>

      {/* Watermark */}
      <div className="watermark">© 2025 Rafzhost API</div>

      {/* Thanks to */}
      <div className="thanks centered">
        <a
          href="https://github.com/siputzx/apisku"
          target="_blank"
          rel="noopener noreferrer"
          className="thanks-link"
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
            focusable="false"
            className="github-icon"
          >
            {/* GitHub icon path */}
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 
                 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
                 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94 
                 -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53 
                 .63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66 
                 .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
                 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
                 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 
                 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 
                 2.12.51.56.82 1.27.82 2.15 
                 0 3.07-1.87 3.75-3.65 3.95 
                 .29.25.54.73.54 1.48 
                 0 1.07-.01 1.93-.01 2.2 
                 0 .21.15.46.55.38A8.013 8.013 0 0016 8 
                 c0-4.42-3.58-8-8-8z"
            />
          </svg>
          Siputzx for source code
        </a>
      </div>
    </div>
  );
}
