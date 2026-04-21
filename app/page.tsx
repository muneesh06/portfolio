"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const stats = [
  { value: 4,   suffix: "+", label: "Years of experience" },
  { value: 6,   suffix: "",  label: "Microsoft certifications" },
  { value: 1,   suffix: "",  label: "IEEE publication" },
  { value: 3.8, suffix: "",  label: "GPA at Wright State" },
];

const focusAreas = [
  { icon: "◈", title: "RAG workflows",     desc: "Retrieval-first pipelines that stay fast, clean, and explainable." },
  { icon: "◉", title: "LLM tooling",       desc: "Lightweight planning and evaluation tools that teams actually use." },
  { icon: "◎", title: "API-first delivery", desc: "Fast APIs, reliable deployments, and clear documentation." },
  { icon: "◇", title: "Product clarity",   desc: "Ship systems that feel calm, reliable, and easy to maintain." },
];

const stack = [
  { label: "Core",        value: "Python · TypeScript · Java · C/C++ · SQL" },
  { label: "AI / ML",     value: "PyTorch · TensorFlow · LangChain · LlamaIndex" },
  { label: "Backend",     value: "FastAPI · Flask · Spring Boot · Node.js" },
  { label: "Cloud",       value: "Azure · Docker · Kubernetes · CI/CD" },
  { label: "Data",        value: "MySQL · MongoDB · Apache Spark · NoSQL" },
  { label: "Frontend",    value: "React · Angular · Next.js · Tailwind" },
];

<<<<<<< Updated upstream
const projects = [
  {
    title: "Sentiment Analyzer",
    desc: "Built an NLP pipeline to classify sentiment with clean preprocessing and evaluation.",
    stack: ["Python", "NLP", "Evaluation"],
  },
  {
    title: "RAG Knowledge Assistant",
    desc: "Retrieval-first assistant for document-heavy workflows with fast, grounded answers.",
    stack: ["RAG", "LLM", "FastAPI", "Vector Search"],
  },
  {
    title: "Image Classification & Detection",
    desc: "YOLO-driven object detection with supporting ML models for classification tasks.",
    stack: ["YOLO", "Computer Vision", "ML"],
  },
  {
    title: "Autonomous Culinary Automation System",
    desc: "ROS-based automation for a multi-step cooking workflow with sensor-driven control.",
    stack: ["ROS", "Automation", "Embedded Systems"],
  },
  {
    title: "High-Performance Parallel Algorithms",
    desc: "Parallel merge sort and quicksort implementation and optimization for multi-core systems.",
    stack: ["C", "OpenMP", "MPI"],
    highlights: [
      "Achieved 4x speedup on 8-core systems via efficient workload distribution.",
      "Applied profiling and performance tuning to reduce bottlenecks and improve concurrency.",
    ],
  },
  {
    title: "Publication: Cardiovascular Risk Prediction",
    desc: "Developing Machine Learning Models for Cardiovascular Disease Prediction — IEEE ASIANCON 2022.",
    stack: ["Healthcare AI", "ML Research", "IEEE"],
    highlights: [
      "Published research on ML approaches for cardiovascular risk prediction.",
      "DOI: 10.1109/ASIANCON55314.2022.9908772",
    ],
  },
];

const certifications = [
  "Microsoft Engineer Program - AI Engineer (2025-2026)",
  "Microsoft Certified: Power Platform Fundamentals (PL-900) - Nov 2023",
  "Microsoft Certified: Dynamics 365 Fundamentals CRM (MB-910) - Oct 2023",
  "Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900) - Aug 2023",
  "Microsoft Certified: Azure Fundamentals (AZ-900) - Jun 2023",
  "Accenture Certified Full Stack Developer - 2022",
];

