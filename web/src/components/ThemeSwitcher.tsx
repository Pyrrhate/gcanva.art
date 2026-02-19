"use client";

import { useEffect, useState } from "react";
import { Cpu, Leaf } from "lucide-react";
import { useTheme } from "next-themes";

const THEMES = [
  { value: "paper", label: "Papier", icon: Leaf },
  { value: "vectrex", label: "Console", icon: Cpu },
] as const;

interface ThemeSwitcherProps {
  compact?: boolean;
}

export default function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-8 rounded-lg border border-border/70 bg-card/70 ${compact ? "w-[74px]" : "w-[160px]"}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`inline-flex items-center rounded-lg border border-border/70 bg-card/80 shadow-sm ${compact ? "p-0.5" : "p-1"}`}>
      {THEMES.map((item, index) => {
        const isActive = theme === item.value;
        const Icon = item.icon;
        return (
          <div
            key={item.value}
            className="flex items-center"
          >
            <button
              type="button"
              onClick={() => setTheme(item.value)}
              aria-label={item.label}
              title={item.label}
              className={`rounded-md text-xs font-medium transition-colors active:scale-[0.98] ${
                compact ? "px-1.5 py-1" : "px-3 py-1.5"
              } ${
                isActive
                  ? "border border-primary/35 bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted active:bg-primary/15"
              }`}
            >
              {compact ? <Icon className="h-3 w-3" /> : item.label}
            </button>
            {index < THEMES.length - 1 && (
              <span
                aria-hidden="true"
                className={`${compact ? "mx-0.5 h-3" : "mx-1 h-4"} w-px bg-gradient-to-b from-transparent via-border/55 to-transparent`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
