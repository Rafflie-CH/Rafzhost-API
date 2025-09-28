import { ttdl } from "../../../src/downloader/ttdl.js";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ status: false, message: "Masukkan parameter ?url=" });
    }

    const result = await ttdl(url);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}
