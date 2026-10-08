import type { MetadataRoute } from "next";
import { normalizeSiteUrl } from "@/lib/site";
import { getSiteSettingsSeo } from "@/sanity/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettingsSeo();
  const siteUrl = normalizeSiteUrl(settings?.siteUrl);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
