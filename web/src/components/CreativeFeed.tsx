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
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
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

      {availableTags.length > 0 && (
        <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-2 px-6 pt-4">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
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
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
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
        <div className="mx-auto max-w-2xl px-6 py-12">
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
        <div className="mx-auto max-w-7xl px-6 py-12">
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
            <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
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
