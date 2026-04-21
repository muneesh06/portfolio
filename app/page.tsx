"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────────── */
const stats = [
  { value: 4,   suffix: "+", label: "Years of experience"      },
  { value: 6,   suffix: "",  label: "Microsoft certifications"  },
  { value: 1,   suffix: "",  label: "IEEE publication"          },
  { value: 3.8, suffix: "",  label: "GPA at Wright State"       },
];

const focusAreas = [
  { icon: "◈", title: "RAG workflows",      desc: "Retrieval-first pipelines that stay fast, clean, and explainable." },
  { icon: "◉", title: "LLM tooling",        desc: "Lightweight planning and evaluation tools that teams actually use." },
  { icon: "◎", title: "API-first delivery", desc: "Fast APIs, reliable deployments, and clear documentation."        },
  { icon: "◇", title: "Product clarity",    desc: "Ship systems that feel calm, reliable, and easy to maintain."     },
];

const stack = [
  { label: "Core",     value: "Python · TypeScript · Java · C/C++ · SQL"      },
  { label: "AI / ML",  value: "PyTorch · TensorFlow · LangChain · LlamaIndex"  },
  { label: "Backend",  value: "FastAPI · Flask · Spring Boot · Node.js"         },
  { label: "Cloud",    value: "Azure · Docker · Kubernetes · CI/CD"             },
  { label: "Data",     value: "MySQL · MongoDB · Apache Spark · NoSQL"          },
  { label: "Frontend", value: "React · Angular · Next.js · Tailwind"            },
];

const skills = [
  { name: "Python / ML",          pct: 95 },
  { name: "RAG & LLM Systems",    pct: 90 },
  { name: "FastAPI / Backend",    pct: 88 },
  { name: "Azure / DevOps",       pct: 82 },
  { name: "Kubernetes / Docker",  pct: 80 },
  { name: "React / Frontend",     pct: 78 },
];

const experiences = [
  {
    role: "Software Engineer", org: "Accenture", period: "2022 – 2023", accent: "violet",
    highlights: [
      "Owned core backend services for data and model orchestration at scale.",
      "Optimized ML pipelines for reliability, stability, and faster iteration cycles.",
      "Implemented CI/CD practices with containerized deployments on Azure.",
      "Improved observability with structured logging and actionable metrics.",
    ],
  },
  {
    role: "AI/ML Research Assistant", org: "HuT Labs — Amrita University", period: "2019 – 2022", accent: "gold",
    highlights: [
      "Trained and evaluated predictive models with clean experiment tracking.",
      "Published IEEE research on ML for cardiovascular disease prediction.",
      "Built lightweight prototypes to validate new ideas quickly.",
      "Designed feature pipelines and end-to-end model evaluation workflows.",
    ],
  },
  {
    role: "IEEE Execom Member", org: "IEEE Student Branch", period: "2019 – 2021", accent: "cyan",
    highlights: [
      "Organized technical workshops and student engagement events.",
      "Mentored juniors on robotics, embedded programming, and applied AI.",
    ],
  },
];

const projects = [
  { title: "RAG Knowledge Assistant",      desc: "Retrieval-first assistant for document-heavy workflows with fast, grounded, explainable answers.",          stack: ["RAG", "LLM", "FastAPI", "Vector Search"], accent: "violet", featured: false },
  { title: "CV Disease Prediction",        desc: "IEEE-published ML system for cardiovascular risk prediction. DOI: 10.1109/ASIANCON55314.2022.9908772",       stack: ["Healthcare AI", "ML Research", "IEEE"],   accent: "gold",   featured: true  },
  { title: "Sentiment Analyzer",           desc: "End-to-end NLP pipeline with clean preprocessing, evaluation metrics, and production API.",                   stack: ["Python", "NLP", "FastAPI"],              accent: "violet", featured: false },
  { title: "Image Classification",         desc: "YOLO-driven object detection with supporting ML models for multi-class classification.",                       stack: ["YOLO", "Computer Vision", "PyTorch"],    accent: "cyan",   featured: false },
  { title: "Parallel Algorithm Optimizer", desc: "4× speedup on 8-core systems using parallel merge sort and quicksort via OpenMP + MPI.",                     stack: ["C", "OpenMP", "MPI"],                    accent: "gold",   featured: false },
  { title: "Culinary Automation System",   desc: "ROS-based automation for a multi-step cooking workflow with sensor-driven real-time control.",                 stack: ["ROS", "Embedded", "Automation"],         accent: "cyan",   featured: false },
];

