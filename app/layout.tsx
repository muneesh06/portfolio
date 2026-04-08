import "./globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Muneesh | AI / ML Engineer",
  description:
    "Portfolio of Muneesh - AI/ML engineer focused on RAG systems, LLM tooling, and clean full stack delivery.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "LLM",
    "Full Stack Developer",
    "Next.js Portfolio",
    "FastAPI",
  ],
  authors: [{ name: "Muneesh" }],
  openGraph: {
    title: "Muneesh | AI / ML Engineer",
    description:
      "Building clean, useful AI systems with a focus on retrieval and planning.",
    url: "https://github.com/muneesh06",
    siteName: "Muneesh Portfolio",
    images: [
      {
        url: "/ai-profile.png",
        width: 1200,
        height: 630,
        alt: "Muneesh AI Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muneesh | AI / ML Engineer",
    description:
      "Building clean, useful AI systems with a focus on retrieval and planning.",
    images: ["/ai-profile.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
