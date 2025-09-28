import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: "Masukkan parameter ?url=" });

  try {
    const api = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(url)}`);
    const data = api.data;

    if (!data || !data.result) return res.status(404).json({ status: false, message: "Video tidak ditemukan" });

    res.json({
      status: true,
      result: data.result
    });
  } catch (e) {
    res.status(500).json({ status: false, message: "Error fetch YouTube", error: e.message });
  }
}
