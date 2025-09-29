// components/ThemeSwitcher.js
import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";

const presetColors = [
  "#4f46e5", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system"); // light/dark/custom/system
  const [customColor, setCustomColor] = useState("#4f46e5");
  const [previewColor, setPreviewColor] = useState(customColor);

  useEffect(() => {
    const savedTheme = localStorage.getItem("rafz-theme");
    const savedColor = localStorage.getItem("rafz-custom-color");
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setCustomColor(savedColor);
    applyTheme(savedTheme || "system", savedColor || customColor);
  }, []);

  const applyTheme = (t, color) => {
    const root = document.documentElement;
    if (t === "light") {
      root.style.setProperty("--bg-color", "#ffffff");
      root.style.setProperty("--text-color", "#111827");
    } else if (t === "dark") {
      root.style.setProperty("--bg-color", "#1e1e2f");
      root.style.setProperty("--text-color", "#e0e0ff");
    } else if (t === "custom") {
      root.style.setProperty("--bg-color", color);
      root.style.setProperty("--text-color", "#fff");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  };

  const handleChange = (value) => {
    setTheme(value);
    localStorage.setItem("rafz-theme", value);
    applyTheme(value, customColor);
  };

  const handleCustomColor = (color) => {
    setPreviewColor(color); // preview dulu
  };

  const applyCustomColor = (color) => {
    setCustomColor(color);
    localStorage.setItem("rafz-custom-color", color);
    applyTheme("custom", color);
  };

  return (
    <div style={{ marginBottom: 15, textAlign: "center" }}>
      <label>Theme: </label>
      <select value={theme} onChange={e => handleChange(e.target.value)} style={{ padding: 5, marginRight: 10 }}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="custom">Custom</option>
      </select>

      {theme === "custom" && (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 5 }}>
            {presetColors.map(color => (
              <div
                key={color}
                className="theme-preview"
                style={{ backgroundColor: color }}
                onClick={() => applyCustomColor(color)}
                title="Click to apply color"
              />
            ))}
            <ColorPicker value={previewColor} onChange={handleCustomColor} />
            <button
              onClick={() => applyCustomColor(previewColor)}
              style={{
                padding: "6px 12px",
                marginLeft: 5,
                borderRadius: 6,
                background: "#111827",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s"
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