const certs = [
  { name: "Microsoft Engineer Program — AI Engineer",                      year: "2025–2026", accent: "violet" },
  { name: "Microsoft Certified: Power Platform Fundamentals (PL-900)",     year: "Nov 2023",  accent: "cyan"   },
  { name: "Microsoft Certified: Dynamics 365 Fundamentals CRM (MB-910)",   year: "Oct 2023",  accent: "cyan"   },
  { name: "Microsoft Certified: Security, Compliance & Identity (SC-900)", year: "Aug 2023",  accent: "gold"   },
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)",              year: "Jun 2023",  accent: "violet" },
  { name: "Accenture Certified Full Stack Developer",                       year: "2022",      accent: "gold"   },
];

const marqueeItems = [
  "Python", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "FastAPI",
  "RAG Pipelines", "Azure", "Docker", "Kubernetes", "React", "Next.js",
  "Apache Spark", "MongoDB", "TypeScript", "OpenAI API", "YOLO", "ROS",
];

const navLinks = [
  { href: "#overview",       label: "Overview"   },
  { href: "#experience",     label: "Experience" },
  { href: "#projects",       label: "Projects"   },
  { href: "#skills",         label: "Skills"     },
  { href: "#certifications", label: "Certs"      },
  { href: "#contact",        label: "Contact"    },
];

type Theme = "auto" | "light" | "dark";

/* accent colour helpers */
const av = (a: string) =>
  a === "violet" ? "var(--violet)"
  : a === "cyan" ? "var(--cyan)"
  : "var(--gold)";

const tagClass = (a: string) =>
  a === "violet" ? "tag"
  : a === "cyan"   ? "tag tag-cyan"
  : "tag tag-gold";

/* ─── Hooks ──────────────────────────────────────────────────────── */
function useTheme() {
  const [theme, setThemeState] = useState<Theme>("auto");

  useEffect(() => {
    // Read what the blocking script already applied
    const pref = (document.documentElement.getAttribute("data-theme-pref") as Theme) || "auto";
    setThemeState(pref);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme-pref", t);
    let resolved: string = t;
    if (t === "auto") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", resolved);
  }, []);

  // Watch for system preference changes when in auto mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if ((localStorage.getItem("theme") || "auto") === "auto") {
        document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return { theme, setTheme };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll(".skill-bar-fill");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("animated"); }),
      { threshold: 0.4 }
    );
    bars.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
}

function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector(".cursor-dot")  as HTMLElement | null;
    const ring = document.querySelector(".cursor-ring") as HTMLElement | null;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const mv  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const on  = () => ring.classList.add("hovered");
    const off = () => ring.classList.remove("hovered");
    const tick = () => {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", mv);
    document.querySelectorAll("a,button,.project-card,.stat-card,.cert-card,.focus-card,.card").forEach((el) => {
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
    });
    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
}

/* ─── Sub-components ─────────────────────────────────────────────── */

