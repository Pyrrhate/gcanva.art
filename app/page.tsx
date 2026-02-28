import { Navigation } from "@/components/carnet/navigation"
import { Hero } from "@/components/carnet/hero"
import { ArticleFeed } from "@/components/carnet/article-feed"
import { Footer } from "@/components/carnet/footer"

export default function CarnetPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <ArticleFeed />
      <Footer />
    </main>
  )
}
