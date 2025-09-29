import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  const [theme, setTheme] = useState("system");
  const [customColor, setCustomColor] = useState("#ff9800");
  const [loading, setLoading] = useState(true);

  // Load preferensi dari localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedColor = localStorage.getItem("customColor");

    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setCustomColor(savedColor);
  }, []);

  // Atur tema sesuai pilihan user
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      root.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");

      const handler = (e) => {
        root.setAttribute("data-theme", e.matches ? "dark" : "light");
      };
      prefersDark.addEventListener("change", handler);

      return () => prefersDark.removeEventListener("change", handler);
    }

    if (theme === "custom") {
      root.setAttribute("data-theme", "custom");
      root.style.setProperty("--custom-accent", customColor);
      root.style.setProperty("--custom-bg", "#121212");
      root.style.setProperty("--custom-text", "#f1f1f1");
      root.style.setProperty("--custom-card", "#1e1e1e");
    } else {
      root.setAttribute("data-theme", theme);
    }

    // Simpan ke localStorage
    localStorage.setItem("theme", theme);
    if (theme === "custom") localStorage.setItem("customColor", customColor);
  }, [theme, customColor]);

  // Simulasi loading animasi
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Loading bar */}
      {loading && <div className="loading-bar"></div>}

      {/* Panel kontrol tema */}
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>⚙️ Pilih Tema</h2>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            marginRight: "0.5rem",
          }}
        >
          <option value="system">Ikuti Sistem 🌐</option>
          <option value="light">Terang 🌞</option>
          <option value="dark">Gelap 🌙</option>
          <option value="custom">Custom 🎨</option>
        </select>

        {/* Color Picker hanya muncul jika custom */}
        {theme === "custom" && (
          <label style={{ marginLeft: "1rem" }}>
            Pilih warna utama:
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              style={{
                marginLeft: "0.5rem",
                cursor: "pointer",
                border: "none",
                width: "40px",
                height: "30px",
                background: "transparent",
              }}
            />
          </label>
        )}
      </div>

      {/* Swagger UI */}
      {!loading && (
        <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
          <SwaggerUI url="/swagger.json" />
        </div>
      )}
    </div>
  );
}
