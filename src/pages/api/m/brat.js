import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { createCanvas, loadImage, registerFont } from "@napi-rs/canvas";
import sharp from "sharp";
import { spawn } from "child_process";

// ===========================
// Konfigurasi Font dan Ukuran Frame
// ===========================
const FONT_PATH = path.resolve("./public/fonts/AppleColorEmoji.ttf");
const FRAME_SIZE = { width: 256, height: 256 };

// Daftarkan font kustom
registerFont(FONT_PATH, { family: "AppleEmoji" });

// ===========================
// Fungsi Utilitas
// ===========================
function splitStringToFrames(str) {
  const chars = Array.from(str);
  const frames = [];
  for (let i = 1; i <= chars.length; i++) {
    frames.push(chars.slice(0, i).join(""));
  }
  return frames;
}

async function generateFrameBuffer(text) {
  const canvas = createCanvas(FRAME_SIZE.width, FRAME_SIZE.height);
  const ctx = canvas.getContext("2d");

  // Background putih
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, FRAME_SIZE.width, FRAME_SIZE.height);

  // Teks hitam dengan font kustom
  ctx.fillStyle = "#000000";
  ctx.font = "32px AppleEmoji";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, FRAME_SIZE.width / 2, FRAME_SIZE.height / 2);

  return canvas.toBuffer("image/png");
}

// ===========================
// Fungsi Generator Media
// ===========================
async function generatePNG(text) {
  return await generateFrameBuffer(text);
}

async function generateWEBP(text, delay = 150) {
  const frames = splitStringToFrames(text);
  if (frames.length === 1) return generateFrameBuffer(text);

  const buffers = [];
  for (const t of frames) {
    buffers.push(await generateFrameBuffer(t));
  }

  const webpBuffer = await sharp({
    create: {
      width: FRAME_SIZE.width,
      height: FRAME_SIZE.height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    }
  }).composite(buffers.map((b, i) => ({ input: b, top: 0, left: 0 })))
    .webp({ quality: 100, animated: true, delay: delay })
    .toBuffer();

  return webpBuffer;
}

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

    ffmpeg.stderr.on("data", (data) => console.log(data.toString()));
    ffmpeg.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error("FFmpeg failed"));
    });
  });

  const buffer = fs.readFileSync(outputPath);
  fs.rmSync(tempDir, { recursive: true, force: true });
  return buffer;
}

// ===========================
// API Handler
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
    res.status(500).json({ error: `Gagal generate media: ${err.message}` });
  }
}
