import { tiktokDownload } from "../../../src/downloader/ttdl.js";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, message: "Parameter url required" });

  try {
    const data = await tiktokDownload(url);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}
