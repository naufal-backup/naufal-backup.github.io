import Link from "next/link";

export const metadata = {
  title: "Naufal Gastiadirrijal Fawwaz Alamsyah — Frontend & Full-Stack Developer",
  description:
    "Resume formal Naufal Alamsyah: Software Engineering fresh graduate Telkom University Surabaya. React, Next.js, Laravel. Pengalaman HRIS, project production, GitHub, pendidikan, dan kontak profesional.",
};

const EMAIL = "naufalalamsyah453@gmail.com";
const PHONE_DISPLAY = "+62 813-8187-989";
const CV_PATH = "/documents/CV-1.pdf";

const techGroups = [
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    title: "Backend & Database",
    items: ["Laravel", "PHP", "MySQL", "PostgreSQL", "Supabase", "REST API"],
  },
  {
    title: "Tools",
    items: ["Git", "Figma", "Chart.js", "Discord Webhook", "VS Code", "PHPSpreadsheet"],
  },
  {
    title: "Game & Desktop",
    items: ["Godot Engine (WebGL/HTML5)", "Unity2D", "GTK", "Electron", "Linux Shell Script", "Python", "C#"],
  },
];

const stats = [
  { label: "Public Repos", value: "23" },
  { label: "Stars Earned", value: "16" },
  { label: "Followers", value: "2" },
  { label: "Following", value: "5" },
];

