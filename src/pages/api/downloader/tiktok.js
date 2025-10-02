// src/pages/api/downloader/tiktok.js
import { tiktokDl } from "../../../downloader/ttdl.js";

/**
 * @swagger
 * /api/downloader/tiktok:
 *   get:
 *     tags:
 *       - Downloader
 *     summary: Download video TikTok tanpa watermark.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: URL lengkap video TikTok yang ingin didownload.
 *     responses:
 *       '200':
 *         description: Sukses
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
