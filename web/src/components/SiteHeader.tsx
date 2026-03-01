"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2x2, Grid3x3, List, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/", label: "Carnet" },
] as const;

const EXTERNAL_LINKS = [
  { href: "https://studio.gcanva.art", label: "Studio" },
  { href: "https://gcanva.art", label: "Hub" },
] as const;

type ViewMode = "timeline" | "masonry";

interface SiteHeaderProps {
  siteTitle?: string;
  subtitle?: string;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  showViewModeControls?: boolean;
}

export default function SiteHeader({
  siteTitle = "gcanva.art",
  subtitle = "Un flux vivant d'idées et d'explorations créatives",
  viewMode = "masonry",
  onViewModeChange,
  showViewModeControls = true,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [blueprintEnabled, setBlueprintEnabled] = useState(true);
  const controlsInteractive = showViewModeControls && Boolean(onViewModeChange);
  const effectiveCompact = isCompact;

  useEffect(() => {
    const COMPACT_ENTER_THRESHOLD = 56;
    const COMPACT_EXIT_THRESHOLD = 2;

    const updateCompactState = () => {
      setIsCompact((prev) => {
        const scrollY = window.scrollY;

        if (scrollY > COMPACT_ENTER_THRESHOLD) {
          return true;
        }

        if (scrollY <= COMPACT_EXIT_THRESHOLD) {
          return false;
        }

        return prev;
      });
    };

    const updateMobilePortrait = () => {
      setIsMobilePortrait(window.innerWidth < 768 && window.matchMedia("(orientation: portrait)").matches);
    };

    updateCompactState();
    updateMobilePortrait();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    window.addEventListener("resize", updateMobilePortrait);
    window.addEventListener("orientationchange", updateMobilePortrait);

    return () => {
      window.removeEventListener("scroll", updateCompactState);
      window.removeEventListener("resize", updateMobilePortrait);
      window.removeEventListener("orientationchange", updateMobilePortrait);
    };
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    const storageValue = window.localStorage.getItem("gcanva-blueprint");
    const enabled = storageValue !== "off";

    setBlueprintEnabled(enabled);
    document.documentElement.setAttribute("data-blueprint", enabled ? "on" : "off");
  }, []);

  const toggleBlueprint = () => {
    const nextValue = !blueprintEnabled;

    setBlueprintEnabled(nextValue);
    window.localStorage.setItem("gcanva-blueprint", nextValue ? "on" : "off");
    document.documentElement.setAttribute("data-blueprint", nextValue ? "on" : "off");
  };

  return (
    <header className="header-surface fixed inset-x-0 top-0 z-40 border-b border-border/65">
      <div
        className={`mx-auto flex max-w-7xl px-6 transition-[padding] duration-200 ${
          effectiveCompact
            ? "min-h-[56px] flex-col gap-0 py-2 md:min-h-0 md:flex-row md:items-center md:justify-between"
            : "flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between"
        }`}
      >
        <div className={`relative z-20 flex w-full flex-col md:w-auto ${effectiveCompact ? "gap-0" : "gap-2"}`}>
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              tabIndex={effectiveCompact ? -1 : undefined}
              className={`w-fit text-3xl font-semibold tracking-tight text-foreground font-serif ${
                effectiveCompact
                  ? "pointer-events-none absolute -left-[999em] -top-[999em] h-px w-px overflow-hidden whitespace-nowrap"
                  : ""
              }`}
            >
              {siteTitle}
            </Link>
          </div>
          <p
            className={`text-sm text-muted-foreground ${
              effectiveCompact
                ? "pointer-events-none absolute -left-[999em] -top-[999em] h-px w-px overflow-hidden whitespace-nowrap"
                : "mt-1"
            }`}
          >
            {subtitle}
          </p>
          <p
            className={`text-xs text-muted-foreground/80 ${
              effectiveCompact
                ? "pointer-events-none absolute -left-[999em] -top-[999em] h-px w-px overflow-hidden whitespace-nowrap"
                : "mt-1"
            }`}
          >
            {controlsInteractive ? (viewMode === "masonry" ? "Vue mosaïque" : "Vue linéaire") : "Vue éditoriale"}
          </p>
          <nav
            aria-label="Navigation principale"
            className={`hidden flex-wrap items-center gap-2 md:flex ${effectiveCompact ? "mt-0" : "mt-1"}`}
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
            {EXTERNAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="site-nav-link text-xs font-medium tracking-wide text-muted-foreground hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex w-full flex-nowrap items-center justify-end gap-3 md:w-auto md:justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={blueprintEnabled ? "Désactiver le blueprint" : "Activer le blueprint"}
            title={blueprintEnabled ? "Blueprint actif" : "Blueprint inactif"}
            onClick={toggleBlueprint}
            className={`h-10 w-10 min-h-[2.75rem] min-w-[2.75rem] p-0 md:h-9 md:w-9 md:min-h-0 md:min-w-0 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${blueprintEnabled ? "text-primary" : "text-muted-foreground"}`}
          >
            <Grid2x2 className="h-4 w-4" />
          </Button>
          <ThemeSwitcher compact={effectiveCompact} />
          {!isMobilePortrait && (
            <div className="flex items-center rounded-lg border border-border/70 bg-card/80 p-0.5 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                disabled={!controlsInteractive}
                onClick={() => onViewModeChange?.("masonry")}
                className={`gap-1 px-1.5 py-1 transition-all duration-200 ${
                  viewMode === "masonry"
                    ? "border border-primary/35 bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted"
                } ${!controlsInteractive ? "cursor-not-allowed opacity-50" : "active:scale-[0.98]"}`}
              >
                <Grid3x3 className="h-3.5 w-3.5" />
                <span className={effectiveCompact ? "sr-only" : "hidden sm:inline"}>Grille</span>
              </Button>

              <span
                aria-hidden="true"
                className="mx-1 h-4 w-px bg-gradient-to-b from-transparent via-border/55 to-transparent"
              />

              <Button
                variant="ghost"
                size="sm"
                disabled={!controlsInteractive}
                onClick={() => onViewModeChange?.("timeline")}
                className={`gap-1 px-1.5 py-1 transition-all duration-200 ${
                  viewMode === "timeline"
                    ? "border border-primary/35 bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted"
                } ${!controlsInteractive ? "cursor-not-allowed opacity-50" : "active:scale-[0.98]"}`}
              >
                <List className="h-3.5 w-3.5" />
                <span className={effectiveCompact ? "sr-only" : "hidden sm:inline"}>Timeline</span>
              </Button>
            </div>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={mobileNavOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="h-10 w-10 min-h-[2.75rem] min-w-[2.75rem] p-0 rounded-lg md:h-8 md:w-8 md:min-h-0 md:min-w-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav
          aria-label="Navigation mobile"
          className="border-t border-border/60 px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-0.5">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`site-nav-link w-full min-h-[2.75rem] justify-start text-left text-sm font-medium rounded-lg ${
                    isActive ? "is-active text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {EXTERNAL_LINKS.map((item) => (
              <a
                key={`mobile-${item.href}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileNavOpen(false)}
                className="site-nav-link w-full min-h-[2.75rem] justify-start text-left text-sm font-medium rounded-lg text-muted-foreground hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
