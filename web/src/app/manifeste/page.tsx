import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { buildSeoMetadata, getSiteSettingsSeo } from "@/sanity/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSeo();

  return buildSeoMetadata({
    sectionSeo: settings?.manifesteSeo,
    fallbackTitle: "gcanva.art — Manifeste",
    fallbackDescription: "Intentions, méthode et matière du carnet créatif gcanva.art.",
    settings,
  });
}

export default async function ManifestePage() {
  const settings = await getSiteSettingsSeo();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        siteTitle={settings?.brandTitle || settings?.siteName || "gcanva.art"}
        subtitle="Intentions, méthode et matière"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-foreground">Manifeste</h1>
      </main>
    </div>
  );
}
