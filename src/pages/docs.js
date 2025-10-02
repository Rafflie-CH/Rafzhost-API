import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Docs() {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    SwaggerUI({
      dom_id: "#swagger",
      url: "/swagger.json",
      presets: [SwaggerUI.presets.apis],
      layout: "BaseLayout",
      docExpansion: "none",
      defaultModelsExpandDepth: -1,
      deepLinking: true,
      supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
    });
  }, []);

  const getText = (key) => {
    const texts = {
      title: { id: "Dokumentasi Rafzhost API", en: "Rafzhost API Docs" },
      switch: { id: "Beralih ke Post", en: "Switch to Post" },
    };
    return texts[key][lang];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1 className="text-xl font-bold">{getText("title")}</h1>
        <div className="flex items-center gap-2">
          <a
            href="/post"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            {getText("switch")}
          </a>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded px-2 py-1 text-black"
          >
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>
        </div>
      </header>
      <main className="flex-1">
        <div id="swagger" className="min-h-screen"></div>
      </main>
    </div>
  );
}
