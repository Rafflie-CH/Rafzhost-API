import { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  const [theme, setTheme] = useState("system");
  const [customColor, setCustomColor] = useState("#6a0dad");
  const [loading, setLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ambil setting awal + deteksi koneksi
  useEffect(() => {
    const savedTheme = localStorage.getItem("swagger-theme");
    const savedColor = localStorage.getItem("swagger-custom-color");
    const savedMotion = localStorage.getItem("swagger-reduced-motion");

    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setCustomColor(savedColor);
    if (savedMotion === "true") setReducedMotion(true);

    // Auto hemat animasi jika koneksi lambat
    if (navigator.connection && navigator.connection.downlink < 1.5) {
      setReducedMotion(true);
    }

    // Deteksi ukuran layar
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // jalankan saat load
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setLoading(false), 800);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Terapkan tema
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-custom");

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(isDark ? "theme-dark" : "theme-light");
    } else {
      root.classList.add(`theme-${theme}`);
    }

    localStorage.setItem("swagger-theme", theme);
    localStorage.setItem("swagger-custom-color", customColor);
    localStorage.setItem("swagger-reduced-motion", reducedMotion);
  }, [theme, customColor, reducedMotion]);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Toolbar */}
      <div
        style={{
          padding: "10px",
          background: "var(--toolbar-bg, #f0f0f0)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "10px",
          alignItems: isMobile ? "stretch" : "center",
          borderBottom: "1px solid #ccc",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <label>🎨 Tema:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="system">🖥️ Sistem</option>
          <option value="light">🌞 Terang</option>
          <option value="dark">🌙 Gelap</option>
          <option value="custom">✨ Custom</option>
        </select>

        {theme === "custom" && (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
            />
            <button
              onClick={() => setCustomColor("#6a0dad")}
              style={{
                background: "#eee",
                border: "1px solid #aaa",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Reset 🎯
            </button>
          </div>
        )}

        {/* Tombol Hemat Animasi */}
        <label style={{ marginLeft: isMobile ? "0" : "auto", display: "flex", gap: "5px" }}>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
          />
          Hemat Animasi ⚡
        </label>
      </div>

      {/* Loading Screen */}
      {loading && (
        <div className="loading-overlay">
          {reducedMotion ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="spinner"></div>
              <p>Sedang memuat dokumentasi API...</p>
            </>
          )}
        </div>
      )}

      {/* Swagger UI */}
      {!loading && (
        <SwaggerUI
          url="/swagger.json"
          docExpansion="none"
          defaultModelsExpandDepth={-1}
        />
      )}

      {/* CSS */}
      <style jsx global>{`
        body,
        .swagger-ui {
          transition: ${reducedMotion
            ? "none"
            : "background 0.3s ease, color 0.3s ease"};
        }

        /* Loading */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: ${reducedMotion
            ? "#000"
            : "linear-gradient(135deg, #6a0dad, #000)"};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          z-index: 2000;
          text-align: center;
          padding: 20px;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Light */
        .theme-light body {
          background: #fff !important;
          color: #000 !important;
          --toolbar-bg: #f0f0f0;
        }

        /* Dark */
        .theme-dark body {
          background: #121212 !important;
          color: #e0e0e0 !important;
          --toolbar-bg: #1e1e1e;
        }

        /* Custom */
        .theme-custom body {
          background: var(--custom-bg, #1b0033) !important;
          color: var(--custom-text, #fff) !important;
          --toolbar-bg: var(--custom-accent, #2b0055);
        }

        .theme-custom {
          --custom-bg: ${customColor}33;
          --custom-accent: ${customColor};
          --custom-text: #fff;
        }

        /* Mobile tweaks */
        @media (max-width: 768px) {
          .swagger-ui {
            font-size: 14px;
          }
          .swagger-ui .topbar {
            display: none; /* sembunyikan bar bawaan swagger di mobile */
          }
        }
      `}</style>
    </div>
  );
}
