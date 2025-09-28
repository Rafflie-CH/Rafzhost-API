import axios from "axios";

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ status: false, message: "Parameter ?query= wajib diisi" });

  try {
    const api = await axios.get(`https://api.ryzendesu.vip/api/search/pinterest?query=${encodeURIComponent(query)}`);
    res.json(api.data);
  } catch (e) {
    res.status(500).json({ status: false, message: "Error Pinterest", error: e.message });
  }
}
