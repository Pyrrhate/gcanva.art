import { client } from "@/sanity/client";
import CreativeFeed, { CreativeFeedItem } from "@/components/CreativeFeed";

// ===== GROQ Query =====
const FEED_QUERY = `
  *[_type == "feedItem"] | order(publishedAt desc) {
    _id,
    title,
    type,
    publishedAt,
    textContent,
    author,
    imageFile {
      asset -> {
        url
      },
      hotspot,
      crop
    },
    imageCaption,
    musicArtist,
    musicCover {
      asset -> {
        url
      }
    },
    duration,
    spotifyUrl,
    musicDescription,
    audioUrl
  }
`;

// ===== Type for raw Sanity data =====
interface SanityFeedItem {
  _id: string;
  title: string;
  type: "text" | "image" | "music";
  publishedAt?: string;
  textContent?: string;
  author?: string;
  imageFile?: {
    asset?: {
      url?: string;
    };
    hotspot?: any;
    crop?: any;
  };
  imageCaption?: string;
  musicArtist?: string;
  musicCover?: {
    asset?: {
      url?: string;
    };
  };
  duration?: string;
  spotifyUrl?: string;
  musicDescription?: string;
  audioUrl?: string;
}

// ===== Transform Sanity data to CreativeFeedItem =====
function transformSanityToFeedItem(item: SanityFeedItem): CreativeFeedItem {
  const baseId = item._id || `item-${Math.random()}`;
  const baseTimestamp = item.publishedAt
    ? new Date(item.publishedAt)
    : undefined;

  // ===== TEXT CARD =====
  if (item.type === "text") {
    return {
      id: baseId,
      type: "text",
      timestamp: baseTimestamp,
      data: {
        title: item.title,
        content: item.textContent || "",
        author: item.author,
        timestamp: item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : undefined,
      },
    };
  }

  // ===== IMAGE CARD =====
  if (item.type === "image") {
    return {
      id: baseId,
      type: "image",
      timestamp: baseTimestamp,
      data: {
        src: item.imageFile?.asset?.url || "",
        alt: item.title,
        title: item.title,
        caption: item.imageCaption,
        aspectRatio: 16 / 9, // Default, peut être enrichi si métadonnées dispo
      },
    };
  }

  // ===== MUSIC CARD =====
  if (item.type === "music") {
    return {
      id: baseId,
      type: "music",
      timestamp: baseTimestamp,
      data: {
        title: item.title,
        artist: item.musicArtist || "Unknown Artist",
        cover: item.musicCover?.asset?.url,
        duration: item.duration,
        spotifyUrl: item.spotifyUrl,
        description: item.musicDescription,
        audioUrl: item.audioUrl,
      },
    };
  }

  // Fallback (ne devrait pas arriver ici si schéma est bon)
  return {
    id: baseId,
    type: "text" as const,
    timestamp: baseTimestamp,
    data: {
      title: item.title,
      content: "",
    },
  };
}

// ===== Server Component =====
export default async function Page() {
  let feedItems: CreativeFeedItem[] = [];
  let error: string | null = null;

  try {
    const sanityItems: SanityFeedItem[] = await client.fetch(FEED_QUERY);
    feedItems = sanityItems.map(transformSanityToFeedItem);
  } catch (err) {
    console.error("Error fetching feed items:", err);
    error = "Failed to load feed items";
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
      <CreativeFeed items={feedItems} />
    </>
  );
}

// ===== ISR (Revalidate cache every 60 seconds) =====
export const revalidate = 60;