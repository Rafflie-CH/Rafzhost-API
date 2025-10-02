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
 *         description: Video berhasil diambil
 *       400:
 *         description: URL parameter tidak ada
 *       500:
 *         description: Error server
 */
