"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import CursorGlow from "@/components/CursorGlow";
import ThemeToggle from "@/components/ThemeToggle";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true, margin: "-120px" },
};

const Section = ({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) => (
  <motion.section id={id} {...fadeUp} className="max-w-6xl mx-auto px-6 py-16">
    <div className="relative overflow-hidden rounded-3xl card-surface card-shine p-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[var(--text)]">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  </motion.section>
);

const metrics = [
  { value: "4+ years", label: "ML engineering experience" },
  { value: "RAG + LLM", label: "retrieval-first systems" },
  { value: "FastAPI + Next", label: "full stack delivery" },
];

const focusAreas = [
  {
    title: "RAG workflows",
    desc: "Retrieval-first pipelines that stay fast, clean, and explainable.",
  },
  {
    title: "LLM tooling",
    desc: "Lightweight planning and evaluation tools that teams actually use.",
  },
  {
    title: "API-first delivery",
    desc: "Fast APIs, reliable deployments, and clear documentation.",
  },
  {
    title: "Product clarity",
    desc: "Ship systems that feel calm, reliable, and easy to maintain.",
  },
];

const deliverySnapshot = [
  { label: "Default stack", value: "Python, FastAPI, TypeScript" },
  { label: "Cloud", value: "Azure, Docker, Kubernetes" },
  { label: "Data", value: "MySQL, MongoDB, Spark" },
  { label: "Testing", value: "PyTest, Playwright, CI/CD" },
];

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
];

const experiences = [
  {
    role: "Software Engineer",
    org: "Accenture",
    period: "2022-2023",
    detail:
      "Built scalable ML services, optimized data workflows, and shipped cloud-ready APIs.",
    highlights: [
      "Owned core backend services for data and model orchestration.",
      "Optimized pipelines for reliability, stability, and faster iterations.",
      "Implemented CI/CD practices with containerized deployments.",
      "Partnered with cross-functional teams to deliver reliable releases.",
      "Improved observability with clearer logging and metrics.",
    ],
  },
  {
    role: "Research Assistant",
    org: "University Lab",
    period: "2019-2022",
    detail:
      "Developed ML models for healthcare and robotics with a focus on real-time inference.",
    highlights: [
      "Trained and evaluated predictive models with clean experiment tracking.",
      "Built lightweight prototypes to validate new ideas quickly.",
      "Designed feature pipelines and model evaluation workflows.",
      "Documented findings for easy handoff and reuse.",
      "Shared results with peers and stakeholders for feedback.",
    ],
  },
  {
    role: "IEEE Executive Committee (Execom) Member",
    org: "IEEE Student Branch",
    period: "2019-2021",
    detail:
      "Organized technical events, workshops, and student engagement initiatives.",
    highlights: [
      "Mentored junior students on robotics, embedded programming, and applied AI.",
    ],
  },
];

