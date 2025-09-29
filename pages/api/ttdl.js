import { tiktokDl } from "../../src/downloader/ttdl";

/**
 * @swagger
 * /api/ttdl:
 *   get:
 *     summary: Download TikTok video/photo
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: TikTok URL
 *     responses:
 *       200:
 *         description: JSON response with video/photo URLs
 *   post:
 *     summary: Download TikTok video/photo via POST
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: TikTok URL
 *     responses:
 *       200:
 *         description: JSON response with video/photo URLs
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
