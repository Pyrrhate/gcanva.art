"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/", label: "Carnet" },
  { href: "/manifeste", label: "Manifeste" },
  { href: "/experimentation-digitale", label: "Expérimentation Digitale" },
  { href: "/contact", label: "Contact" },
] as const;

type ViewMode = "timeline" | "masonry";

interface SiteHeaderProps {
  subtitle?: string;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  showViewModeControls?: boolean;
}

export default function SiteHeader({
  subtitle = "Un flux vivant d'idées et d'explorations créatives",
  viewMode = "timeline",
  onViewModeChange,
  showViewModeControls = true,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const controlsInteractive = showViewModeControls && Boolean(onViewModeChange);

  return (
    <header className="header-surface sticky top-0 z-40 border-b border-border/65">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="w-fit text-3xl font-semibold tracking-tight text-foreground [font-family:ui-serif,Georgia,Cambria,Times_New_Roman,Times,serif]"
          >
            gcanva.art
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            {controlsInteractive ? (viewMode === "timeline" ? "Vue linéaire" : "Vue mosaïque") : "Vue éditoriale"}
          </p>
          <nav
            aria-label="Navigation principale"
            className="mt-1 flex flex-wrap items-center gap-4"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link text-xs font-medium tracking-wide ${
                    isActive ? "is-active text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <ThemeSwitcher />
          <div className="flex items-center rounded-lg border border-border/70 bg-card/80 p-1 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              disabled={!controlsInteractive}
              onClick={() => onViewModeChange?.("timeline")}
              className={`gap-2 transition-all duration-200 ${
                viewMode === "timeline"
                  ? "border border-primary/35 bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-muted-foreground hover:bg-muted"
              } ${!controlsInteractive ? "cursor-not-allowed opacity-50" : "active:scale-[0.98]"}`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </Button>

            <span
              aria-hidden="true"
              className="mx-1 h-4 w-px bg-gradient-to-b from-transparent via-border/55 to-transparent"
            />

            <Button
              variant="ghost"
              size="sm"
              disabled={!controlsInteractive}
              onClick={() => onViewModeChange?.("masonry")}
              className={`gap-2 transition-all duration-200 ${
                viewMode === "masonry"
                  ? "border border-primary/35 bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-muted-foreground hover:bg-muted"
              } ${!controlsInteractive ? "cursor-not-allowed opacity-50" : "active:scale-[0.98]"}`}
            >
              <Grid3x3 className="h-4 w-4" />
              <span className="hidden sm:inline">Grille</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
