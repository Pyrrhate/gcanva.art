"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function PortalPage() {
  const [hoveredSide, setHoveredSide] = useState<"studio" | "carnet" | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
        <span className="text-sm tracking-wider uppercase">GCanva</span>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Introduction */}
        <div className="flex-1 flex flex-col justify-center px-6 py-24 md:px-12 lg:px-16 lg:py-0">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Bienvenue dans<br />
              <span className="italic">l{"'"}Interstice</span>
            </h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
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
              
              <p className="text-foreground">
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
            className="flex-1 group relative flex flex-col justify-end p-6 md:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border transition-colors duration-500 hover:bg-secondary/50"
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
            className="flex-1 group relative flex flex-col justify-end p-6 md:p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border transition-colors duration-500 hover:bg-secondary/50"
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
      <footer className="px-6 py-6 md:px-12 lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>gcanva.art</span>
          <span>Developpeur & Artiste Visuel</span>
        </div>
      </footer>
    </main>
  )
}
