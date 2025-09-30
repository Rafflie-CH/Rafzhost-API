"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);

  // Aman dari error saat SSR
  if (!themeContext) {
    return null;
  }

  const { theme, setTheme } = themeContext;

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
    >
      <option value="system">Ikuti Sistem</option>
      <option value="light">Terang</option>
      <option value="dark">Gelap</option>
    </select>
  );
}
