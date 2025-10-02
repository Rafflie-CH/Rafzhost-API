// src/pages/api/swagger.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const p = path.join(process.cwd(), "public", "swagger.json");
    if (!fs.existsSync(p)) {
      return res.status(500).json({ error: "public/swagger.json not found" });
    }
    const raw = fs.readFileSync(p, "utf8");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
