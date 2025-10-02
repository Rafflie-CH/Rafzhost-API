import swaggerJSDoc from "swagger-jsdoc";

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
    { url: "https://api.rafzhost.xyz", description: "Production server" },
    { url: "http://localhost:3000", description: "Local server" },
  ],
};

const options = {
  definition: swaggerDefinition,
  // Pakai path relatif supaya Vercel/Next.js bisa resolve file API dengan benar
  apis: ['./pages/api/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req, res) {
  // Content-Type JSON
  res.setHeader("Content-Type", "application/json");
  // Optional: untuk akses dari domain lain
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Kirim JSON dengan indentation supaya readable
  res.status(200).send(JSON.stringify(swaggerSpec, null, 2));
}
