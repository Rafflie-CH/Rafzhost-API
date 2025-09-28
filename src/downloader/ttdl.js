import axios from "axios";

/**
 * TikTok Downloader (versi siputzx, disesuaikan)
 * @param {string} url - Link TikTok
 */
export async function ttdl(url) {
  if (!url) throw new Error("Parameter url tidak ditemukan");

  try {
    const { data } = await axios.get(
      `https://www.tikwm.com/api/`, {
        params: { url }
      }
    );

    if (!data || !data.data) {
      return { status: false, message: "Gagal mengambil data TikTok" };
    }

    return {
      status: true,
      author: "siputzx → rafzhost",
      result: {
        title: data.data.title,
        cover: data.data.cover,
        play: data.data.play,   // video tanpa watermark
        wmplay: data.data.wmplay, // video dengan watermark
        music: data.data.music
      }
    };
  } catch (err) {
    return { status: false, message: err.message };
  }
}
