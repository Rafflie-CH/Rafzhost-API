// swaggerDef.js
export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Rafzhost API",
    version: "1.0.0",
    description: "📖 Dokumentasi resmi API Rafzhost",
  },
  servers: [
    { url: "https://api.rafzhost.xyz", description: "Production" },
    { url: "http://localhost:3000", description: "Local" },
  ],
};
