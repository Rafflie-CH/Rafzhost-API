import { useState, useEffect } from "react";

const themes = {
  system: {
    name: "Ikuti Sistem",
    apply: () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.style.setProperty("--bg-color", isDark ? "#1f2937" : "#ffffff");
      document.documentElement.style.setProperty("--text-color", isDark ? "#f9fafb" : "#111827");
      document.documentElement.style.setProperty("--primary-color", isDark ? "#6366f1" : "#4f46e5");
      document.documentElement.style.setProperty("--primary-hover", isDark ? "#4f46f0" : "#3730a3");
      document.documentElement.style.setProperty("--secondary-color", isDark ? "#10b981" : "#10b981");
    },
  },
  light: {
    name: "Terang",
    apply: () => {
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
      document.documentElement.style.setProperty("--text-color", "#111827");
      document.documentElement.style.setProperty("--primary-color", "#4f46e5");
      document.documentElement.style.setProperty("--primary-hover", "#3730a3");
      document.documentElement.style.setProperty("--secondary-color", "#10b981");
    },
  },
  dark: {
    name: "Gelap",
    apply: () => {
      document.documentElement.style.setProperty("--bg-color", "#1f2937");
      document.documentElement.style.setProperty("--text-color", "#f9fafb");
      document.documentElement.style.setProperty("--primary-color", "#6366f1");
      document.documentElement.style.setProperty("--primary-hover", "#4f46f0");
      document.documentElement.style.setProperty("--secondary-color", "#10b981");
    },
  },
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    // Load theme tersimpan di localStorage
    const saved = localStorage.getItem("rafzhost-theme");
    if (saved && themes[saved]) {
      setTheme(saved);
      themes[saved].apply();
    } else {
      themes.system.apply();
    }
  }, []);

  const handleChange = (key) => {
    setTheme(key);
    themes[key].apply();
    localStorage.setItem("rafzhost-theme", key);
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
      {Object.keys(themes).map((key) => (
        <button
          key={key}
          onClick={() => handleChange(key)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: theme === key ? "2px solid var(--primary-color)" : "1px solid #ccc",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {themes[key].name}
        </button>
      ))}
    </div>
  );
}
