import type { MetadataRoute } from "next";
import { defineQuery } from "next-sanity";
import { hasBody, normalizeSiteUrl } from "@/lib/site";
import { client } from "@/sanity/client";
import { noteUrl } from "@/sanity/jsonld";
import { getSiteSettingsSeo } from "@/sanity/seo";

export const revalidate = 3600;

const SITEMAP_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote" && !(seo.noIndex == true)] | order(lastTendedAt desc) {
    "slug": coalesce(slug.current, _id),
    lastTendedAt,
    _updatedAt,
    "contentText": pt::text(content),
    "imageUrl": mainImage.asset->url
  }
`);

interface SitemapNote {
  slug: string;
  lastTendedAt?: string;
  _updatedAt?: string;
  contentText?: string;
  imageUrl?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, notes] = await Promise.all([getSiteSettingsSeo(), client.fetch<SitemapNote[]>(SITEMAP_QUERY)]);
  const siteUrl = normalizeSiteUrl(settings?.siteUrl);

  /* Les notes sans texte sont en noindex : les lister ici contredirait la balise robots. */
  const indexable = (notes || []).filter((note) => hasBody(note.contentText));
  const latest = indexable[0]?.lastTendedAt || indexable[0]?._updatedAt;

  return [
    {
      url: siteUrl,
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...indexable.map((note) => ({
      url: noteUrl(siteUrl, note.slug),
      lastModified: new Date(note.lastTendedAt || note._updatedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: note.imageUrl ? [note.imageUrl] : undefined,
    })),
  ];
}
