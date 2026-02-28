"use client"

import Link from "next/link"
import { useCarnetTheme } from "../context/theme-context"
import { Sun, Moon, Grid3X3, ArrowLeft } from "lucide-react"

export function Navigation() {
  const { theme, toggleTheme, showBlueprint, toggleBlueprint } = useCarnetTheme()

  const isPapier = theme === "papier"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isPapier
          ? "bg-[#FDFCF0]/90 backdrop-blur-sm border-b-2 border-[#1a1a1a]"
          : "bg-[#050505]/90 backdrop-blur-sm border-b border-[#00FF88]/30"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
                isPapier
                  ? "text-[#1a1a1a] hover:text-[#666]"
                  : "text-[#00FF88] hover:text-[#00FFFF] crt-flicker"
              }`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Hub</span>
            </Link>

            <span
              className={`hidden sm:block w-px h-4 ${
                isPapier ? "bg-[#1a1a1a]" : "bg-[#00FF88]/50"
              }`}
            />

            <Link
              href="https://studio.gcanva.art"
              className={`hidden sm:block text-xs uppercase tracking-widest transition-colors ${
                isPapier
                  ? "text-[#1a1a1a] hover:text-[#666]"
                  : "text-[#00FF88] hover:text-[#00FFFF] crt-flicker"
              }`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              Studio
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/carnet" className="group">
              <span
                className={`text-sm sm:text-base uppercase tracking-[0.3em] transition-all ${
                  isPapier
                    ? "text-[#1a1a1a] group-hover:tracking-[0.4em]"
                    : "text-[#00FF88] neon-glow group-hover:tracking-[0.4em]"
                }`}
                style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
              >
                Carnet
              </span>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Blueprint Toggle */}
            <button
              onClick={toggleBlueprint}
              className={`p-2 transition-all ${
                isPapier
                  ? `border-2 border-[#1a1a1a] ${
                      showBlueprint ? "bg-[#1a1a1a] text-[#FDFCF0]" : "text-[#1a1a1a] hover:bg-[#1a1a1a]/10"
                    }`
                  : `border border-[#00FF88]/50 ${
                      showBlueprint
                        ? "bg-[#00FF88] text-[#050505]"
                        : "text-[#00FF88] hover:border-[#00FF88] crt-flicker"
                    }`
              }`}
              aria-label="Toggle blueprint grid"
              title="Toggle blueprint grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider transition-all ${
                isPapier
                  ? "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FDFCF0]"
                  : "border border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-[#050505] neon-border"
              }`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
              aria-label={`Switch to ${isPapier ? "Vectrex" : "Papier"} theme`}
            >
              {isPapier ? (
                <>
                  <Moon className="w-3 h-3" />
                  <span className="hidden sm:inline">Vectrex</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3" />
                  <span className="hidden sm:inline">Papier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