const pinnedRepos = [
  {
    name: "disbox",
    desc: "Discord Webhook-backed file storage client (desktop) — arsitektur upload pipeline real-time, auth via Supabase.",
    lang: "JavaScript / Electron",
    stars: 16,
  },
  {
    name: "disbox-mobile",
    desc: "Mobile client untuk Disbox — akses file storage dari browser HP.",
    lang: "JavaScript",
    stars: 0,
  },
  {
    name: "AELauncher",
    desc: "Application launcher desktop — manajemen shortcut aplikasi.",
    lang: "JavaScript",
    stars: 0,
  },
  {
    name: "naufal-backup.github.io",
    desc: "Website portfolio ini — Next.js static export, Tailwind CSS, Framer Motion, deploy GitHub Pages.",
    lang: "JavaScript / Next.js",
    stars: 0,
  },
  {
    name: "Gtk-Theme-Customizer",
    desc: "Utilitas kustomisasi tema GTK di Linux — shell script + antarmuka desktop.",
    lang: "JavaScript / Shell",
    stars: 0,
  },
  {
    name: "YT-downloader",
    desc: "Downloader YouTube sederhana untuk kebutuhan personal.",
    lang: "JavaScript",
    stars: 0,
  },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="resume-section">
      <h2 className="resume-h2">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="resume-root">
      <style>{`
        .resume-root { background: #ffffff; color: #1a1a1a; min-height: 100vh; font-family: Arial, Helvetica, sans-serif; }
        .resume-topbar { background: #0a0a0a; color: #f5f5f5; }
        .resume-container { max-width: 880px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }
        .resume-h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.25rem; }
        .resume-role { font-size: 1.05rem; color: #374151; margin-bottom: 0.75rem; }
        .resume-contact { font-size: 0.9rem; color: #4b5563; line-height: 1.7; }
        .resume-contact a { color: #1d4ed8; text-decoration: none; }
        .resume-contact a:hover { text-decoration: underline; }
        .resume-h2 { font-size: 1.15rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.4rem; margin: 2rem 0 1rem; }
        .resume-section p, .resume-section li { font-size: 0.95rem; line-height: 1.7; color: #1f2937; }
        .resume-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 640px) { .resume-grid { grid-template-columns: 1fr; } }
        .resume-card { border: 1px solid #e5e7eb; border-radius: 0.6rem; padding: 1rem 1.1rem; background: #fafafa; }
        .resume-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
        .resume-card .meta { font-size: 0.8rem; color: #6b7280; margin-bottom: 0.5rem; }
        .resume-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem; }
        .resume-tag { font-size: 0.78rem; background: #eef2ff; color: #3730a3; border: 1px solid #e0e7ff; border-radius: 999px; padding: 0.15rem 0.65rem; }
        .resume-list { padding-left: 1.2rem; list-style: disc; }
        .resume-list li { margin-bottom: 0.35rem; }
        .resume-timeline-item { margin-bottom: 1.4rem; }
        .resume-timeline-item h3 { font-size: 1rem; font-weight: 700; }
        .resume-timeline-item .meta { font-size: 0.82rem; color: #6b7280; margin: 0.15rem 0 0.5rem; }
        .resume-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.25rem; }
        .resume-btn { display: inline-block; padding: 0.65rem 1.4rem; border-radius: 0.55rem; font-weight: 600; font-size: 0.9rem; text-decoration: none; }
        .resume-btn-primary { background: #1d4ed8; color: #fff; }
        .resume-btn-secondary { background: #fff; color: #111827; border: 1px solid #d1d5db; }
        @media print {
          .resume-topbar, .resume-actions, .resume-no-print { display: none !important; }
          .resume-container { max-width: 100%; padding: 0; }
          .resume-root { background: #fff; }
          .resume-card { background: #fff; break-inside: avoid; }
          .resume-section { break-inside: avoid-page; }
          a { text-decoration: none; color: #111827; }
        }
      `}</style>

      <div className="resume-topbar resume-no-print">
        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "#f5f5f5", textDecoration: "none", fontWeight: 700 }}>
            ← Kembali ke Home
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={CV_PATH}
              download
              style={{
                background: "#4a9eff",
                color: "#fff",
                padding: "0.55rem 1.2rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Download CV (PDF)
            </a>
            <Link
              href="/#portfolio"
              style={{
                border: "1px solid #2a2a2a",
                color: "#f5f5f5",
                padding: "0.55rem 1.2rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Lihat Portfolio
            </Link>
          </div>
        </div>
      </div>

      <main className="resume-container">
        <header>
          <h1 className="resume-h1">Naufal Gastiadirrijal Fawwaz Alamsyah</h1>
          <p className="resume-role">
            Frontend &amp; Full-Stack Developer — Fresh Graduate, Software Engineering, Telkom
            University Surabaya
          </p>
          <p className="resume-contact">
            Surabaya, Indonesia | {PHONE_DISPLAY} |{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <br />
            GitHub: <a href="https://github.com/naufal-backup">github.com/naufal-backup</a>{" "}
            (sebelumnya: <a href="https://github.com/naufal453">github.com/naufal453</a>) |{" "}
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/naufal-g-f-alamsyah/">
              linkedin.com/in/naufal-g-f-alamsyah
            </a>
          </p>
          <div className="resume-actions">
            <a href={CV_PATH} download className="resume-btn resume-btn-primary">
              Download CV (PDF)
            </a>
            <a href={`mailto:${EMAIL}`} className="resume-btn resume-btn-secondary">
              Hubungi via Email
            </a>
          </div>
        </header>

        <Section id="ringkasan" title="Ringkasan Profil">
          <p>
            Fresh graduate Software Engineering dari Telkom University Surabaya. Membangun
            aplikasi web yang responsif dan rapi menggunakan React.js, Next.js, dan Laravel —
            dengan pengalaman hands-on lewat internship dan project production. Terbuka untuk
            peluang Frontend dan Full-Stack Developer. Fokus pada clean code, UI yang
            pixel-perfect, dan solusi digital yang user-friendly.
          </p>
        </Section>

        <Section id="stack" title="Stack Teknis">
          <div className="resume-grid">
            {techGroups.map((group) => (
              <div key={group.title} className="resume-card">
                <h3>{group.title}</h3>
                <div className="resume-tags">
                  {group.items.map((item) => (
                    <span key={item} className="resume-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="pengalaman" title="Pengalaman Kerja">
          <div className="resume-timeline-item">
            <h3>Software Development Intern — HR Dept, Telkom University Surabaya</h3>
            <p className="meta">Sep 2025 – Jan 2026 · Surabaya, Indonesia</p>
            <p className="meta">Tech: Laravel, MySQL, Chart.js, Tailwind CSS, Bootstrap, PHPSpreadsheet</p>
            <ul className="resume-list">
              <li>
                Problem: tim HR mengelola data performa karyawan manual via spreadsheet —
                sering delay dan inkonsistensi data.
              </li>
              <li>
                Role &amp; Action: sole developer; membangun HRIS Dashboard end-to-end dengan
                tracking status Trained vs Untrained dan visualisasi Chart.js (Bar &amp; Radar).
              </li>
              <li>
                Result: waktu pembuatan laporan turun 60% dan effort entri data manual turun
                80% per siklus HR.
              </li>
            </ul>
          </div>
        </Section>

        <Section id="project" title="Project Teknis Penting">
          <div className="resume-timeline-item">
            <h3>
              Disbox Web — Discord-integrated file storage ·{" "}
              <a href="https://disbox-web-e24.pages.dev/">disbox-web.pages.dev</a>
            </h3>
            <p className="meta">React.js, Supabase, Tailwind CSS</p>
            <ul className="resume-list">
              <li>Sole developer; arsitektur file storage berbasis Discord Webhook + Supabase Auth.</li>
              <li>Hasil: biaya hosting $0/bulan, production-ready di browser PC dan mobile.</li>
            </ul>
          </div>
          <div className="resume-timeline-item">
            <h3>
              Ruang Santri — Islamic boarding school management system ·{" "}
              <a href="https://ruang-santri.netlify.app/">ruang-santri.netlify.app</a>
            </h3>
            <p className="meta">Laravel, Blade, MySQL</p>
            <ul className="resume-list">
              <li>Refactor total frontend: modular Blade components, service files, optimasi aset.</li>
              <li>Hasil: kecepatan load naik signifikan, skor Lighthouse performance 90+.</li>
            </ul>
          </div>
          <div className="resume-timeline-item">
            <h3>HRIS Dashboard — HR performance monitoring</h3>
            <p className="meta">Laravel, Chart.js, MySQL</p>
            <ul className="resume-list">
              <li>Visualisasi Bar &amp; Radar interaktif + tracking status Trained vs Untrained.</li>
              <li>Hasil: dashboard monitoring fungsional penuh, laporan 60% lebih cepat.</li>
            </ul>
          </div>
        </Section>

        <Section id="github" title="GitHub Activity & Achievements">
          <div className="resume-grid" style={{ marginBottom: "1rem" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="resume-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>{stat.value}</div>
                <div style={{ fontSize: "0.82rem", color: "#6b7280" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="resume-card" style={{ marginBottom: "1rem" }}>
            <h3>🌟 Earned Badge: Starstruck</h3>
            <p className="meta">16 stars pada satu repo (disbox)</p>
          </div>
          <div className="resume-grid">
            {pinnedRepos.map((repo) => (
              <div key={repo.name} className="resume-card">
                <h3>
                  <a href={`https://github.com/naufal-backup/${repo.name}`}>{repo.name}</a>
                  {repo.stars > 0 && (
                    <span style={{ fontSize: "0.8rem", color: "#b45309" }}> · ★ {repo.stars}</span>
                  )}
                </h3>
                <p className="meta">{repo.lang}</p>
                <p>{repo.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="pendidikan" title="Pendidikan">
          <div className="resume-timeline-item">
            <h3>Bachelor of Engineering in Software Engineering — Telkom University Surabaya</h3>
            <p className="meta">Sep 2022 – Jul 2026 (Graduated) · GPA: 3.71 / 4.00</p>
            <p>Relevant Coursework: Object-Oriented Programming, Database Management, Web Development, Game Development.</p>
          </div>
        </Section>

        <Section id="kontak" title="Kontak Profesional">
          <p>
            Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <br />
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/naufal-g-f-alamsyah/">
              linkedin.com/in/naufal-g-f-alamsyah
            </a>
            <br />
            GitHub: <a href="https://github.com/naufal-backup">github.com/naufal-backup</a>
            <br />
            File CV: <a href={CV_PATH}>Download CV-1.pdf</a> · Halaman ini print-friendly
            (Ctrl/Cmd + P langsung dari browser).
          </p>
          <p className="resume-no-print" style={{ marginTop: "1rem" }}>
            <Link href="/">← Kembali ke halaman utama</Link>
          </p>
        </Section>
      </main>
    </div>
  );
}
