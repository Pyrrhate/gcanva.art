"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"

export function Navigation() {
  const [gridVisible, setGridVisible] = useState(false)

  return (
    <>
      {/* Blueprint grid overlay */}
      {gridVisible && (
        <div
          className="fixed inset-0 z-40 pointer-events-none blueprint-grid"
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <nav className="flex items-center justify-between px-6 py-4 md:px-12">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-xl italic tracking-tight">Carnet</span>
            <span className="hidden md:inline font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              Underground Alchemist
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Blueprint grid toggle */}
            <button
              onClick={() => setGridVisible(!gridVisible)}
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 border font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                gridVisible
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:bg-foreground hover:text-background"
              }`}
              aria-label="Basculer la grille"
              aria-pressed={gridVisible}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70">
                <line x1="0" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="0.5" />
                <line x1="4" y1="0" x2="4" y2="12" stroke="currentColor" strokeWidth="0.5" />
                <line x1="8" y1="0" x2="8" y2="12" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <span>Grille</span>
            </button>

            <ThemeToggle />

            {/* External links */}
            <div className="hidden md:flex items-center gap-1 ml-2 border-l border-border pl-4">
              <a
                href="https://studio.gcanva.art"
                className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Studio
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
              <span className="text-muted-foreground mx-2">/</span>
              <a
                href="https://gcanva.art"
                className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Hub
                <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