const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C/C++", "SQL"],
  },
  {
    title: "AI Systems",
    items: [
      "LLM Integration",
      "RAG Pipelines",
      "Prompt Engineering",
      "Experimentation & Evaluation",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Angular",
      "HTML",
      "CSS",
      "Responsive Web Design",
      "Performance Optimization",
    ],
  },
  {
    title: "Backend & Infrastructure",
    items: [
      "FastAPI",
      "Flask",
      "Spring Boot",
      "RESTful APIs",
      "Microservices",
      "Node.js",
    ],
  },
  {
    title: "Distributed Systems",
    items: [
      "Kubernetes",
      "Docker",
      "Apache Spark",
      "Event-Driven Architecture",
      "Load Balancing",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Azure",
      "CI/CD Pipelines",
      "Git",
      "PyTest",
      "Playwright",
      "System Monitoring",
    ],
  },
  {
    title: "Databases",
    items: ["MySQL", "MongoDB", "NoSQL", "SQL Query Optimization"],
  },
  {
    title: "Core CS",
    items: [
      "Data Structures",
      "Algorithm Design",
      "System Design",
      "Agile/Scrum",
    ],
  },
=======
const skills = [
  { name: "Python / ML", pct: 95 },
  { name: "RAG & LLM Systems", pct: 90 },
  { name: "FastAPI / Backend", pct: 88 },
  { name: "Azure / DevOps", pct: 82 },
  { name: "React / Frontend", pct: 78 },
  { name: "Kubernetes / Docker", pct: 80 },
>>>>>>> Stashed changes
];

const experiences = [
  {
    role: "Software Engineer",
    org: "Accenture",
    period: "2022 – 2023",
    color: "var(--teal)",
    highlights: [
      "Owned core backend services for data and model orchestration at scale.",
      "Optimized ML pipelines for reliability, stability, and faster iteration cycles.",
      "Implemented CI/CD practices with containerized deployments on Azure.",
      "Improved observability with structured logging and actionable metrics.",
    ],
  },
  {
    role: "AI/ML Research Assistant",
    org: "HuT Labs — Amrita University",
    period: "2019 – 2022",
    color: "var(--amber)",
    highlights: [
      "Trained and evaluated predictive models with clean experiment tracking.",
      "Published IEEE research on ML for cardiovascular disease prediction.",
      "Built lightweight prototypes to validate new ideas quickly.",
      "Designed feature pipelines and end-to-end model evaluation workflows.",
    ],
  },
  {
    role: "IEEE Execom Member",
    org: "IEEE Student Branch",
    period: "2019 – 2021",
    color: "var(--blue)",
    highlights: [
      "Organized technical workshops and student engagement events.",
      "Mentored juniors on robotics, embedded programming, and applied AI.",
    ],
  },
];

const projects = [
  {
    title: "RAG Knowledge Assistant",
    desc: "Retrieval-first assistant for document-heavy workflows with fast, grounded, explainable answers.",
    stack: ["RAG", "LLM", "FastAPI", "Vector Search"],
    accent: "teal",
  },
  {
    title: "CV Disease Prediction",
    desc: "IEEE-published ML system for cardiovascular risk prediction. DOI: 10.1109/ASIANCON55314.2022.9908772",
    stack: ["Healthcare AI", "ML Research", "IEEE"],
    accent: "amber",
    featured: true,
  },
  {
    title: "Sentiment Analyzer",
    desc: "End-to-end NLP pipeline with clean preprocessing, evaluation metrics, and production API.",
    stack: ["Python", "NLP", "FastAPI"],
    accent: "teal",
  },
  {
    title: "Image Classification & Detection",
    desc: "YOLO-driven object detection with supporting ML models for multi-class classification.",
    stack: ["YOLO", "Computer Vision", "PyTorch"],
    accent: "blue",
  },
  {
    title: "Parallel Algorithm Optimization",
    desc: "Achieved 4× speedup on 8-core systems with parallel merge sort and quicksort via OpenMP + MPI.",
    stack: ["C", "OpenMP", "MPI"],
    accent: "amber",
  },
  {
    title: "Culinary Automation System",
    desc: "ROS-based automation for a multi-step cooking workflow with sensor-driven real-time control.",
    stack: ["ROS", "Embedded", "Automation"],
    accent: "blue",
  },
];

const certs = [
  { name: "Microsoft Engineer Program — AI Engineer", year: "2025–2026", accent: "teal" },
  { name: "Microsoft Certified: Power Platform Fundamentals (PL-900)", year: "Nov 2023", accent: "blue" },
  { name: "Microsoft Certified: Dynamics 365 Fundamentals CRM (MB-910)", year: "Oct 2023", accent: "blue" },
  { name: "Microsoft Certified: Security, Compliance & Identity (SC-900)", year: "Aug 2023", accent: "amber" },
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", year: "Jun 2023", accent: "teal" },
  { name: "Accenture Certified Full Stack Developer", year: "2022", accent: "amber" },
];

