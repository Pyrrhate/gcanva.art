"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
}

interface PostGalleryProps {
  images: GalleryImage[];
}

export default function PostGallery({ images }: PostGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] || null;
  }, [activeIndex, images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Galerie</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group text-left"
          >
            <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-2 shadow-sm transition-transform duration-200 group-hover:scale-[1.01]">
              <div
                className="relative w-full overflow-hidden rounded-xl"
                style={{ aspectRatio: image.aspectRatio || 4 / 3 }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {image.caption && (
                <figcaption className="mt-2 text-xs text-muted-foreground">{image.caption}</figcaption>
              )}
            </figure>
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu image"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2 text-white hover:bg-black/60"
          >
            <X className="h-4 w-4" />
          </button>

          <figure
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: activeImage.aspectRatio || 16 / 10 }}
            >
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {(activeImage.caption || activeImage.alt) && (
              <figcaption className="mt-3 text-center text-sm text-white/85">
                {activeImage.caption || activeImage.alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}
