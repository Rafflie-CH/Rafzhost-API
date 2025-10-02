import swaggerJSDoc from "swagger-jsdoc";

// ✅ Definisi utama
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Rafzhost API",
    version: "1.0.0",
    description: "📖 Dokumentasi resmi API Rafzhost",
    contact: {
      name: "Rafflie Aditya",
      url: "https://api.rafzhost.xyz",
    },
  },
  servers: [
    {
      url: "https://api.rafzhost.xyz",
      description: "Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};

// ✅ Daftar file API manual (sesuaikan dengan isi project-mu)
const options = {
  definition: swaggerDefinition,
  apis: [
    "src/pages/api/ping.js",
    // tambahkan semua endpoint lain di sini
  ],
};

// ✅ Generate swagger spec
const swaggerSpec = swaggerJSDoc(options);

// Debug biar kelihatan pas deploy
if (process.env.NODE_ENV !== "production") {
  console.log("Swagger Spec Generated:", JSON.stringify(swaggerSpec, null, 2));
}

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}
