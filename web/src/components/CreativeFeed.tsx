"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import FeedItem, { type FeedItemProps } from "@/components/FeedItem";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const NAV_LINKS = [
  { href: "/manifeste", label: "Manifeste" },
  { href: "/experimentation-digitale", label: "Expérimentation Digitale" },
  { href: "/contact", label: "Contact" },
];

export interface CreativeFeedItem extends FeedItemProps {
  id: string;
  timestamp?: Date;
}

interface CreativeFeedProps {
  items?: CreativeFeedItem[];
  headerTitle?: string;
  headerSubtitle?: string;
}

type ViewMode = "timeline" | "masonry";

export default function CreativeFeed({
  items = [],
  headerTitle = "Creative Feed",
  headerSubtitle = "Un flux vivant d'idées et d'explorations créatives",
}: CreativeFeedProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Header avec Toggle */}
      <div className="header-surface sticky top-0 z-40 border-b border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{headerTitle}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{headerSubtitle}</p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              {viewMode === "timeline" ? "Vue linéaire" : "Vue mosaïque"}
            </p>
            <nav
              aria-label="Navigation principale"
              className="mt-1 flex flex-wrap items-center gap-4"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium tracking-wide text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Toggle Button Group */}
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <ThemeSwitcher />
            <div className="flex items-center rounded-lg border border-stone-200 bg-card p-1 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("timeline")}
                className={`gap-2 transition-all duration-200 active:scale-[0.98] ${
                  viewMode === "timeline"
                    ? "border border-primary/35 bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Timeline</span>
              </Button>

              <span
                aria-hidden="true"
                className="mx-1 h-4 w-px bg-gradient-to-b from-transparent via-border/55 to-transparent"
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("masonry")}
                className={`gap-2 transition-all duration-200 active:scale-[0.98] ${
                  viewMode === "masonry"
                    ? "border border-primary/35 bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="hidden sm:inline">Grille</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE VIEW */}
      {viewMode === "timeline" && (
        <div className="mx-auto max-w-2xl px-6 py-12">
          <div className="relative space-y-16">
            {items.length === 0 ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className="text-muted-foreground text-lg">
                    No items yet...
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    The timeline awaits your creations
                  </p>
                </div>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-up-delay-1"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <FeedItem type={item.type} data={item.data} />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MASONRY VIEW */}
      {viewMode === "masonry" && (
        <div className="mx-auto max-w-7xl px-6 py-12">
          {items.length === 0 ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <p className="text-muted-foreground text-lg">
                  No items yet...
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  The garden awaits your creations
                </p>
              </div>
            </div>
          ) : (
            <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="mb-6 break-inside-avoid animate-fade-up"
                  style={{
                    animationDelay: `${(index % 3) * 0.1}s`,
                  }}
                >
                  <FeedItem type={item.type} data={item.data} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
