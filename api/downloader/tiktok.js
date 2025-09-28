import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: "Masukkan parameter ?url=" });

  try {
    const api = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = api.data?.data;

    if (!data) return res.status(404).json({ status: false, message: "Video tidak ditemukan" });

    res.json({
      status: true,
      author: data.author,
      title: data.title,
      video: data.play,
      music: data.music
    });
  } catch (e) {
    res.status(500).json({ status: false, message: "Error fetch TikTok", error: e.message });
  }
}
