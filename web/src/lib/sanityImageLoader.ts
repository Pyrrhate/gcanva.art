import type { ImageLoaderProps } from "next/image";

function withSearchParams(url: URL, params: Record<string, string>) {
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url;
}

export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  const safeQuality = quality || 75;

  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      const imageUrl = new URL(src);
      return withSearchParams(imageUrl, {
        w: String(width),
        q: String(safeQuality),
        auto: "format",
        fit: "max",
      }).toString();
    } catch {
      return src;
    }
  }

  return src;
}
