import type { Metadata } from "next";
import {defineQuery} from "next-sanity";
import CreativeFeed, { type CreativeFeedItem } from "@/components/CreativeFeed";
import { client } from "@/sanity/client";
import { buildSeoMetadata, getSiteSettingsSeo, type SeoData } from "@/sanity/seo";

const HOMEPAGE_HEADER_QUERY = defineQuery(/* groq */ `
  *[_type == "homepage"][0] {
    "headerSubtitle": coalesce(feedHeaderSubtitle, heroSubtitle, "Un flux vivant d'idées et d'explorations créatives"),
    seo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    }
  }
`);

const GARDEN_NOTES_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote"] | order(lastTendedAt desc) {
    _id,
    "slug": coalesce(slug.current, _id),
    title,
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
  headerSubtitle?: string;
  seo?: SeoData;
}

interface GardenNoteData {
  _id: string;
  slug: string;
  title: string;
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
      title: note.title,
      postSlug: note.slug,
      content: note.contentText || "",
      imageSrc: note.mainImage?.asset?.url,
      imageAlt: note.title,
      imageCaption: note.imageCaption,
      imageAspectRatio: note.mainImage?.asset?.metadata?.dimensions?.aspectRatio,
      author: "Garden Note",
      timestamp,
      displayMode: note.displayMode || "auto",
      sections,
    },
  };

  return [textItem];
}

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [homepage, settings] = await Promise.all([
    client.fetch<HeaderData | null>(HOMEPAGE_HEADER_QUERY),
    getSiteSettingsSeo(),
  ]);

  return buildSeoMetadata({
    pageSeo: homepage?.seo,
    sectionSeo: settings?.homeSeo,
    fallbackTitle: "gcanva.art — Carnet",
    fallbackDescription: "Carnet créatif entre alchimie organique et énergie électronique.",
    settings,
  });
}

export default async function Page() {
  const [header, notes, settings] = await Promise.all([
    client.fetch<HeaderData | null>(HOMEPAGE_HEADER_QUERY),
    client.fetch<GardenNoteData[]>(GARDEN_NOTES_QUERY),
    getSiteSettingsSeo(),
  ]);

  const feedItems = (notes || []).flatMap(mapGardenNoteToFeedItems);

  return (
    <CreativeFeed
      items={feedItems}
      siteTitle={settings?.brandTitle || settings?.siteName || "gcanva.art"}
      headerSubtitle={header?.headerSubtitle || "Un flux vivant d'idées et d'explorations créatives"}
    />
  );
}
