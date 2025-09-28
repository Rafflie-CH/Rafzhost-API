export default function handler(req, res) {
  res.status(200).json({
    status: true,
    message: "Rafzhost API (Vercel) running",
    info: "Use the dashboard on / to test endpoints"
  });
}
