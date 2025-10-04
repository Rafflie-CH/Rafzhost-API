// /pages/api/m/brat.js
import { createCanvas } from "@napi-rs/canvas";
import GIFEncoder from "gifencoder";

function sendImage(res, buffer, type = "image/png") {
  res.setHeader("Content-Type", type);
  res.setHeader("Content-Length", buffer.length);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(buffer);
}

async function generateBrat(text, animated = false, delay = 500) {
  const words = text.trim().split(/\s+/).slice(0, 10).join(" ");
  const width = 800;
  const height = 200;

  if (!animated) {
    // Static PNG
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 40px Sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(words, width / 2, height / 2);

    return { buffer: canvas.toBuffer("image/png"), type: "image/png" };
  } else {
    // Animated GIF
    const encoder = new GIFEncoder(width, height);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(delay);
    encoder.setQuality(10);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    let currentText = "";

    for (const word of words.split(/\s+/)) {
      currentText += word + " ";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 40px Sans";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentText.trim(), width / 2, height / 2);
      encoder.addFrame(ctx);
    }

    encoder.finish();
    return { buffer: Buffer.from(encoder.out.getData()), type: "image/gif" };
  }
}

export default async function handler(req, res) {
  try {
    const method = req.method.toUpperCase();
    const { text, isAnimated = false, delay = 500 } =
      method === "POST" ? req.body : req.query;

    if (!text || text.trim() === "") {
      return res.status(400).json({ status: false, error: "Text required" });
    }

    const animated = String(isAnimated).toLowerCase() === "true";
    const delayMs = Math.max(100, Math.min(1500, Number(delay) || 500));

    const { buffer, type } = await generateBrat(text, animated, delayMs);
    sendImage(res, buffer, type);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err.message });
  }
}
