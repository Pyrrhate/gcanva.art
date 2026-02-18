"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
  if (type === "image") {
    return <ImageCard data={data as ImageItemData} />;
  }

  if (type === "text") {
    return <TextCard data={data as TextItemData} />;
  }

  if (type === "music") {
    return <MusicCard data={data as MusicItemData} />;
  }

  return null;
}

/* ===== IMAGE CARD ===== */
function ImageCard({ data }: { data: ImageItemData }) {
  const aspectRatio = data.aspectRatio || 16 / 9;

  return (
    <div className="group relative">
      {/* Image container avec glow subtil */}
      <div className="relative overflow-hidden rounded-2xl">
        <AspectRatio ratio={aspectRatio}>
          <Image
            src={data.src}
            alt={data.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </AspectRatio>

        {/* Gradient overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-2xl"></div>
      </div>

      {/* Metadata en dessous (pas de border heavy) */}
      {(data.title || data.caption) && (
        <div className="pt-4 space-y-2">
          {data.title && (
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              {data.title}
            </h3>
          )}
          {data.caption && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {data.caption}
            </p>
          )}
        </div>
      )}

      {/* Glow border subtle */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{
             boxShadow: "inset 0 0 20px hsl(var(--accent) / 0.1)",
           }}>
      </div>
    </div>
  );
}

/* ===== TEXT CARD ===== */
function TextCard({ data }: { data: TextItemData }) {
  return (
    <article className="group relative h-full flex flex-col">
      <div className="flex-1 space-y-3">
        {/* Métadonnées (discret) */}
        {(data.author || data.timestamp) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground pb-2 border-b border-border/50">
            {data.author && <span className="font-medium">{data.author}</span>}
            {data.timestamp && (
              <>
                {data.author && <span className="opacity-30">•</span>}
                <time>{data.timestamp}</time>
              </>
            )}
          </div>
        )}

        {/* Titre */}
        <h2 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {data.title}
        </h2>

        {/* Contenu texte - rich text handler */}
        <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
          {data.content}
        </p>
      </div>

      {/* Effet glow au hover (subtle) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{
             boxShadow: "inset 0 0 15px hsl(var(--primary) / 0.05)",
           }}>
      </div>
    </article>
  );
}

/* ===== MUSIC CARD ===== */
function MusicCard({ data }: { data: MusicItemData }) {
  return (
    <div className="group relative h-full flex flex-col bg-gradient-to-b from-card to-background/50 rounded-2xl p-6 border border-border/50 glass-morphism overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{
             background: "radial-gradient(circle at top right, hsl(var(--secondary) / 0.1), transparent)",
             pointerEvents: "none",
           }}>
      </div>

      <div className="relative space-y-4">
        {/* Cover Image (optionnel) */}
        {data.cover && (
          <div className="relative overflow-hidden rounded-xl">
            <AspectRatio ratio={1}>
              <Image
                src={data.cover}
                alt={data.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="300px"
              />
            </AspectRatio>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded-xl">
              {data.audioUrl && (
                <button
                  className="p-3 rounded-full bg-primary/80 hover:bg-primary text-background opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg shadow-primary/50"
                  aria-label="Play audio"
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Music Info */}
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-200">
            {data.title}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Music className="w-3 h-3" />
            <span>{data.artist}</span>
          </p>
        </div>

        {/* Description (optionnel) */}
        {data.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {data.description}
          </p>
        )}

        {/* Duration (optionnel) */}
        {data.duration && (
          <p className="text-xs text-muted-foreground/70 pt-2">
            {data.duration}
          </p>
        )}

        {/* Spotify Link (optionnel) */}
        {data.spotifyUrl && (
          <a
            href={data.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 text-secondary text-xs font-medium transition-all duration-200"
          >
            <Music className="w-3 h-3" />
            <span>Écouter sur Spotify</span>
          </a>
        )}
      </div>

      {/* Glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
