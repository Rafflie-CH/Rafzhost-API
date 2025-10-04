// src/pages/api/m/brat.js
import { createCanvas } from "@napi-rs/canvas";
import GIFEncoder from "gifencoder";

function sendImage(res, buffer, contentType = "image/png") {
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Length", buffer.length);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(buffer);
}

async function generateBratImage(text, isAnimated, delayMs = 500) {
  const words = text.trim().split(/\s+/).slice(0, 10);
  const limitedText = words.join(" ");

  if (!isAnimated) {
    // static PNG
    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 40px Sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(limitedText, canvas.width / 2, canvas.height / 2);
    return { buffer: canvas.toBuffer("image/png"), contentType: "image/png" };
  } else {
    // animated GIF
    const encoder = new GIFEncoder(800, 200);
    encoder.start();
    encoder.setRepeat(0); // loop forever
    encoder.setDelay(delayMs);
    encoder.setQuality(10);

    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext("2d");

    let currentText = "";
    for (const word of limitedText.split(/\s+/)) {
      currentText += word + " ";
      // clear background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // draw text
      ctx.fillStyle = "#000000";
      ctx.font = "bold 40px Sans";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentText.trim(), canvas.width / 2, canvas.height / 2);
      encoder.addFrame(ctx);
    }

    encoder.finish();
    return { buffer: Buffer.from(encoder.out.getData()), contentType: "image/gif" };
  }
}

export default async function handler(req, res) {
  const method = req.method.toUpperCase();
  const { text, isAnimated = false, delay = 500 } = method === "POST" ? req.body : req.query;

  if (!text || text.trim() === "") {
    return res.status(400).json({ status: false, error: "Text required" });
  }

  const animated = String(isAnimated).toLowerCase() === "true";
  const delayMs = Math.max(100, Math.min(1500, Number(delay) || 500));

  try {
    const result = await generateBratImage(text, animated, delayMs);
    return sendImage(res, result.buffer, result.contentType);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, error: err.message || "Internal Server Error" });
  }
}
