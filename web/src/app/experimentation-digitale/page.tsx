import SiteHeader from "@/components/SiteHeader";

export default function ExperimentationDigitalePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        subtitle="Laboratoire d'essais visuels & sonores"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-foreground">Expérimentation Digitale</h1>
      </main>
    </div>
  );
}
