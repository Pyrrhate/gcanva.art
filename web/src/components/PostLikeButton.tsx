"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";

interface PostLikeButtonProps {
  postId: string;
  postSlug?: string;
  className?: string;
}

export default function PostLikeButton({ postId, postSlug, className }: PostLikeButtonProps) {
  const [liked, setLiked] = useState(false);

  const storageKey = useMemo(() => {
    return `post-like:${postSlug || postId}`;
  }, [postId, postSlug]);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(storageKey) === "1");
    } catch {
      setLiked(false);
    }
  }, [storageKey]);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);

    try {
      if (next) {
        localStorage.setItem(storageKey, "1");
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      return;
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className={className || "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"}
      aria-label={liked ? "Retirer le like" : "Ajouter un like"}
      aria-pressed={liked}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-current text-primary" : ""}`} />
      <span>{liked ? "Liked" : "Like"}</span>
    </button>
  );
}