"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import FeedItem, { FeedItemProps } from "@/components/FeedItem";

export interface CreativeFeedItem extends FeedItemProps {
  id: string;
  timestamp?: Date;
}

interface CreativeFeedProps {
  items?: CreativeFeedItem[];
}

type ViewMode = "timeline" | "masonry";

export default function CreativeFeed({ items = [] }: CreativeFeedProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header avec Toggle */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">Creative Feed</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {viewMode === "timeline"
                ? "Chronological flow, centered meditation"
                : "Asymmetric masonry, spatial exploration"}
            </p>
          </div>

          {/* Toggle Button Group */}
          <div className="flex gap-2 bg-card rounded-lg p-1 border border-border">
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
        <div className="max-w-2xl mx-auto px-6 py-12">
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
                    <div className="bg-card rounded-2xl p-8 border border-border glass-morphism">
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
        <div className="max-w-7xl mx-auto px-6 py-12">
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
            <div className="masonry-grid">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="masonry-item animate-fade-up"
                  style={{
                    animationDelay: `${(index % 3) * 0.1}s`,
                  }}
                >
                  <div className="bg-card rounded-2xl p-6 border border-border glass-morphism h-full hover:scale-105 transition-transform duration-300">
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
