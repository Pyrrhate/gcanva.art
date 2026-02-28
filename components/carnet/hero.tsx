"use client"

import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { cn } from "@/lib/utils"

export function CarnetHero() {
  const { theme } = useCarnetTheme()

  return (
    <section className={cn(
      "relative min-h-[50vh] flex flex-col items-center justify-center px-6 pt-32 pb-16",
      "theme-transition"
    )}>
      {/* Decorative Elements */}
      <div className={cn(
        "absolute top-24 left-8 w-24 h-24 border-2 border-border opacity-20",
        theme === "papier" && "rotate-12",
        theme === "vectrex" && "neon-border opacity-10"
      )} />
      <div className={cn(
        "absolute bottom-16 right-12 w-16 h-16 border-2 border-border opacity-20",
        theme === "papier" && "-rotate-6",
        theme === "vectrex" && "neon-border opacity-10"
      )} />
      
      {/* Main Title */}
      <div className="text-center max-w-4xl">
        <div className={cn(
          "mb-6 inline-flex items-center gap-3 px-4 py-2 border-2 border-border font-mono text-xs tracking-[0.5em] uppercase",
          theme === "papier" && "rough-border bg-card",
          theme === "vectrex" && "neon-border"
        )}>
          <span className="w-2 h-2 bg-accent" />
          Underground Alchemist
          <span className="w-2 h-2 bg-accent" />
        </div>

        <h1 className={cn(
          "font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight",
          theme === "vectrex" && "neon-glow crt-flicker"
        )}>
          CARNET
        </h1>
        
        <div className={cn(
          "mt-4 flex items-center justify-center gap-4",
          "font-mono text-lg sm:text-xl md:text-2xl tracking-[0.2em]"
        )}>
          <span className="text-muted-foreground">:</span>
          <span className={cn(
            theme === "vectrex" && "text-accent"
          )}>
            ALCHIMIE DIGITALE
          </span>
        </div>

        {/* Manifesto */}
        <p className={cn(
          "mt-12 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed text-muted-foreground",
          "border-t-2 border-b-2 border-border py-6 px-4",
          theme === "papier" && "border-dashed",
          theme === "vectrex" && "border-solid"
        )}>
          Un laboratoire où le code rencontre l{"'"}art, où chaque pixel est une formule,
          et où l{"'"}expérimentation perpétuelle forge de nouvelles réalités numériques.
        </p>

        {/* Status Indicator */}
        <div className={cn(
          "mt-8 flex items-center justify-center gap-3 font-mono text-xs tracking-widest uppercase text-muted-foreground"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            theme === "papier" && "bg-foreground",
            theme === "vectrex" && "bg-accent shadow-[0_0_10px_var(--accent)]"
          )} />
          Travaux en cours
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  )
}
