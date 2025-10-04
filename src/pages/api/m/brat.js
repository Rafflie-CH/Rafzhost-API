// src/pages/api/m/brat.js
import { createCanvas } from '@napi-rs/canvas';
import { GifUtil, GifFrame } from 'gifwrap';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import stream from 'stream';
import { promisify } from 'util';

const FRAME_SIZE = { width: 256, height: 256 };

// Utility
function splitStringToFrames(str) {
  const chars = Array.from(str); // dukung emoji
  const frames = [];
  for (let i = 1; i <= chars.length; i++) {
    frames.push(chars.slice(0, i).join(''));
  }
  return frames;
}

async function generateFrame(text) {
  const canvas = createCanvas(FRAME_SIZE.width, FRAME_SIZE.height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, FRAME_SIZE.width, FRAME_SIZE.height);

  ctx.fillStyle = 'white';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, FRAME_SIZE.width / 2, FRAME_SIZE.height / 2);

  return canvas.toBuffer('png');
}

// API Handler
export default async function handler(req, res) {
  try {
    const { text = 'Brat', isAnimated = 'false', delay = '150', media = 'png' } = req.query;
    const isAnim = isAnimated === 'true';
    const delayMs = parseInt(delay);

    if (!isAnim) {
      const buffer = await generateFrame(text);
      res.setHeader('Content-Type', 'image/png');
      return res.send(buffer);
    }

    const framesStr = splitStringToFrames(text);
    const buffers = await Promise.all(framesStr.map(t => generateFrame(t)));

    switch (media.toLowerCase()) {
      case 'gif': {
        const gifFrames = [];
        for (const buf of buffers) {
          const frame = await GifFrame.fromBuffer(buf);
          frame.delayCentisecs = Math.floor(delayMs / 10);
          gifFrames.push(frame);
        }
        const gifBuffer = await GifUtil.writeBuffer(gifFrames);
        res.setHeader('Content-Type', 'image/gif');
        return res.send(gifBuffer);
      }
      case 'webp': {
        const image = sharp(buffers[0]);
        const webpBuffer = await sharp({
          create: {
            width: FRAME_SIZE.width,
            height: FRAME_SIZE.height,
            channels: 4,
            background: 'black',
          },
        })
          .composite(buffers.map(buf => ({ input: buf })))
          .webp({ animated: true, delay: delayMs })
          .toBuffer();
        res.setHeader('Content-Type', 'image/webp');
        return res.send(webpBuffer);
      }
      case 'mp4': {
        // ffmpeg memerlukan writable stream
        const passThrough = new stream.PassThrough();
        const getStreamBuffer = promisify(stream.finished);

        ffmpeg()
          .inputOptions('-framerate', `${1000 / delayMs}`)
          .input('pipe:0')
          .inputFormat('image2pipe')
          .videoCodec('libx264')
          .outputOptions('-pix_fmt', 'yuv420p')
          .format('mp4')
          .pipe(passThrough);

        buffers.forEach(buf => passThrough.write(buf));
        passThrough.end();

        res.setHeader('Content-Type', 'video/mp4');
        await getStreamBuffer(passThrough);
        return res.send(passThrough);
      }
      default:
        // fallback PNG
        res.setHeader('Content-Type', 'image/png');
        return res.send(buffers[buffers.length - 1]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal generate image/video', details: err.message });
  }
}
