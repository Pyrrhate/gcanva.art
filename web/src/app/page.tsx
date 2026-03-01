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
    tags,
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
    "contentText": pt::text(content)
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
  tags?: string[];
  lastTendedAt?: string;
  imageCaption?: string;
  mainImage?: {
    asset?: {
      url?: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          aspectRatio?: number;
        };
      };
    };
  };
  contentText?: string;
}

function mapGardenNoteToFeedItems(note: GardenNoteData): CreativeFeedItem[] {
  const timestamp = note.lastTendedAt
    ? new Date(note.lastTendedAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

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
      imageBlurDataURL: note.mainImage?.asset?.metadata?.lqip,
      postId: note._id,
      tags: note.tags,
      timestamp,
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
