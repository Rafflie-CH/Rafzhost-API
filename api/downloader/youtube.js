import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: "Parameter ?url= wajib diisi" });

  try {
    const api = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(url)}`);
    res.json(api.data);
  } catch (e) {
    res.status(500).json({ status: false, message: "Error YouTube", error: e.message });
  }
}
