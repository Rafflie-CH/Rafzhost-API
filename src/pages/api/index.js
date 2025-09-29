export default function handler(req, res) {
  res.status(200).json({
    status: true,
    message: "Rafzhost API (Vercel) running",
    info: "Use the dashboard on /docs to test endpoints"
  });
}
