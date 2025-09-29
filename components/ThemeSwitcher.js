// components/ThemeSwitcher.js
import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system"); // light/dark/custom/system
  const [customColor, setCustomColor] = useState("#4f46e5");

  useEffect(() => {
    const savedTheme = localStorage.getItem("rafz-theme");
    const savedColor = localStorage.getItem("rafz-custom-color");
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setCustomColor(savedColor);
    applyTheme(savedTheme || "system", savedColor || customColor);
  }, []);

  const applyTheme = (t, color) => {
    let root = document.documentElement;
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
      // system
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
      {theme === "custom" && <ColorPicker value={customColor} onChange={handleCustomColor} />}
    </div>
  );
}
