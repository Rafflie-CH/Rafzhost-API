export default function handler(req, res) {
  res.json({
    status: true,
    message: "🚀 Rafzhost API is running",
    endpoints: {
      downloader: ["/api/downloader/tiktok?url=", "/api/downloader/instagram?url=", "/api/downloader/youtube?url="],
      ai: ["/api/ai/copilot?text="],
      search: ["/api/search/pinterest?query="],
      tools: ["/api/tools/shortlink?url="]
    }
  });
}