export default function Home() {
  return (
    <div className="relative">
      <CursorGlow />

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[rgba(15,118,110,0.12)] blur-[120px] float-slow" />
        <div className="absolute right-[-10%] top-[-5%] h-[450px] w-[450px] rounded-full bg-[rgba(249,115,22,0.14)] blur-[120px] float-fast" />
        <div className="absolute bottom-[-10%] left-[25%] h-[520px] w-[520px] rounded-full bg-[rgba(37,99,235,0.12)] blur-[140px] float-slow" />
      </div>

      <nav className="fixed top-0 z-50 w-full border-b border-[color:var(--border)] bg-[color:var(--card)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-semibold tracking-tight text-[var(--text)]">
            Muneesh
          </span>
          <div className="flex items-center gap-6">
            <div className="hidden gap-8 text-sm text-[var(--muted)] md:flex">
              <a href="#overview">Overview</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-28">
        <section className="mx-auto flex min-h-[85vh] max-w-6xl flex-col gap-12 px-6 pb-20 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="flex flex-wrap gap-3">
              <span className="pill">AI / ML Engineer</span>
              <span className="pill">RAG Systems</span>
              <span className="pill">LLM Planning</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold text-[var(--text)] md:text-6xl">
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] animate-gradient">
                clean AI systems
              </span>{" "}
              that feel useful, calm, and fast.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              I design retrieval-first workflows, ship lightweight LLM tools, and
              build full stack AI products with an emphasis on clarity.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              My strength is taking complex ML ideas and turning them into clean,
              shippable systems that are easy to explain and easy to maintain.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:translate-y-[-2px]"
              >
                View Work
              </a>
              <a
                href="/Resume.pdf"
                className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                Resume
              </a>
              <a
                href="https://www.linkedin.com/in/muneeshp"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1 grid gap-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-xl card-shine">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
                  About Me
                </p>
                <div className="mt-6 grid gap-4">
                  {metrics.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-4 card-shine"
                    >
                      <p className="text-lg font-semibold text-[var(--text)]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-xl card-shine">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/40 spin-slow" />
              <div className="pointer-events-none absolute left-8 top-10 h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_20px_rgba(15,118,110,0.6)] float-fast" />
              <div className="pointer-events-none absolute bottom-10 right-12 h-2.5 w-2.5 rounded-full bg-[var(--accent-2)] shadow-[0_0_20px_rgba(249,115,22,0.6)] float-slow" />
              <div className="relative">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[rgba(15,118,110,0.2)] blur-2xl" />
                    <Image
                      src="/ai-profile.png"
                      alt="Profile"
                      width={120}
                      height={120}
                      className="relative rounded-full border border-white/60 shadow-lg"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
                      Based in the US
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">
                      Muneesh
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      AI systems, retrieval, and practical ML.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 card-shine">
                  <p className="text-sm font-semibold text-[var(--text)]">
                    Now building
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                    <li>RAG utilities for doc-heavy workflows</li>
                    <li>LLM planning tools with clean UX</li>
                    <li>Full stack AI delivery with reliable APIs</li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="chip">RAG</span>
                    <span className="chip">Planning</span>
                    <span className="chip">FastAPI</span>
                    <span className="chip">Azure</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <Section id="overview" eyebrow="Overview" title="Product-minded AI delivery">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                I am a computer science graduate student with 4+ years of
                experience building ML systems. My focus is on retrieval-first
                workflows, LLM tooling, and end to end products that feel
                reliable and clean.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                I care about crisp architecture, thoughtful metrics, and
                shipping tools that teams can actually trust and reuse.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {focusAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 card-shine"
                  >
                    <h3 className="text-base font-semibold text-[var(--text)]">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 card-shine">
              <p className="text-sm font-semibold text-[var(--text)]">
                Delivery snapshot
              </p>
              <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                {deliverySnapshot.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4"
                  >
                    <span>{item.label}</span>
                    <span className="font-semibold text-[var(--text)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="experience"
          eyebrow="Experience"
          title="Where I have delivered"
        >
          <div className="space-y-6">
            {experiences.map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 card-shine"
              >
                <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                  <div>
                    <span className="pill">{item.period}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {item.role}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">{item.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {item.detail}
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Featured builds">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 card-shine transition hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-[var(--text)]">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {project.desc}
                  </p>
                  {project.highlights ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                      {project.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="Core stack and toolset">
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 card-shine"
              >
                <h3 className="text-base font-semibold text-[var(--text)]">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="certifications"
          eyebrow="Certifications"
          title="Credentials and programs"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 card-shine"
              >
                <p className="text-sm text-[var(--text)]">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Lets build something useful">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 card-shine">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                If you want to collaborate on AI or ML projects, reach out here.
                I respond quickly and love building clear, useful tools.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://github.com/muneesh06"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--border)] px-5 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/muneeshp"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--border)] px-5 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 card-shine">
              <p className="text-sm font-semibold text-[var(--text)]">
                Direct contact
              </p>
              <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                <p>
                  Email:{" "}
                  <a
                    className="text-[var(--accent)]"
                    href="mailto:muneesh.puligundla@gmail.com"
                  >
                    muneesh.puligundla@gmail.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a className="text-[var(--accent)]" href="tel:+19372190695">
                    +1 (937) 219-0695
                  </a>
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/muneeshp"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[var(--accent-2)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1"
                >
                  Message on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-10 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Muneesh. Built with care.
      </footer>
    </div>
  );
}
