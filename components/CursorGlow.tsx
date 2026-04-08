"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-30 hidden md:block h-[320px] w-[320px] rounded-full blur-[90px] opacity-70"
      style={{
        background: "radial-gradient(circle, rgba(15,118,110,0.35), transparent 70%)",
        transform: `translate3d(${position.x - 160}px, ${position.y - 160}px, 0)`,
        transition: "transform 0.08s ease-out",
      }}
    />
  );
}
