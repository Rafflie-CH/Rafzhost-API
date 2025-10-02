/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Cek status API
 *     description: Endpoint untuk mengecek apakah API hidup
 *     responses:
 *       200:
 *         description: API hidup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
export default function handler(req, res) {
  res.status(200).json({ status: "ok" });
}
