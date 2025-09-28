import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: "Parameter ?url= wajib diisi" });

  try {
    const api = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = api.data?.data;
    if (!data) return res.status(404).json({ status: false, message: "Video tidak ditemukan" });

    res.json({
      status: true,
      title: data.title,
      author: data.author,
      video: data.play,
      music: data.music
    });
  } catch (e) {
    res.status(500).json({ status: false, message: "Error TikTok", error: e.message });
  }
}
