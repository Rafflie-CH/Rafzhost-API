import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { GifCodec, GifFrame } from "gifwrap";
import sharp from "sharp";
import { spawn } from "child_process";

const FRAME_SIZE = { width: 256, height: 256 };

// Split string jadi beberapa frame animasi (support emoji)
function splitStringToFrames(str) {
  const chars = Array.from(str);
  const frames = [];
  for (let i = 1; i <= chars.length; i++) {
    frames.push(chars.slice(0, i).join(""));
  }
  return frames;
}

// Generate single frame buffer
async function generateFrameBuffer(text) {
  const canvas = createCanvas(FRAME_SIZE.width, FRAME_SIZE.height);
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, FRAME_SIZE.width, FRAME_SIZE.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, FRAME_SIZE.width / 2, FRAME_SIZE.height / 2);

  return canvas.toBuffer("image/png");
}

// ===========================
// GENERATORS
// ===========================

// PNG / FOTO
async function generatePNG(text) {
  return await generateFrameBuffer(text);
}

// GIF via gifwrap
async function generateGIF(text, delay = 150) {
  const framesText = splitStringToFrames(text);
  const codec = new GifCodec();
  const frames = [];

  for (const t of framesText) {
    const buf = await generateFrameBuffer(t);
    const img = await loadImage(buf);
    frames.push(new GifFrame(img, { delay: delay }));
  }

  const gif = await codec.encodeGif(frames, { loops: 0 });
  return gif.buffer;
}

// WEBP via sharp
async function generateWEBP(text, delay = 150) {
  const framesText = splitStringToFrames(text);
  if (framesText.length === 1) return generateFrameBuffer(text);

  const buffers = [];
  for (const t of framesText) buffers.push(await generateFrameBuffer(t));

  return await sharp({
    create: {
      width: FRAME_SIZE.width,
      height: FRAME_SIZE.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(buffers.map(b => ({ input: b, top: 0, left: 0 })))
    .webp({ quality: 100, animated: true, delay: delay })
    .toBuffer();
}

// MP4 via ffmpeg
async function generateMP4(text, delay = 150) {
  const frames = splitStringToFrames(text);
  const tempDir = fs.mkdtempSync("/tmp/brat-");
  const frameFiles = [];

  for (let i = 0; i < frames.length; i++) {
    const buf = await generateFrameBuffer(frames[i]);
    const filePath = path.join(tempDir, `frame_${i}.png`);
    fs.writeFileSync(filePath, buf);
    frameFiles.push(filePath);
  }

  const outputPath = path.join(tempDir, "output.mp4");
  const framerate = 1000 / delay;

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-y",
      "-framerate", framerate.toString(),
      "-i", path.join(tempDir, "frame_%d.png"),
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      outputPath
    ]);

    ffmpeg.stderr.on("data", data => console.log(data.toString()));
    ffmpeg.on("close", code => (code === 0 ? resolve() : reject(new Error("FFmpeg failed"))));
  });

  const buffer = fs.readFileSync(outputPath);
  fs.rmSync(tempDir, { recursive: true, force: true });
  return buffer;
}

// ===========================
// API HANDLER
// ===========================
export default async function handler(req, res) {
  try {
    const { text, delay = 150, media = "png" } = req.query;

    if (!text) return res.status(400).json({ error: "text wajib diisi" });

    let buffer;
    const mediaLower = media.toLowerCase();

    switch (mediaLower) {
      case "png":
        buffer = await generatePNG(text);
        res.setHeader("Content-Type", "image/png");
        break;
      case "gif":
        buffer = await generateGIF(text, Number(delay));
        res.setHeader("Content-Type", "image/gif");
        break;
      case "webp":
        buffer = await generateWEBP(text, Number(delay));
        res.setHeader("Content-Type", "image/webp");
        break;
      case "mp4":
        buffer = await generateMP4(text, Number(delay));
        res.setHeader("Content-Type", "video/mp4");
        break;
      default:
        return res.status(400).json({ error: "media tidak valid" });
    }

    res.status(200).send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Gagal generate image/video: ${err.message}` });
  }
}
