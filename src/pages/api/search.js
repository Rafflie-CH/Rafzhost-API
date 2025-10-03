// src/pages/api/search.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const q = (req.query.q || "").toString().toLowerCase().trim();
  const filePath = path.join(process.cwd(), "public", "swagger.json");

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const spec = JSON.parse(raw);
    const results = [];

    if (spec && spec.paths) {
      for (const p of Object.keys(spec.paths)) {
        const methods = spec.paths[p];
        for (const m of Object.keys(methods)) {
          const op = methods[m];
          const title = (op.summary || "").toString();
          const desc = (op.description || "").toString();
          const combined = `${p} ${m} ${title} ${desc}`.toLowerCase();
          if (!q || combined.includes(q)) {
            results.push({ path: p, method: m.toUpperCase(), summary: op.summary || "" });
          }
        }
      }
    }

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: "Failed to read swagger.json", detail: err.message });
  }
}
