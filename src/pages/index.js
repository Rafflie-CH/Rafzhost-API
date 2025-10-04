import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("id");
  const [safeMode, setSafeMode] = useState(true);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header">
        <h1 className="logo">Rafzhost API</h1>
        <div className="header-controls">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="control-select"
          >
            <option value="id">ID</option>
            <option value="en">EN</option>
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="control-btn"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => setSafeMode(!safeMode)}
            className="control-btn"
          >
            {safeMode ? "Safe ✅" : "Unsafe ⚠️"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="page-main">
        <div className="card">
          <h2>Selamat datang di Rafzhost API 🚀</h2>
          <p>Gunakan navigasi di bawah untuk menjelajah API:</p>
          <div className="btn-row">
            <Link href="/docs" className="btn primary">📖 Docs</Link>
            <Link href="/post" className="btn outline">📝 Post</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-center">
          <p>© {new Date().getFullYear()} Rafzhost API</p>
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
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54..."
              ></path>
            </svg>
            Siputzx for source code
          </a>
        </div>
      </footer>

      {/* Watermark */}
      <div className="watermark">Rafzhost API</div>
    </div>
  );
}
