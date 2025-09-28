import { ttdl } from "../../../src/downloader/ttdl.js";

/**
 * @swagger
 * /downloader/tiktok:
 * get:
 * tags:
 * - Downloader
 * summary: Mendownload video TikTok tanpa watermark.
 * description: Endpoint ini mengambil URL video TikTok, memprosesnya, dan mengembalikan link download video tanpa watermark.
 * parameters:
 * - in: query
 * name: url
 * schema:
 * type: string
 * required: true
 * description: URL lengkap video TikTok yang ingin didownload.
 * responses:
 * 200:
 * description: Respon sukses dengan data video.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: boolean
 * example: true
 * title:
 * type: string
 * example: "Gadis Cantik menari di tepi pantai"
 * nowm_url:
 * type: string
 * example: "https://v16m.tiktokcdn.com/asdfg12345/video_no_watermark.mp4"
 * 400:
 * description: Permintaan tidak valid karena parameter `url` hilang.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: boolean
 * example: false
 * message:
 * type: string
 * example: "Masukkan parameter ?url="
 * 500:
 * description: Error server internal (gagal scraping/processing).
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: boolean
 * example: false
 * message:
 * type: string
 * example: "Gagal mengambil data dari TikTok."
 */
export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ status: false, message: "Masukkan parameter ?url=" });
    }

    // Panggil fungsi ttdl Anda
    const result = await ttdl(url);
    
    // Asumsi ttdl mengembalikan object yang valid jika status: true
    res.status(200).json(result);
    
  } catch (err) {
    // Tangani error jika ttdl gagal
    console.error("TikTok Downloader Error:", err);
    res.status(500).json({ status: false, message: err.message || "Terjadi error saat memproses permintaan." });
  }
}
