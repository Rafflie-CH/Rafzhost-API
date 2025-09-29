export default function handler(req, res) {
  res.status(200).json({
    status: true,
    message: "Rafzhost API (Vercel) running",
    info: "Swagger Docs tersedia di /docs"
  });
}
