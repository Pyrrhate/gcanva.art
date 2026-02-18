"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import FeedItem, { type FeedItemProps } from "@/components/FeedItem";

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
      <div className="sticky top-0 z-40 border-b border-stone-200 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight text-[#2C3E50]">{headerTitle}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{headerSubtitle}</p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              {viewMode === "timeline" ? "Vue linéaire" : "Vue mosaïque"}
            </p>
          </div>

          {/* Toggle Button Group */}
          <div className="flex gap-2 rounded-lg border border-stone-200 bg-card p-1 shadow-sm">
            <Button
              variant={viewMode === "timeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("timeline")}
              className="gap-2 transition-all duration-200"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </Button>

            <Button
              variant={viewMode === "masonry" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("masonry")}
              className="gap-2 transition-all duration-200"
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Masonry</span>
            </Button>
          </div>
        </div>
      </div>

      {/* TIMELINE VIEW */}
      {viewMode === "timeline" && (
        <div className="mx-auto max-w-2xl px-6 py-12">
          {/* Ligne centrale ondulante */}
          <div className="absolute left-1/2 top-24 bottom-0 w-1 -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-20 animate-pulse"></div>
          </div>

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
                  className="flex gap-8 items-start animate-fade-up-delay-1"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/50 animate-glow-pulse"></div>
                    {index < items.length - 1 && (
                      <div className="w-1 h-12 bg-gradient-to-b from-primary/40 to-transparent mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="glass-morphism rounded-2xl border border-stone-200 bg-card p-8 shadow-sm">
                      <FeedItem type={item.type} data={item.data} />
                    </div>
                  </div>
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
                  <div className="glass-morphism h-full rounded-2xl border border-stone-200 bg-card p-6 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                    <FeedItem type={item.type} data={item.data} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
