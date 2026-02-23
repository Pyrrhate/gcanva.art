"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ImageIcon, Music, Pause, Pen, Play } from "lucide-react";
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
  blurDataURL?: string;
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
  imageBlurDataURL?: string;
  timestamp?: string;
  author?: string;
  postId?: string;
  tags?: string[];
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

function ImageCard({ data }: { data: ImageItemData }) {
  const aspectRatio = data.aspectRatio || 16 / 9;

  return (
    <article className="article-card group relative h-full overflow-hidden rounded-2xl border p-0 transition-transform duration-300 hover:scale-[1.01]">
      <div className="card-corner-decoration" />

      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        <Image
          src={data.src}
          alt={data.alt}
          fill
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder={data.blurDataURL ? "blur" : "empty"}
          blurDataURL={data.blurDataURL}
        />
        <div
          className="absolute inset-0"
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
          aria-hidden="true"
        />
        <div className="card-image-overlay rounded-none" />
      </div>

      {(data.title || data.caption) && (
        <div className="relative px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1">
              {data.title && <h3 className="text-sm font-semibold leading-tight text-foreground">{data.title}</h3>}
              {data.caption && <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{data.caption}</p>}
            </div>
            <span className="card-type-badge mt-0.5 shrink-0">
              <ImageIcon className="h-2.5 w-2.5" />
              Image
            </span>
          </div>
        </div>
      )}

      {!data.title && !data.caption && (
        <div className="absolute bottom-3 left-3 z-10">
          <span className="card-type-badge">
            <ImageIcon className="h-2.5 w-2.5" />
            Image
          </span>
        </div>
      )}
    </article>
  );
}

function TextCard({ data }: { data: TextItemData }) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const likeStorageKey = useMemo(() => {
    if (data.postId) return `post-like:${data.postId}`;
    if (data.postSlug) return `post-like:${data.postSlug}`;
    return `post-like:${data.title}`;
  }, [data.postId, data.postSlug, data.title]);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(likeStorageKey) === "1");
    } catch {
      setLiked(false);
    }
  }, [likeStorageKey]);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);

    try {
      if (next) {
        localStorage.setItem(likeStorageKey, "1");
      } else {
        localStorage.removeItem(likeStorageKey);
      }
    } catch {
      return;
    }
  };

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
    ? "whitespace-pre-wrap text-left text-sm leading-relaxed text-foreground/80 line-clamp-6"
    : "whitespace-pre-wrap text-left text-base leading-7 text-foreground/90";

  return (
    <article className="article-card group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-transform duration-300 hover:scale-[1.01]">
      <div className="card-corner-decoration" />

      {data.imageSrc && (
        <figure className="relative w-full overflow-hidden">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: data.imageAspectRatio || 4 / 3 }}>
            <Image
              src={data.imageSrc}
              alt={data.imageAlt || data.title}
              fill
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 700px"
              placeholder={data.imageBlurDataURL ? "blur" : "empty"}
              blurDataURL={data.imageBlurDataURL}
            />
            <div
              className="absolute inset-0"
              onContextMenu={(event) => event.preventDefault()}
              onDragStart={(event) => event.preventDefault()}
              aria-hidden="true"
            />
            <div className="card-image-overlay rounded-none" />
          </div>
          {data.imageCaption && <figcaption className="px-5 pb-0 pt-2.5 text-xs text-muted-foreground">{data.imageCaption}</figcaption>}
        </figure>
      )}

      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {data.author && <span className="font-medium text-foreground/70">{data.author}</span>}
            {data.timestamp && (
              <>
                {data.author && <span className="opacity-30">/</span>}
                <time>{data.timestamp}</time>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="card-type-badge shrink-0">
              <Pen className="h-2.5 w-2.5" />
              Note
            </span>
            <button
              type="button"
              onClick={toggleLike}
              className="card-type-badge shrink-0"
              aria-label={liked ? "Retirer le like" : "Ajouter un like"}
              aria-pressed={liked}
            >
              <Heart className={`h-2.5 w-2.5 ${liked ? "fill-current" : ""}`} />
              {liked ? "Liked" : "Like"}
            </button>
          </div>
        </div>

        <div className="card-separator my-3" />

        <h2 className="text-pretty text-left text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          {data.postSlug ? (
            <Link href={`/post/${data.postSlug}`} className="card-read-more-link">
              {data.title}
            </Link>
          ) : (
            data.title
          )}
        </h2>

        {!!data.tags?.length && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {data.tags.map((tag) => (
              <span key={`${data.postId || data.postSlug || data.title}-${tag}`} className="card-type-badge">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {hasSplitContent && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {normalizedSections.map((section, index) => (
              <button
                key={`${section.title || "section"}-${index}`}
                type="button"
                onClick={() => setActiveSectionIndex(index)}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all duration-200 ${
                  activeSectionIndex === index
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {section.title || `Partie ${index + 1}`}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex-1">
          <p className={textClassName}>{isGreatPost ? `${previewText}...` : currentText}</p>
        </div>

        {isGreatPost && data.postSlug && (
          <div className="mt-4">
            <Link href={`/post/${data.postSlug}`} className="card-read-more">
              Lire la suite
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

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
    <article className="article-card group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-transform duration-300 hover:scale-[1.01]">
      <div className="card-corner-decoration" />

      {data.cover && (
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={data.cover}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="card-image-overlay rounded-none" />

          {data.audioUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => void handlePlay()}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-background/90"
                aria-label={isCurrentTrack && isPlaying ? "Mettre en pause" : "Lire le morceau"}
              >
                {isCurrentTrack && isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                )}
              </button>
            </div>
          )}

          {isCurrentTrack && isPlaying && (
            <div className="absolute bottom-3 left-3 flex h-4 items-end gap-0.5">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="waveform-bar bg-primary"
                  style={{
                    animationDelay: `${index * 0.12}s`,
                    height: `${35 + index * 9}%`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="card-type-badge">
            <Music className="h-2.5 w-2.5" />
            Musique
          </span>
          {data.duration && <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">{data.duration}</span>}
        </div>

        <div className="card-separator my-3" />

        <div className="space-y-0.5">
          <h3 className="text-base font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary">{data.title}</h3>
          <p className="text-xs text-muted-foreground">{data.artist}</p>
        </div>

        {data.description && <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{data.description}</p>}

        <div className="mt-auto flex items-center gap-2 pt-4">
          {data.audioUrl && (
            <button type="button" onClick={() => void handlePlay()} className="card-read-more">
              {isCurrentTrack && isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {isCurrentTrack && isPlaying ? "Pause" : "Ecouter"}
            </button>
          )}

          {data.spotifyUrl && (
            <a href={data.spotifyUrl} target="_blank" rel="noreferrer" className="card-read-more">
              Spotify
              <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const POST_PREVIEW_THRESHOLD = 420;
