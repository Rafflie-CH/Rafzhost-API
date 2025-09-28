import axios from "axios";

export default async function handler(req, res) {
  const { text, model = "gpt-5" } = req.query;
  if (!text) return res.status(400).json({ status: false, message: "Parameter ?text= wajib diisi" });

  try {
    const api = await axios.get(`https://aliceeapis.my.id/ai/copilot`, { params: { text, model } });
    res.json({
      status: true,
      query: text,
      model,
      response: api.data
    });
  } catch (e) {
    res.status(500).json({ status: false, message: "Error Copilot", error: e.message });
  }
}
