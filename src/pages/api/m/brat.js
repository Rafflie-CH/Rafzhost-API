import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { createCanvas, registerFont } from "@napi-rs/canvas";
import sharp from "sharp";
import { spawn } from "child_process";

const FRAME_SIZE = { width: 256, height: 256 };

// Daftarkan font lokal OpenSans yang support emoji
const FONT_PATH = path.join(process.cwd(), "fonts/OpenSans-Bold.ttf");
if (fs.existsSync(FONT_PATH)) registerFont(FONT_PATH, { family: "OpenSans" });

// ===========================
// UTILITY
// ===========================
function splitStringToFrames(str) {
  const chars = Array.from(str); // dukung emoji
  const frames = [];
  for (let i = 1; i <= chars.length; i++) frames.push(chars.slice(0, i).join(""));
  return frames;
}

async function generateFrameBuffer(text) {
  const canvas = createCanvas(FRAME_SIZE.width, FRAME_SIZE.height);
  const ctx = canvas.getContext("2d");

  // Background putih
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, FRAME_SIZE.width, FRAME_SIZE.height);

  // Teks tengah
  ctx.fillStyle = "#000000";
  ctx.font = "32px OpenSans";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, FRAME_SIZE.width / 2, FRAME_SIZE.height / 2);

  return canvas.toBuffer("image/png");
}

// ===========================
// GENERATORS
// ===========================

async function generatePNG(text) {
  return generateFrameBuffer(text);
}

async function generateWEBP(text, delay = 150) {
  const frames = splitStringToFrames(text);
  if (frames.length === 1) return generateFrameBuffer(text); // static

  const buffers = [];
  for (const t of frames) buffers.push(await generateFrameBuffer(t));

  return sharp({
    create: {
      width: FRAME_SIZE.width,
      height: FRAME_SIZE.height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite(buffers.map((b) => ({ input: b, top: 0, left: 0 })))
    .webp({ quality: 100, animated: true, delay })
    .toBuffer();
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
      "-framerate",
      framerate.toString(),
      "-i",
      path.join(tempDir, "frame_%d.png"),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outputPath,
    ]);

    ffmpeg.stderr.on("data", (data) => console.log(data.toString()));
    ffmpeg.on("close", (code) => (code === 0 ? resolve() : reject(new Error("FFmpeg failed"))));
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

    const mediaLower = media.toLowerCase();
    let buffer;

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
    res.status(500).json({ error: `Gagal generate image/video: ${err.message}` });
  }
}