/* Theme toggle with proper SVG icons */
function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {/* Auto */}
      <button className={`theme-btn${theme === "auto" ? " active" : ""}`} onClick={() => setTheme("auto")} title="Auto (system)" aria-label="Auto theme">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      </button>
      {/* Light */}
      <button className={`theme-btn${theme === "light" ? " active" : ""}`} onClick={() => setTheme("light")} title="Light" aria-label="Light theme">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
      </button>
      {/* Dark */}
      <button className={`theme-btn${theme === "dark" ? " active" : ""}`} onClick={() => setTheme("dark")} title="Dark" aria-label="Dark theme">
        <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const dec = value % 1 !== 0;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          const q = 1 - Math.pow(1 - p, 4);
          setCount(dec ? parseFloat((q * value).toFixed(1)) : Math.floor(q * value));
          if (p < 1) requestAnimationFrame(tick); else setCount(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return (
    <div className="stat-card reveal" ref={ref}>
      <div className="stat-value">{count}{suffix}</div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
      <div className={`marquee-track${reverse ? " marquee-track-r" : ""}`}>
        {items.map((s, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem", whiteSpace: "nowrap", padding: "0 0.5rem",
            color: i % 3 === 0 ? "var(--violet)" : i % 3 === 1 ? "var(--text-3)" : "var(--cyan)",
            letterSpacing: "0.05em",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

const cs: React.CSSProperties = {
  padding: "1.6rem 1.75rem", borderRadius: "14px",
  background: "var(--surface)", border: "1px solid var(--border)",
  boxShadow: "var(--shadow-sm)",
  transition: "border-color 0.3s, background 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
};

function ho(accent = "var(--border-strong)") {
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.borderColor = accent;
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "var(--shadow-md)";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const { theme, setTheme } = useTheme();
  useReveal(); useSkillBars(); useCursor();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const { scrollY } = useScroll();
  const heroY  = useTransform(scrollY, [0, 600], [0, 100]);
  const heroOp = useTransform(scrollY, [0, 380], [1, 0]);

  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    navLinks.forEach(({ href }) => { const el = document.getElementById(href.slice(1)); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      {/* Scroll progress bar */}
      <motion.div style={{
        scaleX, transformOrigin: "left",
        position: "fixed", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, var(--violet), var(--cyan))",
        zIndex: 201,
      }} />

      {/* ── Nav ── */}
      <nav className="nav">
        <span className="nav-logo">M<span className="nav-logo-dot">.</span></span>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div className="nav-links-inner" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className={`nav-link${activeSection === href.slice(1) ? " active" : ""}`}>{label}</a>
            ))}
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <a href="/Resume.pdf" className="btn-outline" style={{ padding: "7px 16px", fontSize: "0.75rem" }}>Resume ↗</a>
        </div>
      </nav>

      <main style={{ paddingTop: "62px" }}>

        {/* ── Hero ── */}
        <section style={{
          minHeight: "calc(100vh - 62px)", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "4rem 2.5rem 3rem",
          maxWidth: "1200px", margin: "0 auto", position: "relative",
        }}>
          {/* Grid bg */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
            WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 50%,black,transparent)",
            opacity: 0.6,
          }} />

          <motion.div style={{ y: heroY, opacity: heroOp, position: "relative", zIndex: 1 }}>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ marginBottom: "2.25rem" }}>
              <span className="avail-badge"><span className="avail-dot" />Available for roles — May 2026</span>
            </motion.div>

            {/* Text + card row */}
            <div className="hero-row" style={{ display: "flex", alignItems: "flex-start", gap: "3.5rem", flexWrap: "wrap" }}>

              {/* Left */}
              <div style={{ flex: "1 1 400px" }}>
                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16,1,0.3,1] }}
                >
                  Building{" "}
                  <span className="grad-text">clean AI</span>
                  <br />
                  systems that{" "}
                  <span className="grad-text-gold">actually</span>
                  <br />
                  ship.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.38 }}
                  style={{ maxWidth: "480px", fontSize: "1.0625rem", lineHeight: "1.75", color: "var(--text-2)", marginTop: "1.75rem", marginBottom: "2rem" }}
                >
                  I design retrieval-first workflows, build lightweight LLM tools,
                  and deliver full-stack AI products with an emphasis on clarity and maintainability.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.52 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
                >
                  <a href="#projects" className="btn-primary">View work →</a>
                  <a href="https://www.linkedin.com/in/muneeshp" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
                  <a href="mailto:muneesh.puligundla@gmail.com" className="btn-outline">Email me</a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.75rem" }}
                >
                  {["AI / ML Engineer", "RAG Systems", "LLM Tooling", "Full-Stack", "Wright State MS CS"].map((t) => (
                    <span key={t} className="tag tag-muted">{t}</span>
                  ))}
                </motion.div>
              </div>

              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.16,1,0.3,1] }}
                style={{ flex: "0 0 auto" }}
              >
                <div className="profile-card">
                  <div className="profile-ring">
                    <div className="profile-inner">
                      <Image src="/ai-profile.png" alt="Sai Muneesh" width={130} height={130} priority style={{ borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text)", letterSpacing: "-0.02em" }}>Sai Muneesh</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-3)", marginTop: "2px", fontFamily: "var(--font-mono)" }}>AI / ML Engineer</p>
                  </div>

                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {[
                      { dot: "var(--violet)", label: "Open to opportunities" },
                      { dot: "var(--gold)",   label: "Wright State — May '26" },
                      { dot: "var(--cyan)",   label: "Dayton, OH / Remote"   },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.75rem", color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ position: "absolute", bottom: "2rem", right: "2.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-3)", letterSpacing: "0.08em" }}
          >
            <motion.span animate={{ y: [0,5,0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>↓</motion.span>
            SCROLL
          </motion.div>
        </section>

        {/* ── Stats ── */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "1.25rem" }}>
              {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div style={{ padding: "2.25rem 0", display: "flex", flexDirection: "column", gap: "0.875rem", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
          <Marquee /><Marquee reverse />
        </div>

        {/* ── Overview ── */}
        <section id="overview" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden>About</span>
          <div className="section-num reveal">01 — OVERVIEW</div>
          <h2 style={{ fontSize: "clamp(1.875rem,3.5vw,2.75rem)", marginBottom: "1rem", maxWidth: "600px" }} className="reveal reveal-d1">Product-minded AI delivery</h2>
          <p style={{ maxWidth: "540px", marginBottom: "3rem", lineHeight: "1.85" }} className="reveal reveal-d2">
            Computer science graduate student at Wright State with 4+ years building ML systems.
            My focus is retrieval-first workflows, LLM tooling, and end-to-end products that feel reliable.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {focusAreas.map((area, i) => (
              <div key={area.title} className={`focus-card reveal reveal-d${i + 1}`}>
                <div style={{ fontSize: "1.1rem", color: "var(--violet)", marginBottom: "0.625rem" }}>{area.icon}</div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.4rem", fontFamily: "var(--font-display)" }}>{area.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.7" }}>{area.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ padding: "1.1rem 1.6rem", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-3)", letterSpacing: "0.1em" }}>STACK SNAPSHOT</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
              {stack.map((item, i) => (
                <div key={item.label} style={{
                  padding: "1.1rem 1.6rem", display: "flex", gap: "1rem",
                  borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: i < stack.length - 2 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--violet)", width: "60px", flexShrink: 0, paddingTop: "2px" }}>{item.label}</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: "1.6" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Experience ── */}
        <section id="experience" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden>Work</span>
          <div className="section-num reveal">02 — EXPERIENCE</div>
          <h2 style={{ fontSize: "clamp(1.875rem,3.5vw,2.75rem)", marginBottom: "3.5rem" }} className="reveal reveal-d1">Where I have delivered</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experiences.map((exp, i) => (
              <div key={exp.role} className={`timeline-item reveal reveal-d${i + 1}`} style={{ paddingBottom: "2.5rem" }}>
                <div style={{ ...cs }} {...ho()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>{exp.role}</h3>
                      <p style={{ fontSize: "0.8125rem", color: "var(--text-3)", marginTop: "2px" }}>{exp.org}</p>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.6875rem", padding: "4px 11px", borderRadius: "6px",
                      color: av(exp.accent), background: `color-mix(in srgb, ${av(exp.accent)} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${av(exp.accent)} 25%, transparent)`,
                    }}>{exp.period}</span>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {exp.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "var(--text-2)", lineHeight: "1.65" }}>
                        <span style={{ color: av(exp.accent), flexShrink: 0, paddingTop: "1px" }}>›</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Projects ── */}
        <section id="projects" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden>Build</span>
          <div className="section-num reveal">03 — PROJECTS</div>
          <h2 style={{ fontSize: "clamp(1.875rem,3.5vw,2.75rem)", marginBottom: "3.5rem" }} className="reveal reveal-d1">Featured builds</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.1rem" }}>
            {projects.map((p, i) => (
              <div key={p.title} className={`project-card reveal reveal-d${(i % 4) + 1}`} style={p.featured ? { gridColumn: "span 2" } : undefined}>
                {p.featured && <div style={{ marginBottom: "0.625rem" }}><span className="tag tag-gold">◆ IEEE Published</span></div>}
                <h3 style={{ fontSize: p.featured ? "1.125rem" : "0.9375rem", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)" }}>{p.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.7", marginBottom: "1.1rem" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {p.stack.map((s) => <span key={s} className={tagClass(p.accent)}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Skills ── */}
        <section id="skills" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden>Stack</span>
          <div className="section-num reveal">04 — SKILLS</div>
          <h2 style={{ fontSize: "clamp(1.875rem,3.5vw,2.75rem)", marginBottom: "3.5rem" }} className="reveal reveal-d1">Core competencies</h2>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }} className="reveal">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-2)" }}>{s.name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--violet)" }}>{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${s.pct}%`, transitionDelay: `${i * 0.1}s` }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }} className="reveal reveal-d2">
              {[
                { label: "Languages", items: ["Python", "TypeScript", "Java", "C/C++", "SQL"] },
                { label: "AI / ML",   items: ["PyTorch", "TensorFlow", "LangChain", "LlamaIndex"] },
                { label: "Backend",   items: ["FastAPI", "Flask", "Spring Boot", "Node.js"] },
                { label: "Cloud",     items: ["Azure", "Docker", "Kubernetes", "CI/CD"] },
              ].map((g) => (
                <div key={g.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.1rem" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--violet)", letterSpacing: "0.06em", marginBottom: "0.65rem" }}>{g.label}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {g.items.map((item) => <span key={item} style={{ fontSize: "0.8125rem", color: "var(--text-2)" }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Certifications ── */}
        <section id="certifications" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden>Certs</span>
          <div className="section-num reveal">05 — CERTIFICATIONS</div>
          <h2 style={{ fontSize: "clamp(1.875rem,3.5vw,2.75rem)", marginBottom: "3.5rem" }} className="reveal reveal-d1">Credentials</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "0.75rem" }}>
            {certs.map((c, i) => (
              <div key={c.name} className={`cert-card reveal reveal-d${(i % 3) + 1}`}>
                <div className="cert-dot" style={{ background: av(c.accent) }} />
                <div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text)", lineHeight: "1.5" }}>{c.name}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-3)", marginTop: "3px" }}>{c.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Contact ── */}
        <section id="contact" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem 8rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden>Hello</span>
          <div className="section-num reveal">06 — CONTACT</div>
          <h2 style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)", marginBottom: "0.875rem", maxWidth: "580px" }} className="reveal reveal-d1">
            Let's build something{" "}
            <span style={{ background: "linear-gradient(135deg, var(--violet), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>useful</span>.
          </h2>
          <p style={{ maxWidth: "440px", marginBottom: "2.75rem", lineHeight: "1.8" }} className="reveal reveal-d2">
            Open to full-time roles in AI/ML and software engineering. I respond quickly.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "0.875rem" }} className="reveal reveal-d3">
            {[
              { label: "EMAIL",    value: "muneesh.puligundla@gmail.com",  href: "mailto:muneesh.puligundla@gmail.com",       accent: "violet" },
              { label: "PHONE",    value: "+1 (937) 219-0695",         href: "tel:+19372190695",                      accent: "gold"   },
              { label: "LINKEDIN", value: "in/muneeshp",               href: "https://www.linkedin.com/in/muneeshp", accent: "cyan"   },
              { label: "GITHUB",   value: "muneesh06",                 href: "https://github.com/muneesh06",         accent: "violet" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                style={{ ...cs, display: "flex", flexDirection: "column", gap: "0.4rem" }}
                {...ho()}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: av(item.accent), letterSpacing: "0.1em" }}>{item.label}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text)" }}>{item.value}</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: "2.25rem" }} className="reveal reveal-d4">
            <a href="https://www.linkedin.com/in/muneeshp" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: "0.9375rem", padding: "12px 30px" }}>
              Message on LinkedIn →
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>
          Muneesh<span style={{ color: "var(--violet)" }}>.</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-3)", letterSpacing: "0.07em" }}>
          AI / ML ENGINEER — WRIGHT STATE — {new Date().getFullYear()}
        </span>
        <a href="/Resume.pdf" className="btn-outline" style={{ padding: "7px 16px", fontSize: "0.75rem" }}>Download Resume ↗</a>
      </footer>
    </>
  );
}