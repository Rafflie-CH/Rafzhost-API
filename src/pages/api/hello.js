// src/pages/api/hello.js
export default function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body || {};
    return res.status(200).json({ ok: true, received: body });
  }
  return res.status(200).json({ hello: "world" });
}
