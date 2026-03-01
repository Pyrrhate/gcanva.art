"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function PortalPage() {
  const [hoveredSide, setHoveredSide] = useState<"studio" | "carnet" | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Lien d'évitement pour accessibilité */}
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 md:py-6">
        <span className="text-sm font-medium tracking-wider uppercase text-foreground/90">GCanva</span>
      </header>

      {/* Main Content */}
      <div id="contenu-principal" className="flex flex-col lg:flex-row min-h-screen" tabIndex={-1}>
        {/* Left Side - Introduction */}
        <div className="flex-1 flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 lg:px-16 lg:py-0">
          <div className="max-w-xl space-y-8">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
              Bienvenue dans<br />
              <span className="italic">l{"'"}Interstice</span>
            </h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-[1.0625rem]">
              <p>
                Mon travail repose sur deux grilles de lecture : la precision millimetree 
                du developpement web et l{"'"}energie brute de l{"'"}experimentation visuelle.
              </p>
              
              <p>
                gcanva.art n{"'"}est pas un simple portfolio, c{"'"}est un ecosysteme divise 
                en deux hemispheres :
              </p>
              
              <p>
                D{"'"}un cote, le <span className="text-foreground font-medium">Studio</span>, 
                ou la technique se met au service du besoin, de l{"'"}ergonomie et de vos projets 
                professionnels. De l{"'"}autre, le <span className="text-foreground font-medium">Carnet</span>, 
                un espace organique ou les idees poussent, mutent et se melangent sans contrainte.
              </p>
              
              <p className="text-foreground font-medium">
                Deux salles, deux ambiances. Bonne exploration.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Navigation Cards */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Studio Card */}
          <Link
            href="https://studio.gcanva.art"
            className="flex-1 group relative flex flex-col justify-end min-h-[280px] md:min-h-[320px] p-6 md:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border transition-colors duration-500 hover:bg-secondary/50 focus-visible:bg-secondary/40 focus-visible:outline-offset-[-2px]"
            onMouseEnter={() => setHoveredSide("studio")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-12 lg:right-12">
              <ArrowUpRight 
                className={`w-5 h-5 transition-transform duration-300 ${
                  hoveredSide === "studio" ? "translate-x-1 -translate-y-1" : ""
                }`} 
              />
            </div>
            
            <div className="space-y-4">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">01</span>
              <h2 className="font-serif text-3xl md:text-4xl italic">Studio</h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                La technique au service du besoin. Projets professionnels, ergonomie, precision.
              </p>
            </div>

            {/* Decorative line - precise/technical aesthetic */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border">
              <div 
                className={`h-full bg-foreground transition-all duration-700 ease-out ${
                  hoveredSide === "studio" ? "w-full" : "w-0"
                }`}
              />
            </div>
          </Link>

          {/* Carnet Card */}
          <Link
            href="https://carnet.gcanva.art"
            className="flex-1 group relative flex flex-col justify-end min-h-[280px] md:min-h-[320px] p-6 md:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border transition-colors duration-500 hover:bg-secondary/50 focus-visible:bg-secondary/40 focus-visible:outline-offset-[-2px]"
            onMouseEnter={() => setHoveredSide("carnet")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-12 lg:right-12">
              <ArrowUpRight 
                className={`w-5 h-5 transition-transform duration-300 ${
                  hoveredSide === "carnet" ? "translate-x-1 -translate-y-1" : ""
                }`} 
              />
            </div>
            
            <div className="space-y-4">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">02</span>
              <h2 className="font-serif text-3xl md:text-4xl italic">Carnet</h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Un espace organique. Idees, mutations, experimentations sans contrainte.
              </p>
            </div>

            {/* Decorative element - organic/experimental aesthetic */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border overflow-hidden">
              <div 
                className={`h-full bg-foreground transition-all duration-700 ease-out ${
                  hoveredSide === "carnet" ? "w-full" : "w-0"
                }`}
                style={{ 
                  transformOrigin: hoveredSide === "carnet" ? "left" : "right"
                }}
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-6 md:px-12 lg:absolute lg:bottom-0 lg:left-0 lg:right-0" role="contentinfo">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">gcanva.art</span>
          <span>Developpeur & Artiste Visuel</span>
        </div>
      </footer>
    </main>
  )
}
