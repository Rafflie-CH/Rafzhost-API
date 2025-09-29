import React, { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  const [theme, setTheme] = useState("light");
  const [customColor, setCustomColor] = useState("#4cafef");

  useEffect(() => {
    let style = document.getElementById("swagger-theme");
    if (!style) {
      style = document.createElement("style");
      style.id = "swagger-theme";
      document.head.appendChild(style);
    }

    if (theme === "dark") {
      style.innerHTML = `
        body { background: #000 !important; color: #eee !important; }
        .swagger-ui .topbar { background: #111 !important; }
        .swagger-ui .opblock { background: #111 !important; border-color: #333 !important; }
        .swagger-ui .response-col_status { color: #66ccff !important; }
        .swagger-ui { filter: invert(0.95) hue-rotate(180deg); }
        .swagger-ui img { filter: invert(1) hue-rotate(180deg); }
      `;
    } else if (theme === "custom") {
      style.innerHTML = `
        body { background: #fff !important; color: #222 !important; }
        .swagger-ui .topbar { background: ${customColor} !important; }
        .swagger-ui .opblock { border-color: ${customColor} !important; }
        .swagger-ui .response-col_status { color: ${customColor} !important; }
      `;
    } else {
      style.innerHTML = ``; // reset ke swagger bawaan
    }
  }, [theme, customColor]);

  return (
    <div>
      <div style={{ padding: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
        <label>Tema:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">🌞 Terang</option>
          <option value="dark">🌙 Gelap Pekat</option>
          <option value="custom">🎨 Custom</option>
        </select>
        {theme === "custom" && (
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
          />
        )}
      </div>
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
