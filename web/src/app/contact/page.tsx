import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        subtitle="Contact & collaborations"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-foreground">Contact</h1>
      </main>
    </div>
  );
}
