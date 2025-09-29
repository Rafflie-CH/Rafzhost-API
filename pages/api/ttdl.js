import { tiktokDl } from "../../src/downloader/ttdl";

export default async function handler(req, res) {
  // Ambil URL TikTok dari query (GET) atau body (POST)
  const url = req.method === "GET" ? req.query.url : req.body?.url;

  // Validasi URL
  if (!url || typeof url !== "string" || url.trim().length === 0) {
    return res.status(400).json({
      status: false,
      error: "URL TikTok harus disertakan dan non-empty string",
    });
  }

  try {
    // Panggil fungsi TikWM dari src/downloader/ttdl.js
    const result = await tiktokDl(url.trim());

    // Return response JSON
    res.status(200).json({
      status: true,
      source: "TikWM",
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message || "Internal Server Error",
    });
  }
}
