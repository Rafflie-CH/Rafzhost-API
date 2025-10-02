// src/pages/post.js
import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function PostDocs() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "system";
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    } else {
      document.documentElement.classList.toggle(
        "dark",
        selectedTheme === "dark"
      );
    }
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-xl font-bold">📮 POST API Documentation</h1>
        <select
          value={theme}
          onChange={(e) => applyTheme(e.target.value)}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      {/* SwaggerUI konsumsi dari /api/swagger */}
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
