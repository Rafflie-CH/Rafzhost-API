/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Test endpoint
 *     responses:
 *       200:
 *         description: Pong
 */
export default function handler(req, res) {
  res.status(200).json({ msg: "pong" });
}
