import { useState } from "react";

function ApiCard({ id, title, fields }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("Loading...");
    const form = new FormData(e.target);
    const params = new URLSearchParams(form).toString();
    try {
      // Menyesuaikan dengan Next.js API Routes (prefix /api/ sudah otomatis)
      const res = await fetch(`/api/${id}?${params}`);
      const json = await res.json();
      // Menggunakan indentasi 2 untuk JSON yang mudah dibaca
      setResult(JSON.stringify(json, null, 2));
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  }

  return (
    <div style={styles.card}>
      <h2>{title}</h2>
      <form id={`${id}-form`} onSubmit={onSubmit}>
        {fields.map(f => (
          <div key={f.name} style={{ marginBottom: 8 }}>
            <label style={{ display: "block", marginBottom: 4 }}>{f.label}</label>
            <input name={f.name} placeholder={f.placeholder || ""} defaultValue={f.default || ""} style={styles.input} />
          </div>
        ))}
        <button type="submit" style={styles.button}>Kirim</button>
      </form>
      {/* Menggunakan elemen <pre> untuk menampilkan hasil JSON */}
      <pre style={styles.pre}>{loading ? "Loading..." : result}</pre>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Inter, Arial, sans-serif",
    background: "#0f0f1a",
    color: "#e6e6e6",
    minHeight: "100vh",
    padding: 24
  },
  header: { 
    textAlign: "center", 
    marginBottom: 16 
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "1fr", // Selalu 1 kolom untuk kompatibilitas mobile
    gap: 20, 
    maxWidth: 900, 
    margin: "0 auto" 
  },
  card: { 
    background: "#1a1a2e", 
    padding: 18, 
    borderRadius: 12 
  },
  input: { 
    width: "100%", 
    padding: 10, 
    borderRadius: 8, 
    border: "none", 
    marginBottom: 6,
    // Mengatur warna input agar sesuai dengan tema gelap
    background: "#2a2a44",
    color: "#e6e6e6"
  },
  button: { 
    background: "#7c3aed", 
    color: "#fff", 
    padding: "8px 14px", 
    borderRadius: 8, 
    border: "none", 
    cursor: "pointer",
    fontWeight: "bold"
  },
  // 🚀 PERBAIKAN FINAL UNTUK WORD WRAP PADA TAMPILAN HASIL API
  pre: { 
    background: "#05050a", 
    padding: 12, 
    borderRadius: 8, 
    color: "#7eff7e", // Warna teks hijau
    marginTop: 8, 
    minHeight: 60,
    
    // Properti Kunci untuk Memecah Baris Teks Panjang:
    whiteSpace: 'pre-wrap',  // Memungkinkan pemecahan baris tetapi mempertahankan format spasi
    wordBreak: 'break-all',   // Memaksa pemecahan kata/string panjang (seperti URL)
    overflow: 'auto'          // Memastikan scroll jika konten melebihi batas (sebagai cadangan)
  }
};

export default function Home() {
  const cards = [
    { id: "downloader/tiktok", title: "TikTok Downloader", fields: [{ name: "url", label: "Video URL", placeholder: "https://www.tiktok.com/..." }] },
    { id: "downloader/instagram", title: "Instagram Downloader", fields: [{ name: "url", label: "Post URL", placeholder: "https://www.instagram.com/..." }] },
    { id: "downloader/youtube", title: "YouTube Downloader", fields: [{ name: "url", label: "Video URL", placeholder: "https://www.youtube.com/watch?v=..." }] },
    { id: "ai/copilot", title: "AI Copilot", fields: [{ name: "text", label: "Text", placeholder: "Tanyakan apa saja..." }, { name: "model", label: "Model", default: "gpt-5" }] },
    { id: "search/pinterest", title: "Pinterest Search", fields: [{ name: "query", label: "Query", placeholder: "Ide desain rumah" }] },
    { id: "tools/shortlink", title: "Shortlink Generator", fields: [{ name: "url", label: "URL", placeholder: "https://example.com/url-panjang" }] }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🚀 Rafzhost API Dashboard</h1>
        <p style={{ color: "#bbb" }}>Test endpoint langsung dari sini. Dokumentasi Swagger tersedia di <code>/api/docs</code> (jika sudah dikonfigurasi).</p>
      </div>

      <div style={styles.grid}>
        {cards.map(c => (
          <ApiCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
