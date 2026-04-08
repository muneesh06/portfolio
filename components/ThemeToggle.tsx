"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

const storageKey = "theme";

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark" || stored === "auto") return stored;
  return "auto";
};

const applyTheme = (theme: Theme) => {
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
    window.localStorage.setItem(storageKey, theme);
    return;
  }
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(storageKey, theme);
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("auto");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  const toggle = () => {
    const next = theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
      aria-label="Toggle light or dark mode"
    >
      {theme === "auto" ? "Theme: Auto" : theme === "dark" ? "Theme: Dark" : "Theme: Light"}
    </button>
  );
}
