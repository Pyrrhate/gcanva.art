import SiteHeader from "@/components/SiteHeader";

export default function ManifestePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        subtitle="Intentions, méthode et matière"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-foreground">Manifeste</h1>
      </main>
    </div>
  );
}
