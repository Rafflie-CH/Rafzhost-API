import { makeShortlink } from "../../../src/tools/shortlink.js";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: "Parameter url required" });

  try {
    const short = await makeShortlink(url);
    return res.status(200).json({ status: true, original: url, short });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}
