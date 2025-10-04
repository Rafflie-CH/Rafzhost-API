const { createCanvas } = require("@napi-rs/canvas");
const sharp = require("sharp");

function createImageResponse(res, buffer, contentType = "image/png") {
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Length", buffer.length);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(buffer);
}

async function generateBratLocal(text, isAnimated, delayMs) {
  const words = text.trim().split(/\s+/).slice(0, 10);
  const limitedText = words.join(" ");

  const width = 800;
  const height = 200;

  if (!isAnimated) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 40px Sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(limitedText, width / 2, height / 2);

    return canvas.toBuffer("image/png");
  } else {
    const wordsArray = limitedText.split(/\s+/);
    const frameBuffers = [];

    // Buat tiap frame per kata
    for (let i = 0; i < wordsArray.length; i++) {
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 40px Sans";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const currentText = wordsArray.slice(0, i + 1).join(" ");
      ctx.fillText(currentText, width / 2, height / 2);

      frameBuffers.push(canvas.toBuffer("png"));
    }

    // Sharp: gabungkan frame menjadi WebP animasi
    let webpAnim = sharp({
      create: { width, height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
    });

    // Tambahkan tiap frame
    const frames = frameBuffers.map(buf => ({ input: buf, delay: delayMs }));
    webpAnim = webpAnim.webp({ quality: 80, loop: 0, effort: 4 }).composite(frames);

    const webpBuffer = await webpAnim.toBuffer();
    return { buffer: webpBuffer, contentType: "image/webp" };
  }
}

export default async function handler(req, res) {
  const method = req.method.toUpperCase();
  const { text, isAnimated = false, delay = 500 } =
    method === "POST" ? req.body : req.query;

  if (!text || text.trim() === "")
    return res.status(400).json({ status: false, error: "Text required" });

  const animated = String(isAnimated).toLowerCase() === "true";
  const delayMs = Math.max(100, Math.min(1500, Number(delay) || 500));

  try {
    const result = await generateBratLocal(text, animated, delayMs);

    if (animated && typeof result === "object") {
      return createImageResponse(res, result.buffer, result.contentType);
    }

    return createImageResponse(res, result, "image/png");
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, error: err.message || "Internal Server Error" });
  }
}
