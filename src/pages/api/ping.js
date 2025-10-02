/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Tes koneksi API
 *     responses:
 *       200:
 *         description: API aktif
 */
export default function handler(req, res) {
  res.status(200).json({ message: "pong" });
}
