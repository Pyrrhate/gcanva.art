import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { buildSeoMetadata, getSiteSettingsSeo } from "@/sanity/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSeo();

  return buildSeoMetadata({
    sectionSeo: settings?.contactSeo,
    fallbackTitle: "gcanva.art — Contact",
    fallbackDescription: "Contacte gcanva.art pour collaborations artistiques et projets digitaux.",
    settings,
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettingsSeo();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        siteTitle={settings?.brandTitle || settings?.siteName || "gcanva.art"}
        subtitle="Contact & collaborations"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-foreground">Contact</h1>
      </main>
    </div>
  );
}
