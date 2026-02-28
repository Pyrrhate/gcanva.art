"use client"

import Link from "next/link"
import { useCarnetTheme } from "./carnet-theme-context"
import { Grid3X3, Layers } from "lucide-react"

export function CarnetNavigation() {
  const { theme, toggleTheme, showGrid, setShowGrid } = useCarnetTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`
          flex items-center justify-between px-6 py-4 md:px-12
          transition-all duration-500
          ${theme === "papier" 
            ? "bg-[#FDFCF0]/90 backdrop-blur-sm border-b-2 border-black" 
            : "bg-black/90 backdrop-blur-sm border-b border-[#00ff9f]/30"
          }
        `}
      >
        {/* Logo / Title */}
        <Link 
          href="/carnet" 
          className={`
            font-mono text-sm tracking-widest uppercase
            transition-colors duration-300
            ${theme === "papier" 
              ? "text-black hover:text-black/70" 
              : "text-[#00ff9f] hover:text-[#00d4ff]"
            }
          `}
        >
          Carnet
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="https://studio.gcanva.art"
            className={`
              font-mono text-xs tracking-wider uppercase
              transition-colors duration-300
              ${theme === "papier" 
                ? "text-black/60 hover:text-black" 
                : "text-[#00ff9f]/60 hover:text-[#00ff9f]"
              }
            `}
          >
            Studio
          </Link>
          <Link 
            href="https://gcanva.art"
            className={`
              font-mono text-xs tracking-wider uppercase
              transition-colors duration-300
              ${theme === "papier" 
                ? "text-black/60 hover:text-black" 
                : "text-[#00ff9f]/60 hover:text-[#00ff9f]"
              }
            `}
          >
            Hub
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Grid Toggle */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`
              p-2 transition-all duration-300
              ${theme === "papier"
                ? `border-2 border-black ${showGrid ? "bg-black text-[#FDFCF0]" : "bg-transparent text-black hover:bg-black/10"}`
                : `border border-[#00ff9f]/50 ${showGrid ? "bg-[#00ff9f] text-black" : "bg-transparent text-[#00ff9f] hover:bg-[#00ff9f]/10"}`
              }
            `}
            aria-label="Toggle grid overlay"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase
              transition-all duration-300
              ${theme === "papier"
                ? "border-2 border-black bg-transparent text-black hover:bg-black hover:text-[#FDFCF0]"
                : "border border-[#00ff9f] bg-transparent text-[#00ff9f] hover:bg-[#00ff9f] hover:text-black"
              }
            `}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">{theme === "papier" ? "Vectrex" : "Papier"}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
