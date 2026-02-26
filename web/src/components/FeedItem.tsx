"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon, Music, Pause, FileText, Play } from "lucide-react";
import { useAudioSystem } from "@/components/audio/AudioProvider";

export interface FeedItemProps {
  type: "image" | "text" | "music";
  data: ImageItemData | TextItemData | MusicItemData;
}

interface ImageItemData {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  aspectRatio?: number;
}

interface TextItemData {
  title: string;
  postSlug?: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageAspectRatio?: number;
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
    <article className="article-card group relative h-full overflow-hidden border">
      {/* Corner decoration */}
      <div className="card-corner-decoration" />

      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <Image
          src={data.src}
          alt={data.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="card-image-overlay" />
      </div>

      {/* Content footer */}
      {(data.title || data.caption) && (
        <div className="relative px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1">
              {data.title && (
                <h3 className="text-sm font-semibold leading-tight text-foreground">
                  {data.title}
                </h3>
              )}
              {data.caption && (
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {data.caption}
                </p>
              )}
            </div>
            <span className="card-type-badge shrink-0">
              <ImageIcon className="h-2.5 w-2.5" />
              <span>IMG</span>
            </span>
          </div>
        </div>
      )}

      {/* No title/caption: floating badge */}
      {!data.title && !data.caption && (
        <div className="absolute bottom-3 left-3 z-10">
          <span className="card-type-badge">
            <ImageIcon className="h-2.5 w-2.5" />
            <span>IMG</span>
          </span>
        </div>
      )}
    </article>
  );
}

/* ===== TEXT CARD ===== */
function TextCard({ data }: { data: TextItemData }) {
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
  const currentSection = normalizedSections[activeSectionIndex] || normalizedSections[0];
  const currentText = currentSection?.content || "";
  const isGreatPost = hasSplitContent || currentText.length > POST_PREVIEW_THRESHOLD;
  const previewText = currentText.slice(0, POST_PREVIEW_THRESHOLD).trim();
  const textClassName = isGreatPost
    ? "whitespace-pre-wrap text-sm leading-relaxed text-foreground/80 line-clamp-5"
    : "whitespace-pre-wrap text-sm leading-relaxed text-foreground/85";

  return (
    <article className="article-card group relative flex h-full flex-col border overflow-hidden">
      {/* Corner decoration */}
      <div className="card-corner-decoration" />

      {/* Hero image (full bleed at top) */}
      {data.imageSrc && (
        <figure className="relative w-full overflow-hidden">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: data.imageAspectRatio || 16 / 10 }}
          >
            <Image
              src={data.imageSrc}
              alt={data.imageAlt || data.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <div className="card-image-overlay" />
          </div>
          {data.imageCaption && (
            <figcaption className="px-4 pt-2 pb-0 text-[11px] text-muted-foreground italic">
              {data.imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Content area */}
      <div className="flex flex-1 flex-col px-4 py-4">
        {/* Header row: metadata + badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="card-meta">
            {data.author && <span>{data.author}</span>}
            {data.timestamp && (
              <>
                {data.author && <span className="opacity-40">/</span>}
                <time>{data.timestamp}</time>
              </>
            )}
          </div>
          <span className="card-type-badge shrink-0">
            <FileText className="h-2.5 w-2.5" />
            <span>Note</span>
          </span>
        </div>

        {/* Separator */}
        <div className="card-separator my-3" />

        {/* Title */}
        <h2 className="text-pretty text-lg font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          {data.postSlug ? (
            <Link href={`/post/${data.postSlug}`}>
              {data.title}
            </Link>
          ) : (
            data.title
          )}
        </h2>

        {/* Section pills */}
        {hasSplitContent && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {normalizedSections.map((section, index) => (
              <button
                key={`${section.title || "section"}-${index}`}
                type="button"
                onClick={() => setActiveSectionIndex(index)}
                className={`border px-2 py-0.5 text-[10px] font-medium transition-all duration-200 ${
                  activeSectionIndex === index
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {section.title || `${index + 1}`}
              </button>
            ))}
          </div>
        )}

        {/* Text content */}
        <div className="mt-3 flex-1">
          <p className={textClassName}>
            {isGreatPost ? `${previewText}...` : currentText}
          </p>
        </div>

        {/* Read more CTA */}
        {isGreatPost && data.postSlug && (
          <div className="mt-4">
            <Link href={`/post/${data.postSlug}`} className="card-read-more">
              <span className="card-read-more-text">Lire</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

/* ===== MUSIC CARD ===== */
function MusicCard({ data }: { data: MusicItemData }) {
  const { currentTrack, isPlaying, playTrack, togglePlayback } = useAudioSystem();
  const isCurrentTrack = currentTrack?.audioUrl === data.audioUrl;

  const handlePlay = async () => {
    if (!data.audioUrl) return;
    if (isCurrentTrack) {
      await togglePlayback();
      return;
    }

    await playTrack({
      title: data.title,
      artist: data.artist,
      audioUrl: data.audioUrl,
      cover: data.cover,
    });
  };

  return (
    <article className="article-card group relative flex h-full flex-col border overflow-hidden">
      {/* Corner decoration */}
      <div className="card-corner-decoration" />

      {/* Cover art - full bleed */}
      {data.cover && (
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={data.cover}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="card-image-overlay" />

          {/* Play button overlay */}
          {data.audioUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => void handlePlay()}
                className="music-play-button flex h-12 w-12 items-center justify-center text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                aria-label={isCurrentTrack && isPlaying ? "Mettre en pause" : "Lire le morceau"}
              >
                {isCurrentTrack && isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                )}
              </button>
            </div>
          )}

          {/* Waveform animation (playing state) */}
          {isCurrentTrack && isPlaying && (
            <div className="absolute bottom-3 left-3 flex h-4 items-end gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{
                    animationDelay: `${i * 0.12}s`,
                    height: `${30 + Math.random() * 70}%`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 py-4">
        {/* Badge + duration */}
        <div className="flex items-center justify-between gap-3">
          <span className="card-type-badge">
            <Music className="h-2.5 w-2.5" />
            <span>Audio</span>
          </span>
          {data.duration && (
            <span className="card-meta">
              {data.duration}
            </span>
          )}
        </div>

        {/* Separator */}
        <div className="card-separator my-3" />

        {/* Title + artist */}
        <div className="space-y-0.5">
          <h3 className="text-base font-semibold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary">
            {data.title}
          </h3>
          <p className="text-xs text-muted-foreground">{data.artist}</p>
        </div>

        {/* Description */}
        {data.description && (
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3 pt-4">
          {data.audioUrl && (
            <button
              type="button"
              onClick={() => void handlePlay()}
              className="card-read-more"
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
              <span className="card-read-more-text">{isCurrentTrack && isPlaying ? "Pause" : "Play"}</span>
            </button>
          )}

          {data.spotifyUrl && (
            <a
              href={data.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="card-read-more"
            >
              <span className="card-read-more-text">Spotify</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const POST_PREVIEW_THRESHOLD = 420;
