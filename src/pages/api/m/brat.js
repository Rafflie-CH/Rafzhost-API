import { createCanvas, loadImage } from "@napi-rs/canvas";
import sharp from "sharp";

function createImageResponse(res, buffer, contentType = "image/png") {
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Length", buffer.length);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(buffer);
}

async function generateBrat(text, isAnimated, delayMs) {
  const words = text.trim().split(/\s+/).slice(0, 10);
  const limitedText = words.join(" ");

  const width = 800;
  const height = 200;
  const fontSize = 40;
  const font = `${fontSize}px sans-serif`;

  if (!isAnimated) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#000000";
    ctx.font = `bold ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(limitedText, width / 2, height / 2);

    return canvas.toBuffer("image/png");
  } else {
    // Animated WebP
    const frames = [];
    const wordsArray = limitedText.split(/\s+/);
    let currentText = "";

    for (const word of wordsArray) {
      currentText += word + " ";
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#000000";
      ctx.font = `bold ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentText.trim(), width / 2, height / 2);

      frames.push(await sharp(canvas.toBuffer("image/png")).webp().toBuffer());
    }

    // Gabungkan frame menjadi animated WebP
    const webpBuffer = await sharp({
      pages: frames.length,
      animated: true,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
      .webp({ delay: delayMs / 10 }) // delay dalam 1/100 detik
      .composite(frames.map((f, i) => ({ input: f, top: 0, left: 0 })))
      .toBuffer();

    return { buffer: webpBuffer, contentType: "image/webp" };
  }
}

export default async function handler(req, res) {
  try {
    const method = req.method.toUpperCase();
    const { text, isAnimated = false, delay = 500 } = method === "POST" ? req.body : req.query;

    if (!text || text.trim() === "") return res.status(400).json({ status: false, error: "Text required" });

    const animated = String(isAnimated).toLowerCase() === "true";
    const delayMs = Math.max(100, Math.min(1500, Number(delay) || 500));

    const result = await generateBrat(text, animated, delayMs);

    if (animated) return createImageResponse(res, result.buffer, result.contentType);
    return createImageResponse(res, result, "image/png");
  } catch (err) {
    console.error("Brat Error:", err);
    return res.status(500).json({ status: false, error: err.message || "Internal Server Error" });
  }
}
