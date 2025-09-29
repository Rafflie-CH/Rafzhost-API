import { tiktokDl } from "../../src/downloader/ttdl";

/**
 * @swagger
 * /api/ttdl:
 *   get:
 *     summary: Download TikTok video/photo
 *     description: Returns TikTok content info
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: TikTok URL
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
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
