"use client"

import { CarnetThemeProvider, useCarnetTheme } from "@/contexts/carnet-theme-context"
import { CarnetNavigation } from "@/components/carnet/navigation"
import { CarnetHero } from "@/components/carnet/hero"
import { ArticleFeed } from "@/components/carnet/article-feed"
import { CarnetFooter } from "@/components/carnet/footer"
import { cn } from "@/lib/utils"

function CarnetPageContent() {
  const { theme, showBlueprint } = useCarnetTheme()

  return (
    <main className={cn(
      "min-h-screen theme-transition relative",
      theme === "papier" && "paper-texture",
      theme === "vectrex" && "scanlines",
      showBlueprint && "blueprint-grid"
    )}>
      <CarnetNavigation />
      <CarnetHero />
      <ArticleFeed />
      <CarnetFooter />

      {/* Version indicator */}
      <div className={cn(
        "fixed bottom-4 left-4 px-2 py-1 font-mono text-[10px] tracking-widest uppercase",
        "border border-border bg-background/80 backdrop-blur-sm",
        theme === "vectrex" && "text-accent"
      )}>
        v0.1.0-alpha
      </div>
    </main>
  )
}

export default function CarnetPage() {
  return (
    <CarnetThemeProvider>
      <CarnetPageContent />
    </CarnetThemeProvider>
  )
}
