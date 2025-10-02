import ttdl from "../../../downloader/ttdl.js";

/**
 * @swagger
 * /api/downloader/tiktok:
 *   get:
 *     tags:
 *       - Downloader
 *     summary: Mendownload video TikTok tanpa watermark.
 *     description: Endpoint ini mengambil URL video TikTok, memprosesnya, dan mengembalikan link download video tanpa watermark.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: URL lengkap video TikTok yang ingin didownload.
 *     responses:
 *       200:
 *         description: Respon sukses dengan data video.
 *       400:
 *         description: Parameter url tidak ada.
 *       500:
 *         description: Error server internal.
 */
export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const result = await ttdl(url);
    return res.status(200).json(result);
  } catch (error) {
    console.error("TTDL Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
