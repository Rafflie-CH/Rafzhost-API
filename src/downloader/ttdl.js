import axios from "axios";

async function tiktokDl(url) {
  if (!url) throw new Error("URL TikTok harus disertakan");

  try {
    let data = [];

    function formatNumber(integer) {
      let numb = parseInt(integer);
      return Number(numb).toLocaleString().replace(/,/g, ".");
    }

    function formatDate(n, locale = "en") {
      let d = new Date(n);
      return d.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }

    const domain = "https://www.tikwm.com/api/";
    const res = (
      await axios.post(
        domain,
        {},
        {
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://www.tikwm.com",
            Referer: "https://www.tikwm.com/",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          },
          params: { url, count: 12, cursor: 0, web: 1, hd: 1 },
        }
      )
    ).data.data;

    if (res?.duration === 0) {
      res.images?.map((v) => data.push({ type: "photo", url: v }));
    } else {
      data.push(
        { type: "watermark", url: "https://www.tikwm.com" + res.wmplay },
        { type: "nowatermark", url: "https://www.tikwm.com" + res.play },
        { type: "nowatermark_hd", url: "https://www.tikwm.com" + res.hdplay }
      );
    }

    return {
      status: true,
      title: res.title,
      taken_at: formatDate(res.create_time).replace("1970", ""),
      region: res.region,
      id: res.id,
      duration: res.duration,
      cover: "https://www.tikwm.com" + res.cover,
      data,
    };
  } catch (e) {
    throw new Error("Gagal download TikTok: " + (e?.message || e));
  }
}

// 👇 export dengan 2 cara sekaligus
export { tiktokDl };
export default tiktokDl;
