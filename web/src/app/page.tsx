import {defineQuery} from "next-sanity";
import CreativeFeed, { type CreativeFeedItem } from "@/components/CreativeFeed";
import { client } from "@/sanity/client";

const HOMEPAGE_HEADER_QUERY = defineQuery(/* groq */ `
  *[_type == "homepage"][0] {
    "headerTitle": coalesce(feedHeaderTitle, heroTitle, "Creative Feed"),
    "headerSubtitle": coalesce(feedHeaderSubtitle, heroSubtitle, "Un flux vivant d'idées et d'explorations créatives")
  }
`);

const GARDEN_NOTES_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote"] | order(lastTendedAt desc) {
    _id,
    title,
    confidenceLevel,
    lastTendedAt,
    displayMode,
    imageCaption,
    mainImage {
      asset->{
        url,
        metadata {
          lqip,
          dimensions { aspectRatio }
        }
      }
    },
    "contentText": pt::text(content),
    "sectionItems": contentSections[]{
      title,
      "contentText": pt::text(content)
    }
  }
`);

interface HeaderData {
  headerTitle?: string;
  headerSubtitle?: string;
}

interface GardenNoteData {
  _id: string;
  title: string;
  confidenceLevel?: number;
  lastTendedAt?: string;
  displayMode?: "auto" | "single" | "sectioned";
  imageCaption?: string;
  mainImage?: {
    asset?: {
      url?: string;
      metadata?: {
        dimensions?: {
          aspectRatio?: number;
        };
      };
    };
  };
  contentText?: string;
  sectionItems?: Array<{
    title?: string;
    contentText?: string;
  }>;
}

function mapGardenNoteToFeedItems(note: GardenNoteData): CreativeFeedItem[] {
  const timestamp = note.lastTendedAt
    ? new Date(note.lastTendedAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

  const confidencePrefix = typeof note.confidenceLevel === "number" ? `[${note.confidenceLevel}%] ` : "";
  const sections = (note.sectionItems || [])
    .filter((section) => (section.contentText || "").trim().length > 0)
    .map((section) => ({
      title: section.title,
      content: section.contentText || "",
    }));

  const textItem: CreativeFeedItem = {
    id: note._id,
    type: "text",
    data: {
      title: `${confidencePrefix}${note.title}`,
      content: note.contentText || "",
      author: "Garden Note",
      timestamp,
      displayMode: note.displayMode || "auto",
      sections,
    },
  };

  const imageUrl = note.mainImage?.asset?.url;
  if (!imageUrl) {
    return [textItem];
  }

  const imageItem: CreativeFeedItem = {
    id: `${note._id}-image`,
    type: "image",
    data: {
      src: imageUrl,
      alt: note.title,
      title: note.title,
      caption: note.imageCaption,
      aspectRatio: note.mainImage?.asset?.metadata?.dimensions?.aspectRatio || 4 / 3,
    },
  };

  return [imageItem, textItem];
}

export const revalidate = 60;

export default async function Page() {
  const [header, notes] = await Promise.all([
    client.fetch<HeaderData | null>(HOMEPAGE_HEADER_QUERY),
    client.fetch<GardenNoteData[]>(GARDEN_NOTES_QUERY),
  ]);

  const feedItems = (notes || []).flatMap(mapGardenNoteToFeedItems);

  return (
    <CreativeFeed
      items={feedItems}
      headerTitle={header?.headerTitle || "Creative Feed"}
      headerSubtitle={header?.headerSubtitle || "Un flux vivant d'idées et d'explorations créatives"}
    />
  );
}
