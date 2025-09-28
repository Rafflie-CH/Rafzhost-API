import { copilot } from "../../../src/ai/copilot.js";

export default async function handler(req, res) {
  const { text, model = "gpt-5" } = req.query;
  if (!text) return res.status(400).json({ status: false, message: "Parameter text required" });

  try {
    const data = await copilot(text, model);
    return res.status(200).json({ status: true, data });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}
