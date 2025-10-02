// src/pages/api/downloader/tiktok.js
import { tiktokDl } from "../../../downloader/ttdl.js";

/**
 * @swagger
 * /api/downloader/tiktok:
 *   get:
 *     summary: Download video TikTok tanpa watermark
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: URL video TikTok
 *     responses:
 *       200:
 *         description: Video berhasil diambil
 */
export default async function handler(req, res) {
  const url = req.query?.url;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ status: false, error: "Parameter url dibutuhkan" });
  }
  try {
    const result = await tiktokDl(url.trim());
    return res.status(200).json({ status: true, source: "TikWM", result, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("TTDL Error:", err);
    return res.status(500).json({ status: false, error: err.message || "Internal server error" });
  }
}
