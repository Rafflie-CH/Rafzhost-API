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
      const res = await fetch(`/api/${id}?${params}`);
      const json = await res.json();
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
  header: { textAlign: "center", marginBottom: 16 },
  grid: { display: "grid", gridTemplateColumns: "1fr", gap: 20, maxWidth: 900, margin: "0 auto" },
  card: { background: "#1a1a2e", padding: 18, borderRadius: 12 },
  input: { width: "100%", padding: 10, borderRadius: 8, border: "none", marginBottom: 6 },
  button: { background: "#7c3aed", color: "#fff", padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" },
  // 🚀 PERBAIKAN DI BAGIAN INI UNTUK WORD WRAP
  pre: { 
    background: "#05050a", 
    padding: 12, 
    borderRadius: 8, 
    color: "#7eff7e", 
    marginTop: 8, 
    minHeight: 60,
    whiteSpace: 'pre-wrap',  // Memungkinkan pemecahan baris
    wordBreak: 'break-all',   // Memecah string panjang (seperti URL)
    overflow: 'auto'          // Opsional: Untuk scroll jika konten sangat besar
  }
};

export default function Home() {
  const cards = [
    { id: "downloader/tiktok", title: "TikTok Downloader", fields: [{ name: "url", label: "Video URL" }] },
    { id: "downloader/instagram", title: "Instagram Downloader", fields: [{ name: "url", label: "Post URL" }] },
    { id: "downloader/youtube", title: "YouTube Downloader", fields: [{ name: "url", label: "Video URL" }] },
    { id: "ai/copilot", title: "AI Copilot", fields: [{ name: "text", label: "Text" }, { name: "model", label: "Model", default: "gpt-5" }] },
    { id: "search/pinterest", title: "Pinterest Search", fields: [{ name: "query", label: "Query" }] },
    { id: "tools/shortlink", title: "Shortlink Generator", fields: [{ name: "url", label: "URL" }] }
    // you can add more cards for other endpoints
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🚀 Rafzhost API Dashboard</h1>
        <p style={{ color: "#bbb" }}>Test endpoint langsung dari sini — jangan lupa paste logic asli ke folder <code>src/</code>.</p>
      </div>

      <div style={styles.grid}>
        {cards.map(c => (
          <ApiCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
