"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const THEMES = [
  { value: "paper", label: "Papier" },
  { value: "vectrex", label: "Vectrex" },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-[160px] rounded-lg border border-border/70 bg-card/70" aria-hidden="true" />;
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-border/70 bg-card/80 p-1 shadow-sm">
      {THEMES.map((item, index) => {
        const isActive = theme === item.value;
        return (
          <div
            key={item.value}
            className="flex items-center"
          >
            <button
              type="button"
              onClick={() => setTheme(item.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors active:scale-[0.98] ${
                isActive
                  ? "border border-primary/35 bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted active:bg-primary/15"
              }`}
            >
              {item.label}
            </button>
            {index < THEMES.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-1 h-4 w-px bg-gradient-to-b from-transparent via-border/55 to-transparent"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