const marqueeSkills = [
  "Python", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "FastAPI",
  "RAG Pipelines", "Azure", "Docker", "Kubernetes", "React", "Next.js",
  "Apache Spark", "MongoDB", "TypeScript", "OpenAI API", "YOLO", "ROS",
];

const navLinks = [
  { href: "#overview",       label: "Overview" },
  { href: "#experience",     label: "Experience" },
  { href: "#projects",       label: "Projects" },
  { href: "#skills",         label: "Skills" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact",        label: "Contact" },
];

/* ─── Hooks ──────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); } }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        const isDecimal = target % 1 !== 0;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = eased * target;
          setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll(".skill-bar-fill");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("animated"); }),
      { threshold: 0.5 }
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

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => ring.classList.add("hovered");
    const onLeave = () => ring.classList.remove("hovered");

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left  = `${mx}px`;
      dot.style.top   = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,.card,.project-card,.stat-card,.cert-card,.focus-card")
      .forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
}

/* ─── Sub-components ─────────────────────────────────────── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div className="stat-card reveal">
      <div className="stat-value">
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeSkills, ...marqueeSkills];
  return (
    <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <div className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        {items.map((s, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: i % 3 === 0 ? "var(--teal)" : i % 3 === 1 ? "var(--text-3)" : "var(--text-2)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              padding: "0 0.5rem",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Home() {
  useReveal();
  useSkillBars();
  useCursor();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      {/* Progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[200]"
        css={{ background: "linear-gradient(90deg, var(--teal), var(--amber))" }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--teal), var(--amber))" }} />
      </motion.div>

      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">
          M<span>.</span>
        </span>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{ color: activeSection === l.href.slice(1) ? "var(--teal)" : undefined }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Resume.pdf"
            className="btn-secondary"
            style={{ padding: "8px 18px", fontSize: "0.75rem" }}
          >
            Resume ↗
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: "64px" }}>

        {/* ── Hero ────────────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5rem 2.5rem 4rem",
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Bg line grid */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
            opacity: 0.4,
          }} />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ marginBottom: "2.5rem" }}
            >
              <span className="avail-badge">
                <span className="avail-dot" />
                Available for roles — May 2026
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Building{" "}
              <span className="accent-teal">clean AI</span>
              <br />
              systems that{" "}
              <span className="accent-amber">actually</span>
              <br />
              ship.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                maxWidth: "560px",
                fontSize: "1.125rem",
                lineHeight: "1.7",
                color: "var(--text-2)",
                marginTop: "2rem",
                marginBottom: "2.5rem",
              }}
            >
              I design retrieval-first workflows, build lightweight LLM tools,
              and deliver full-stack AI products with an emphasis on clarity
              and maintainability.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
            >
              <a href="#projects" className="btn-primary">
                View work <span>→</span>
              </a>
              <a href="https://www.linkedin.com/in/muneeshp" target="_blank" rel="noreferrer" className="btn-secondary">
                LinkedIn ↗
              </a>
              <a href="mailto:puligundla.4@wright.edu" className="btn-secondary">
                puligundla.4@wright.edu
              </a>
            </motion.div>

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2.5rem" }}
            >
              {["AI / ML Engineer", "RAG Systems", "LLM Tooling", "Full-Stack Delivery", "Wright State MS CS"].map((t) => (
                <span key={t} className="tag tag-neutral">{t}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              position: "absolute", bottom: "2.5rem", right: "2.5rem",
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-mono)", fontSize: "0.6875rem",
              color: "var(--text-3)", letterSpacing: "0.08em",
            }}
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >↓</motion.span>
            SCROLL
          </motion.div>
        </section>

        {/* ── Stats ───────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
              {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
          </div>
        </div>

        {/* ── Marquee ──────────────────────────────────────── */}
        <div style={{ padding: "2.5rem 0", display: "flex", flexDirection: "column", gap: "1rem", overflow: "hidden" }}>
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>

        {/* ── Overview ─────────────────────────────────────── */}
        <section id="overview" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden="true">About</span>

          <div className="section-num reveal">01 — OVERVIEW</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem", maxWidth: "640px" }} className="reveal reveal-delay-1">
            Product-minded AI delivery
          </h2>
          <p style={{ maxWidth: "560px", marginBottom: "3.5rem", lineHeight: "1.8" }} className="reveal reveal-delay-2">
            Computer science graduate student at Wright State with 4+ years building ML systems.
            My focus is retrieval-first workflows, LLM tooling, and end-to-end products that feel
            reliable and trustworthy.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {focusAreas.map((area, i) => (
              <div key={area.title} className={`focus-card reveal reveal-delay-${i + 1}`}>
                <div style={{ fontSize: "1.25rem", color: "var(--teal)", marginBottom: "0.75rem" }}>{area.icon}</div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>{area.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.7" }}>{area.desc}</p>
              </div>
            ))}
          </div>

          {/* Stack snapshot */}
          <div
            className="reveal"
            style={{
              marginTop: "3rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-3)", letterSpacing: "0.08em" }}>
                STACK SNAPSHOT
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {stack.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: "1.25rem 1.75rem",
                    borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: i < stack.length - 2 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--teal)", width: "56px", flexShrink: 0, paddingTop: "2px" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)", lineHeight: "1.6" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Experience ───────────────────────────────────── */}
        <section id="experience" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden="true">Work</span>

          <div className="section-num reveal">02 — EXPERIENCE</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "4rem" }} className="reveal reveal-delay-1">
            Where I have delivered
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {experiences.map((exp, i) => (
              <div key={exp.role} className={`timeline-item reveal reveal-delay-${i + 1}`} style={{ paddingBottom: "3rem" }}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    padding: "1.75rem 2rem",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,217,196,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.0625rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>{exp.role}</h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-3)", marginTop: "2px" }}>{exp.org}</p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.6875rem",
                        padding: "5px 12px", borderRadius: "6px",
                        background: `rgba(${exp.color === "var(--teal)" ? "0,217,196" : exp.color === "var(--amber)" ? "255,140,66" : "96,144,255"},0.1)`,
                        color: exp.color, border: `1px solid ${exp.color}33`,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {exp.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-2)", lineHeight: "1.6" }}>
                        <span style={{ color: exp.color, flexShrink: 0, paddingTop: "2px" }}>›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Projects ─────────────────────────────────────── */}
        <section id="projects" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden="true">Work</span>

          <div className="section-num reveal">03 — PROJECTS</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "4rem" }} className="reveal reveal-delay-1">
            Featured builds
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {projects.map((p, i) => (
              <div
                key={p.title}
                className={`project-card glow-card reveal reveal-delay-${(i % 4) + 1}`}
                style={{ gridColumn: p.featured ? "span 2" : undefined }}
              >
                {p.featured && (
                  <div style={{ marginBottom: "0.75rem" }}>
                    <span className="tag tag-amber">◆ IEEE Published</span>
                  </div>
                )}
                <h3 style={{
                  fontSize: p.featured ? "1.25rem" : "1rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  marginBottom: "0.625rem",
                  color: "var(--text)",
                }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.7", marginBottom: "1.25rem" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.stack.map((s) => (
                    <span key={s} className={`tag tag-${p.accent}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Skills ───────────────────────────────────────── */}
        <section id="skills" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden="true">Stack</span>

          <div className="section-num reveal">04 — SKILLS</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "4rem" }} className="reveal reveal-delay-1">
            Core competencies
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {/* Skill bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="reveal">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-2)" }}>{s.name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--teal)" }}>{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${s.pct}%`, transitionDelay: `${i * 0.1}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skill groups */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="reveal reveal-delay-2">
              {[
                { label: "Languages", items: ["Python", "TypeScript", "Java", "C/C++", "SQL"] },
                { label: "AI / ML", items: ["PyTorch", "TensorFlow", "LangChain", "LlamaIndex"] },
                { label: "Backend", items: ["FastAPI", "Flask", "Spring Boot", "Node.js"] },
                { label: "Cloud & Ops", items: ["Azure", "Docker", "Kubernetes", "CI/CD"] },
              ].map((group) => (
                <div
                  key={group.label}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--teal)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                    {group.label}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {group.items.map((item) => (
                      <span key={item} style={{ fontSize: "0.8125rem", color: "var(--text-2)" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Certifications ───────────────────────────────── */}
        <section id="certifications" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden="true">Certs</span>

          <div className="section-num reveal">05 — CERTIFICATIONS</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "4rem" }} className="reveal reveal-delay-1">
            Credentials
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "0.875rem" }}>
            {certs.map((c, i) => (
              <div key={c.name} className={`cert-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="cert-dot" style={{
                  background: c.accent === "teal" ? "var(--teal)" : c.accent === "amber" ? "var(--amber)" : "var(--blue)",
                  boxShadow: `0 0 10px ${c.accent === "teal" ? "rgba(0,217,196,0.5)" : c.accent === "amber" ? "rgba(255,140,66,0.5)" : "rgba(96,144,255,0.5)"}`,
                }} />
                <div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: "1.5" }}>{c.name}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-3)", marginTop: "4px" }}>{c.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* ── Contact ──────────────────────────────────────── */}
        <section id="contact" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2.5rem 8rem", position: "relative" }}>
          <span className="section-bg-text" aria-hidden="true">Hello</span>

          <div className="section-num reveal">06 — CONTACT</div>
          <h2
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", marginBottom: "1rem", maxWidth: "700px" }}
            className="reveal reveal-delay-1"
          >
            Let's build something{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--teal), var(--blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>useful</span>.
          </h2>
          <p style={{ maxWidth: "480px", marginBottom: "3.5rem", lineHeight: "1.8" }} className="reveal reveal-delay-2">
            Open to full-time roles in AI/ML engineering and software engineering.
            I respond quickly and love building clear, impactful tools.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }} className="reveal reveal-delay-3">
            {/* Email */}
            <a
              href="mailto:puligundla.4@wright.edu"
              style={{
                display: "flex", flexDirection: "column", gap: "0.5rem",
                padding: "1.75rem", borderRadius: "14px",
                background: "var(--surface)", border: "1px solid var(--border)",
                transition: "border-color 0.3s, transform 0.3s var(--ease-out-expo), background 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,217,196,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--teal)", letterSpacing: "0.08em" }}>EMAIL</span>
              <span style={{ fontSize: "0.9375rem", color: "var(--text)" }}>puligundla.4@wright.edu</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+19372190695"
              style={{
                display: "flex", flexDirection: "column", gap: "0.5rem",
                padding: "1.75rem", borderRadius: "14px",
                background: "var(--surface)", border: "1px solid var(--border)",
                transition: "border-color 0.3s, transform 0.3s var(--ease-out-expo), background 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--amber)", letterSpacing: "0.08em" }}>PHONE</span>
              <span style={{ fontSize: "0.9375rem", color: "var(--text)" }}>+1 (937) 219-0695</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/muneeshp"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", flexDirection: "column", gap: "0.5rem",
                padding: "1.75rem", borderRadius: "14px",
                background: "var(--surface)", border: "1px solid var(--border)",
                transition: "border-color 0.3s, transform 0.3s var(--ease-out-expo), background 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(96,144,255,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--blue)", letterSpacing: "0.08em" }}>LINKEDIN</span>
              <span style={{ fontSize: "0.9375rem", color: "var(--text)" }}>linkedin.com/in/muneeshp</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/muneesh06"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", flexDirection: "column", gap: "0.5rem",
                padding: "1.75rem", borderRadius: "14px",
                background: "var(--surface)", border: "1px solid var(--border)",
                transition: "border-color 0.3s, transform 0.3s var(--ease-out-expo), background 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,217,196,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--teal)", letterSpacing: "0.08em" }}>GITHUB</span>
              <span style={{ fontSize: "0.9375rem", color: "var(--text)" }}>github.com/muneesh06</span>
            </a>
          </div>

          {/* CTA button */}
          <div style={{ marginTop: "3rem" }} className="reveal reveal-delay-4">
            <a
              href="https://www.linkedin.com/in/muneeshp"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "14px 36px" }}
            >
              Message on LinkedIn →
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>
          Muneesh<span style={{ color: "var(--teal)" }}>.</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-3)", letterSpacing: "0.06em" }}>
          AI / ML ENGINEER — WRIGHT STATE — {new Date().getFullYear()}
        </span>
        <a href="/Resume.pdf" className="btn-secondary" style={{ padding: "8px 18px", fontSize: "0.75rem" }}>
          Download Resume ↗
        </a>
      </footer>
    </>
  );
}