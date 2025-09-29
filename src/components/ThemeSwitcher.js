// src/components/ThemeSwitcher.js
import { useEffect, useState } from "react";

const defaultThemes = {
  light: {
    "--bg-color": "#ffffff",
    "--text-color": "#111827",
    "--primary-color": "#4f46e5",
    "--primary-hover": "#3730a3",
    "--secondary-color": "#10b981",
    "--secondary-hover": "#047857",
    "--accent-color": "#3b82f6",
    "--accent-hover": "#1e40af",
  },
  dark: {
    "--bg-color": "#1f2937",
    "--text-color": "#f9fafb",
    "--primary-color": "#6366f1",
    "--primary-hover": "#4f46e5",
    "--secondary-color": "#34d399",
    "--secondary-hover": "#10b981",
    "--accent-color": "#60a5fa",
    "--accent-hover": "#3b82f6",
  },
};

export default function ThemeSwitcher() {
  const [themeMode, setThemeMode] = useState("system");
  const [customTheme, setCustomTheme] = useState(defaultThemes.light);

  // Apply theme
  const applyTheme = (theme) => {
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
  };

  // Load saved theme
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    const savedCustom = localStorage.getItem("customTheme");
    if (savedMode) setThemeMode(savedMode);
    if (savedCustom) setCustomTheme(JSON.parse(savedCustom));

    updateTheme(savedMode || "system", savedCustom ? JSON.parse(savedCustom) : null);
  }, []);

  const updateTheme = (mode, custom = null) => {
    let themeToApply;
    if (mode === "light") themeToApply = defaultThemes.light;
    else if (mode === "dark") themeToApply = defaultThemes.dark;
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      themeToApply = prefersDark ? defaultThemes.dark : defaultThemes.light;
    }

    if (mode === "custom" && custom) themeToApply = custom;
    applyTheme(themeToApply);
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);
    updateTheme(mode, customTheme);
  };

  const handleCustomChange = (key, value) => {
    const updated = { ...customTheme, [key]: value };
    setCustomTheme(updated);
    localStorage.setItem("customTheme", JSON.stringify(updated));
    if (themeMode === "custom") applyTheme(updated);
  };

  const colorKeys = [
    "--bg-color",
    "--text-color",
    "--primary-color",
    "--primary-hover",
    "--secondary-color",
    "--secondary-hover",
    "--accent-color",
    "--accent-hover",
  ];

  return (
    <div style={{ padding: "15px" }}>
      <h3>Theme Mode</h3>
      <select value={themeMode} onChange={handleModeChange} style={{ padding: "5px 10px", marginBottom: "15px" }}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="custom">Custom</option>
      </select>

      {themeMode === "custom" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {colorKeys.map((key) => (
            <div key={key}>
              <label style={{ fontSize: "12px" }}>{key.replace("--", "")}</label>
              <input
                type="color"
                value={customTheme[key]}
                onChange={(e) => handleCustomChange(key, e.target.value)}
                style={{ width: "40px", height: "30px", padding: 0, border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
