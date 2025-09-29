import React, { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  const [theme, setTheme] = useState("light");

  // inject CSS sesuai tema
  useEffect(() => {
    let style = document.getElementById("swagger-theme");
    if (!style) {
      style = document.createElement("style");
      style.id = "swagger-theme";
      document.head.appendChild(style);
    }

    if (theme === "dark") {
      style.innerHTML = `
        body { background: #121212 !important; color: #fff !important; }
        .swagger-ui .topbar { background: #1f1f1f !important; }
        .swagger-ui .opblock { background: #1e1e1e !important; border-color: #333 !important; }
        .swagger-ui .response-col_status { color: #90caf9 !important; }
        .swagger-ui { filter: invert(0.92) hue-rotate(180deg); }
        .swagger-ui img { filter: invert(1) hue-rotate(180deg); }
      `;
    } else if (theme === "custom") {
      style.innerHTML = `
        body { background: #fef6e4 !important; color: #001858 !important; }
        .swagger-ui .topbar { background: #f582ae !important; }
        .swagger-ui .opblock { background: #f3d2c1 !important; border-color: #8bd3dd !important; }
        .swagger-ui .response-col_status { color: #f582ae !important; }
      `;
    } else {
      style.innerHTML = ``; // reset → pakai bawaan swagger (light)
    }
  }, [theme]);

  return (
    <div>
      <div style={{ padding: "10px", textAlign: "right" }}>
        <label style={{ marginRight: "10px" }}>Tema: </label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">🌞 Terang</option>
          <option value="dark">🌙 Gelap</option>
          <option value="custom">🎨 Custom</option>
        </select>
      </div>
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
