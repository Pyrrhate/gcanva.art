"use client"

import { useCarnetTheme } from "./context/theme-context"
import { Navigation } from "./components/navigation"
import { Hero } from "./components/hero"
import { CardGrid } from "./components/card-grid"
import { Footer } from "./components/footer"

export default function CarnetPage() {
  const { theme, showBlueprint } = useCarnetTheme()
  const isPapier = theme === "papier"

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 ${
        isPapier
          ? "bg-[#FDFCF0] text-[#1a1a1a] papier-selection"
          : "bg-[#050505] text-[#00FF88] vectrex-selection"
      }`}
    >
      {/* Paper texture overlay for Papier theme */}
      {isPapier && (
        <div className="fixed inset-0 pointer-events-none paper-texture" />
      )}

      {/* Scanlines for Vectrex theme */}
      {!isPapier && (
        <div className="fixed inset-0 pointer-events-none scanlines" />
      )}

      {/* Blueprint grid overlay */}
      {showBlueprint && (
        <div
          className={`fixed inset-0 pointer-events-none ${
            isPapier ? "blueprint-grid" : "vectrex-blueprint-grid"
          }`}
        />
      )}

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <CardGrid />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
