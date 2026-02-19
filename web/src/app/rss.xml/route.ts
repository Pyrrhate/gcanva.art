import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { getSiteSettingsSeo } from "@/sanity/seo";

export const revalidate = 3600;

const RSS_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote"] | order(lastTendedAt desc)[0...30] {
    _id,
    title,
    "slug": coalesce(slug.current, _id),
    lastTendedAt,
    "excerpt": coalesce(pt::text(content), "")
  }
`);

interface RssItem {
  _id: string;
  title: string;
  slug: string;
  lastTendedAt?: string;
  excerpt?: string;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const [settings, posts] = await Promise.all([
    getSiteSettingsSeo(),
    client.fetch<RssItem[]>(RSS_QUERY),
  ]);

  const siteUrl = settings?.siteUrl || "https://gcanva.art";
  const siteName = settings?.siteName || "gcanva.art";

  const items = (posts || [])
    .map((post) => {
      const postUrl = `${siteUrl.replace(/\/$/, "")}/post/${post.slug}`;
      const description = (post.excerpt || "").slice(0, 260);

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid>${escapeXml(postUrl)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${new Date(post.lastTendedAt || Date.now()).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Flux des dernières notes de ${escapeXml(siteName)}</description>
    <language>fr-FR</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}
