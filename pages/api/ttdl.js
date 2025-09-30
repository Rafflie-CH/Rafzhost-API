import { tiktokDl } from "../../src/downloader/ttdl";

/**
 * API endpoint TikTok downloader
 */
export default async function handler(req, res) {
  const url = req.method === "GET" ? req.query.url : req.body?.url;

  if (!url || typeof url !== "string" || url.trim().length === 0) {
    return res.status(400).json({
      status: false,
      error: "URL TikTok harus disertakan dan non-empty string",
    });
  }

  try {
    const result = await tiktokDl(url.trim());
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
