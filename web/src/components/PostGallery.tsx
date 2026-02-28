"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  blurDataURL?: string;
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

  const hasManyImages = images.length > 1;

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current - 1 + images.length) % images.length;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + 1) % images.length;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowLeft") {
        goPrevious();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Galerie</h2>
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="article-card group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border text-left transition-transform duration-300 hover:scale-[1.01]"
          >
            <figure className="relative overflow-hidden">
              <div className="card-corner-decoration" />
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: image.aspectRatio || 4 / 3 }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={image.blurDataURL}
                />
                <div className="card-image-overlay rounded-none" />
              </div>
              {image.caption && (
                <figcaption className="px-4 pb-4 pt-3 text-xs text-muted-foreground">{image.caption}</figcaption>
              )}
            </figure>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/85 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Aperçu image"
            onClick={() => setActiveIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 z-30 rounded-full border border-white/40 bg-black/70 p-3 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/90"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-full max-w-6xl flex-col justify-center" onClick={(event) => event.stopPropagation()}>
              <div className="relative flex items-center justify-center">
                {hasManyImages && (
                  <button
                    type="button"
                    aria-label="Image précédente"
                    onClick={goPrevious}
                    className="absolute left-2 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  <motion.figure
                    key={activeImage.url + activeIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <div
                      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl"
                      style={{ aspectRatio: activeImage.aspectRatio || 16 / 10 }}
                    >
                      <Image
                        src={activeImage.url}
                        alt={activeImage.alt}
                        fill
                        draggable={false}
                        className="object-contain"
                        sizes="100vw"
                        priority
                        placeholder={activeImage.blurDataURL ? "blur" : "empty"}
                        blurDataURL={activeImage.blurDataURL}
                      />
                    </div>
                    {(activeImage.caption || activeImage.alt) && (
                      <figcaption className="mt-3 text-center text-sm text-white/85">
                        {activeImage.caption || activeImage.alt}
                      </figcaption>
                    )}
                  </motion.figure>
                </AnimatePresence>

                {hasManyImages && (
                  <button
                    type="button"
                    aria-label="Image suivante"
                    onClick={goNext}
                    className="absolute right-2 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white hover:bg-black/70"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>

              {hasManyImages && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {images.map((image, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={`${image.url}-thumb-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all ${
                          isActive
                            ? "border-white/80 opacity-100"
                            : "border-white/25 opacity-65 hover:opacity-90"
                        }`}
                        aria-label={`Voir image ${index + 1}`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
