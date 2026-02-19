"use client";

import { useState } from "react";
import FeedItem, { type FeedItemProps } from "@/components/FeedItem";
import SiteHeader from "@/components/SiteHeader";

export interface CreativeFeedItem extends FeedItemProps {
  id: string;
  timestamp?: Date;
}

interface CreativeFeedProps {
  items?: CreativeFeedItem[];
  headerSubtitle?: string;
}

type ViewMode = "timeline" | "masonry";

export default function CreativeFeed({
  items = [],
  headerSubtitle = "Un flux vivant d'idées et d'explorations créatives",
}: CreativeFeedProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <SiteHeader
        subtitle={headerSubtitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showViewModeControls
      />

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
