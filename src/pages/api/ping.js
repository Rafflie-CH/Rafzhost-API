/**
 * @swagger
 * /api/ping:
 *   get:
 *     tags:
 *       - Utility
 *     summary: Cek status API
 *     description: Endpoint sederhana untuk memastikan API berjalan.
 *     responses:
 *       200:
 *         description: API aktif
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */
export default function handler(req, res) {
  res.status(200).json({ message: "pong" });
}
