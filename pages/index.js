import { useState } from "react";

// Komponen ApiCard yang baru dengan fitur collapsible
function ApiCard({ id, title, fields }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State untuk membuka/menutup card

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
      {/* Header card yang bisa diklik untuk membuka/menutup */}
      <div style={styles.cardHeader} onClick={() => setIsOpen(!isOpen)}>
        <h2 style={{ margin: 0, color: '#e6e6e6' }}>{title} <span style={styles.apiPath}>GET /api/{id}</span></h2>
        <span style={styles.arrow}>{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && ( // Konten hanya render jika card terbuka
        <div>
          <div style={styles.section}>
            <h3>Parameters</h3>
            <form id={`${id}-form`} onSubmit={onSubmit}>
              {fields.map(f => (
                <div key={f.name} style={{ marginBottom: 8 }}>
                  <label style={{ display: "block", marginBottom: 4, color: '#a0a0a0' }}>{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder || ""} defaultValue={f.default || ""} style={styles.input} />
                </div>
              ))}
              <button type="submit" style={styles.button}>Execute</button>
            </form>
          </div>

          <div style={styles.section}>
            <h3>Responses</h3>
            <pre style={styles.pre}>{loading ? "Loading..." : result}</pre>
          </div>
        </div>
      )}
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
    marginBottom: 24,
    fontSize: '1.8rem'
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr", // Tetap 1 kolom untuk mobile-first
    gap: 16, // Jarak antar card
    maxWidth: 900,
    margin: "0 auto"
  },
  card: {
    background: "#1a1a2e",
    borderRadius: 8,
    overflow: 'hidden', // Penting untuk border-radius dan collapsible
    border: '1px solid #2a2a44'
  },
  cardHeader: {
    background: "#2a2a44",
    padding: "12px 18px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    borderBottom: '1px solid #3a3a5e' // Garis pemisah
  },
  apiPath: {
    fontSize: '0.8rem',
    color: '#a0a0a0',
    marginLeft: 10
  },
  arrow: {
    color: '#7c3aed',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  section: {
    padding: 18,
    borderBottom: '1px solid #2a2a44'
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 4,
    border: "1px solid #3a3a5e",
    marginBottom: 6,
    background: "#0f0f1a",
    color: "#e6e6e6",
    boxSizing: 'border-box' // Penting agar padding tidak melebarkan input
  },
  button: {
    background: "#7c3aed",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: '0.9rem'
  },
  pre: {
    background: "#05050a",
    padding: 12,
    borderRadius: 4,
    color: "#7eff7e",
    marginTop: 8,
    minHeight: 60,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflow: 'auto',
    fontSize: '0.85rem' // Sedikit lebih kecil agar mirip code block
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
        <p style={{ color: "#bbb", fontSize: '1rem' }}>Test endpoint langsung dari sini. Dokumentasi Swagger tersedia di <a href="/api/docs" style={{ color: '#7c3aed', fontWeight: 'bold' }}>/api/docs</a>.</p>
      </div>

      <div style={styles.grid}>
        {cards.map(c => (
          <ApiCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
