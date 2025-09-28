import { pinterestSearch } from "../../../src/search/pinterest.js";

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ status: false, message: "Parameter query required" });

  try {
    const data = await pinterestSearch(query);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}
