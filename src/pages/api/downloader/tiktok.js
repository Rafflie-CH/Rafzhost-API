/**
 * @swagger
 * /downloader/tiktok:
 *   get:
 *     tags:
 *       - Downloader
 *     summary: Mendownload video TikTok tanpa watermark
 *     description: Endpoint ini mengambil URL video TikTok dan mengembalikan link download tanpa watermark
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: URL lengkap video TikTok
 *     responses:
 *       200:
 *         description: Sukses
 *       400:
 *         description: Parameter url tidak ada
 *       500:
 *         description: Error server
 */

import { tiktokDl } from "../../../downloader/ttdl";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Parameter 'url' harus disertakan" });
    }

    const result = await tiktokDl(url);

    return res.status(200).json(result);
  } catch (error) {
    console.error("TTDL Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
