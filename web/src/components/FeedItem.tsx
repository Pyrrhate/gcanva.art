"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Music, Play } from "lucide-react";

export interface FeedItemProps {
  type: "image" | "text" | "music";
  data: ImageItemData | TextItemData | MusicItemData;
}

interface ImageItemData {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  aspectRatio?: number; // default 16/9
}

interface TextItemData {
  title: string;
  content: string;
  timestamp?: string;
  author?: string;
  displayMode?: "auto" | "single" | "sectioned";
  sections?: Array<{
    title?: string;
    content: string;
  }>;
}

interface MusicItemData {
  title: string;
  artist: string;
  cover?: string;
  duration?: string;
  spotifyUrl?: string;
  audioUrl?: string;
  description?: string;
}

export default function FeedItem({ type, data }: FeedItemProps) {
  if (type === "image") return <ImageCard data={data as ImageItemData} />;
  if (type === "text") return <TextCard data={data as TextItemData} />;
  if (type === "music") return <MusicCard data={data as MusicItemData} />;
  return null;
}

/* ===== IMAGE CARD ===== */
function ImageCard({ data }: { data: ImageItemData }) {
  const aspectRatio = data.aspectRatio || 16 / 9;

  return (
    <div className="group relative">
      <div 
        className="relative overflow-hidden rounded-2xl bg-muted/20"
        style={{ aspectRatio: aspectRatio }}
      >
        <Image
          src={data.src}
          alt={data.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-2xl" />
      </div>

      {(data.title || data.caption) && (
        <div className="pt-4 space-y-1">
          {data.title && <h3 className="text-sm font-semibold text-foreground leading-tight">{data.title}</h3>}
          {data.caption && <p className="text-xs text-muted-foreground line-clamp-2">{data.caption}</p>}
        </div>
      )}
    </div>
  );
}

/* ===== TEXT CARD ===== */
function TextCard({ data }: { data: TextItemData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const normalizedSections = useMemo(() => {
    if (data.displayMode === "sectioned" && data.sections && data.sections.length > 0) {
      return data.sections.filter((section) => section.content?.trim().length > 0);
    }

    if (data.displayMode === "single") {
      return [{ title: "Contenu", content: data.content }];
    }

    const paragraphs = data.content
      .split(/\n{2,}/g)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (paragraphs.length > 1) {
      return paragraphs.map((paragraph, index) => ({
        title: `Partie ${index + 1}`,
        content: paragraph,
      }));
    }

    const fallback = data.content.trim();
    if (fallback.length <= 560) {
      return [{ title: "Contenu", content: fallback }];
    }

    const chunks = fallback.match(/.{1,360}(\s|$)/g) || [fallback];
    return chunks.map((chunk, index) => ({
      title: `Partie ${index + 1}`,
      content: chunk.trim(),
    }));
  }, [data.content, data.displayMode, data.sections]);

  const hasSplitContent = normalizedSections.length > 1;
  const canExpand = hasSplitContent || normalizedSections[0]?.content.length > 340;
  const currentSection = normalizedSections[activeSectionIndex] || normalizedSections[0];
  const previewText = currentSection?.content?.slice(0, 340).trim();

  return (
    <article className="group relative h-full flex flex-col p-6 rounded-2xl bg-card border border-border/50 transition-all hover:border-primary/30">
      <div className="flex-1 space-y-4">
        {(data.author || data.timestamp) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground pb-3 border-b border-border/50">
            {data.author && <span className="font-medium text-foreground/80">{data.author}</span>}
            {data.timestamp && (
              <>
                {data.author && <span className="opacity-30">•</span>}
                <time>{data.timestamp}</time>
              </>
            )}
          </div>
        )}
        <h2 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {data.title}
        </h2>

        {hasSplitContent && isExpanded && (
          <div className="flex flex-wrap gap-2 pb-1">
            {normalizedSections.map((section, index) => (
              <button
                key={`${section.title || "section"}-${index}`}
                type="button"
                onClick={() => setActiveSectionIndex(index)}
                className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
                  activeSectionIndex === index
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {section.title || `Partie ${index + 1}`}
              </button>
            ))}
          </div>
        )}

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
          {isExpanded || !canExpand
            ? currentSection?.content
            : `${previewText}${(currentSection?.content?.length || 0) > 340 ? "…" : ""}`}
        </p>

        {canExpand && (
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="inline-flex items-center rounded-md border border-border px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
          >
            {isExpanded ? "Réduire" : "Développer l'article"}
          </button>
        )}
      </div>
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_15px_hsl(var(--primary)/0.05)]" />
    </article>
  );
}

/* ===== MUSIC CARD ===== */
function MusicCard({ data }: { data: MusicItemData }) {
  return (
    <div className="group relative h-full flex flex-col bg-gradient-to-b from-card to-background/50 rounded-2xl p-6 border border-border/50 overflow-hidden">
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_top_right,hsl(var(--secondary)/0.1),transparent)]" />

      <div className="relative space-y-4">
        {data.cover && (
          <div className="relative overflow-hidden rounded-xl aspect-square w-full sm:w-24 shrink-0 mx-auto sm:mx-0">
            <Image
              src={data.cover}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="200px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
              <button className="p-3 rounded-full bg-primary/80 hover:bg-primary text-background opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-primary/50">
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors duration-200">{data.title}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Music className="w-3 h-3" />
            <span>{data.artist}</span>
          </p>
        </div>

        {data.description && <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{data.description}</p>}
        {data.duration && <p className="text-xs text-muted-foreground/70 pt-1">{data.duration}</p>}
      </div>
    </div>
  );
}