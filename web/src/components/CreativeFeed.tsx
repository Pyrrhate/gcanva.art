"use client";

import { useMemo, useState } from "react";
import FeedItem, { type FeedItemProps } from "@/components/FeedItem";
import SiteHeader from "@/components/SiteHeader";

export interface CreativeFeedItem extends FeedItemProps {
  id: string;
  timestamp?: Date;
}

interface CreativeFeedProps {
  items?: CreativeFeedItem[];
  siteTitle?: string;
  headerSubtitle?: string;
}

type ViewMode = "timeline" | "masonry";

export default function CreativeFeed({
  items = [],
  siteTitle = "gcanva.art",
  headerSubtitle = "Un flux vivant d'idées et d'explorations créatives",
}: CreativeFeedProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [activeTag, setActiveTag] = useState<string>("all");

  const availableTags = useMemo(() => {
    const tags = new Set<string>();

    for (const item of items) {
      if (item.type !== "text") continue;
      const textData = item.data as FeedItemProps["data"] & { tags?: string[] };
      for (const tag of textData.tags || []) {
        if (tag) tags.add(tag);
      }
    }

    return Array.from(tags);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeTag === "all") return items;

    return items.filter((item) => {
      if (item.type !== "text") return true;
      const textData = item.data as FeedItemProps["data"] & { tags?: string[] };
      return (textData.tags || []).includes(activeTag);
    });
  }, [activeTag, items]);

  return (
    <div className="home-page-wrapper w-full min-h-screen bg-background text-foreground">
      <SiteHeader
        siteTitle={siteTitle}
        subtitle={headerSubtitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showViewModeControls
      />

      <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 md:pt-10">
        <div className="article-page-wrapper rounded-2xl border border-border/45 px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground/80">Underground Alchemist</p>
          <h1 className="mt-3 text-balance font-serif text-3xl font-medium leading-[1.14] tracking-[-0.01em] text-foreground md:text-5xl">
            Carnet : Alchimie digitale
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Laboratoire en chantier permanent où matière visuelle, code et intuition se contaminent pour produire des formes vivantes.
          </p>
        </div>
      </section>

      {availableTags.length > 0 && (
        <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-3 px-4 pt-6 sm:px-6 sm:pt-8">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`min-h-[2.5rem] rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              activeTag === "all"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            Tous
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`min-h-[2.5rem] rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeTag === tag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* TIMELINE VIEW */}
      {viewMode === "timeline" && (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="relative space-y-16">
            {filteredItems.length === 0 ? (
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
              filteredItems.map((item, index) => (
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
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          {filteredItems.length === 0 ? (
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
            <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 [column-gap:1.5rem]">
              {filteredItems.map((item, index) => (
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
