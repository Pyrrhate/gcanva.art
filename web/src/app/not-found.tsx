import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getSiteSettingsSeo } from "@/sanity/seo";

export default async function NotFound() {
  const settings = await getSiteSettingsSeo();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        siteTitle={settings?.brandTitle || settings?.siteName || "gcanva.art"}
        subtitle="Page introuvable"
        showViewModeControls={false}
      />

      <main className="mx-auto flex max-w-3xl flex-col items-start px-6 py-16">
        <p className="text-sm text-muted-foreground">Erreur 404</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Cette page n’existe pas</h1>
        <p className="mt-4 text-muted-foreground">
          Le lien est peut-être expiré, déplacé ou incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          Retour au carnet
        </Link>
      </main>
    </div>
  );
}
