"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GardenNoteCardData {
  _id: string;
  title: string;
  slug: string;
  lastTendedAt: string;
  excerpt: string;
  relatedCount: number;
}

const BLOB_CLASSES = ["rounded-blob-1", "rounded-blob-2", "rounded-blob-3", "rounded-blob-4", "rounded-blob-5"];

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getNoteAgeInDays(lastTendedAt: string) {
  const tendedDate = new Date(lastTendedAt).getTime();
  const now = Date.now();
  const diff = now - tendedDate;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function OrganicCard({ note }: { note: GardenNoteCardData }) {
  const hash = hashString(note._id);
  const blobClass = BLOB_CLASSES[hash % BLOB_CLASSES.length];
  const hoverRotation = ((hash % 401) / 100) - 2;
  const ageInDays = getNoteAgeInDays(note.lastTendedAt);
  const opacity = Math.max(0.78, 1 - ageInDays * 0.0025);
  const saturation = Math.max(0.74, 1 - ageInDays * 0.0035);

  return (
    <motion.article
      whileHover={{ scale: 1.02, rotate: hoverRotation }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      style={{ opacity, filter: `saturate(${saturation})` }}
      className={cn(
        "border border-stone/35 bg-paper/90 p-5 shadow-sm backdrop-blur-[1px] md:p-6",
        blobClass,
      )}
    >
      <h2 className="text-balance font-serif text-2xl leading-tight text-ink md:text-[1.9rem]">
        {note.title}
      </h2>

      <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-ink/85">{note.excerpt || "Note en croissance..."}</p>

      <footer className="mt-5 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.13em] text-ink/65">
        <time dateTime={note.lastTendedAt}>{new Date(note.lastTendedAt).toLocaleDateString("fr-FR")}</time>
        <span>{note.relatedCount} liens</span>
      </footer>
    </motion.article>
  );
}
