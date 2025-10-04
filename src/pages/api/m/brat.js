import { NextApiRequest, NextApiResponse } from "next";
import Jimp from "jimp";
import { GifWriter } from "omggif";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// Ukuran frame
const FRAME_SIZE = { width: 256, height: 256 };

// ===========================
// UTILITY
// ===========================

// Generate frame PNG dari teks (support emoji)
async function generateFrame(text) {
  const image = new Jimp(FRAME_SIZE.width, FRAME_SIZE.height, 0x00000000); // transparan
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

  image.print(
    font,
    0,
    0,
    {
      text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    FRAME_SIZE.width,
    FRAME_SIZE.height
  );

  return await image.getBufferAsync(Jimp.MIME_PNG);
}

// Split string jadi beberapa frame animasi (dukungan emoji)
function splitStringToFrames(str) {
  const chars = Array.from(str);
  const frames = [];
  for (let i = 1; i <= chars.length; i++) {
    frames.push(chars.slice(0, i).join(""));
  }
  return frames;
}

// ===========================
// API HANDLER
// ===========================

export default async function handler(req, res) {
  try {
    const {
      text = "Brat",
      isAnimated = "false",
      delay = "150",
      format = "gif", // gif | png | mp4
    } = req.query;

    const animated = isAnimated === "true";
    const delayMs = parseInt(delay);

    // -----------------
    // Static PNG
    // -----------------
    if (!animated || format === "png") {
      const buffer = await generateFrame(text);
      res.setHeader("Content-Type", "image/png");
      return res.send(buffer);
    }

    // -----------------
    // Animated GIF
    // -----------------
    if (format === "gif") {
      const framesStr = splitStringToFrames(text);
      const framesBuffers = [];

      for (const t of framesStr) {
        const buf = await generateFrame(t);
        framesBuffers.push(buf);
      }

      const width = FRAME_SIZE.width;
      const height = FRAME_SIZE.height;
      const gifBuffer = Buffer.alloc(width * height * framesBuffers.length * 4); // placeholder
      const writer = new GifWriter(gifBuffer, width, height, { loop: 0 });

      for (const buf of framesBuffers) {
        const jimpFrame = await Jimp.read(buf);
        const pixels = [];
        jimpFrame.scan(0, 0, width, height, function (x, y, idx) {
          const r = this.bitmap.data[idx + 0];
          const g = this.bitmap.data[idx + 1];
          const b = this.bitmap.data[idx + 2];
          const a = this.bitmap.data[idx + 3];
          pixels.push(r, g, b, a);
        });
        writer.addFrame(0, 0, width, height, pixels, { delay: delayMs });
      }

      res.setHeader("Content-Type", "image/gif");
      return res.send(writer.data);
    }

    // -----------------
    // Animated MP4
    // -----------------
    if (format === "mp4") {
      const framesStr = splitStringToFrames(text);
      const ffmpeg = createFFmpeg({ log: false });
      await ffmpeg.load();

      // Generate frame PNG files
      for (let i = 0; i < framesStr.length; i++) {
        const buf = await generateFrame(framesStr[i]);
        ffmpeg.FS("writeFile", `frame${i}.png`, await fetchFile(buf));
      }

      // Buat video dari frames
      await ffmpeg.run(
        "-framerate",
        `${1000 / delayMs}`,
        "-i",
        "frame%d.png",
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "output.mp4"
      );

      const data = ffmpeg.FS("readFile", "output.mp4");
      res.setHeader("Content-Type", "video/mp4");
      return res.send(Buffer.from(data.buffer));
    }

    // Default fallback
    res.status(400).json({ error: "Format tidak didukung. Gunakan png, gif, atau mp4." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal generate image/video" });
  }
}
