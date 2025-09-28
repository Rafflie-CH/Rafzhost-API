// src/tools/shortlink.js
import fetch from "node-fetch";
export async function makeShortlink(url) {
  // You can implement using tinyurl or paste siputzx logic
  const r = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
  const text = await r.text();
  return text;
}
