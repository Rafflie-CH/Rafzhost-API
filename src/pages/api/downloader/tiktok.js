import { tiktokDl } from "../../../downloader/ttdl.js";

/**
 * @swagger
 * /api/downloader/tiktok:
 *   get:
 *     tags:
 *       - Downloader
 *     summary: Download video TikTok tanpa watermark
 *     description: Ambil URL video TikTok dan kembalikan link download (HD & tanpa watermark).
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: URL lengkap video TikTok
 *     responses:
 *       200:
 *         description: Data video berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Video TikTok Keren"
 *                 downloadUrl:
 *                   type: string
 *                   example: "https://example.com/video.mp4"
 *       400:
 *         description: URL parameter tidak ada
 *       500:
 *         description: Error server
 */
export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const result = await tiktokDl(url);
    return res.status(200).json(result);
  } catch (error) {
    console.error("TTDL Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
