import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { buildSeoMetadata, getSiteSettingsSeo } from "@/sanity/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSeo();

  return buildSeoMetadata({
    sectionSeo: settings?.experimentationSeo,
    fallbackTitle: "gcanva.art — Expérimentation Digitale",
    fallbackDescription: "Laboratoire d'essais visuels et sonores de gcanva.art.",
    settings,
  });
}

export default async function ExperimentationDigitalePage() {
  const settings = await getSiteSettingsSeo();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        siteTitle={settings?.brandTitle || settings?.siteName || "gcanva.art"}
        subtitle="Laboratoire d'essais visuels & sonores"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-foreground">Expérimentation Digitale</h1>
      </main>
    </div>
  );
}
