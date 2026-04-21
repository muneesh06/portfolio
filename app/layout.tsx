import "./globals.css";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Muneesh | AI / ML Engineer",
  description: "Portfolio of Sai Muneesh Puligundla — AI/ML engineer focused on RAG systems, LLM tooling, and clean full-stack delivery.",
  keywords: ["AI Engineer", "Machine Learning", "RAG", "LLM", "Full Stack Developer", "Next.js", "FastAPI", "PyTorch"],
  authors: [{ name: "Sai Muneesh Puligundla" }],
  openGraph: {
    title: "Muneesh | AI / ML Engineer",
    description: "Building clean, useful AI systems with a focus on retrieval and planning.",
    url: "https://portfolio-mu-two-5xehgfsuzz.vercel.app/",
    siteName: "Muneesh Portfolio",
    images: [{ url: "/ai-profile.png", width: 1200, height: 630, alt: "Muneesh AI Portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muneesh | AI / ML Engineer",
    description: "Building clean, useful AI systems with a focus on retrieval and planning.",
    images: ["/ai-profile.png"],
  },
  icons: { icon: "/favicon.ico" },
};

// This script runs BEFORE React hydrates — prevents theme flash on load
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme') || 'auto';
    var resolved = saved;
    if (saved === 'auto') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-pref', saved);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* Blocking script — must run before any paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}