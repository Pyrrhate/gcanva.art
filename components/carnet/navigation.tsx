"use client"

import Link from "next/link"
import { FileText, Cpu, Grid3x3, ArrowLeft, Home } from "lucide-react"
import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { cn } from "@/lib/utils"

export function CarnetNavigation() {
  const { theme, toggleTheme, showBlueprint, toggleBlueprint } = useCarnetTheme()

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 theme-transition",
      theme === "vectrex" && "scanlines"
    )}>
      <nav className={cn(
        "flex items-center justify-between px-6 py-4 md:px-12",
        "border-b-2 border-border",
        theme === "papier" && "bg-background/95 backdrop-blur-sm",
        theme === "vectrex" && "bg-background/90 backdrop-blur-md"
      )}>
        {/* Left - Logo & Back */}
        <div className="flex items-center gap-6">
          <Link 
            href="/"
            className={cn(
              "flex items-center gap-2 group",
              theme === "vectrex" && "hover:neon-glow"
            )}
          >
            <ArrowLeft className={cn(
              "w-4 h-4 transition-transform",
              "group-hover:-translate-x-1"
            )} />
            <span className="font-mono text-xs tracking-widest uppercase">
              Hub
            </span>
          </Link>
          
          <div className="hidden md:block h-4 w-px bg-border" />
          
          <Link 
            href="https://studio.gcanva.art"
            className={cn(
              "hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
              theme === "vectrex" && "hover:neon-glow"
            )}
          >
            <Home className="w-4 h-4" />
            <span className="font-mono text-xs tracking-widest uppercase">
              Studio
            </span>
          </Link>
        </div>

        {/* Center - Title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/carnet" className="group">
            <h1 className={cn(
              "font-mono text-sm md:text-base tracking-[0.3em] uppercase",
              theme === "vectrex" && "neon-glow crt-flicker"
            )}>
              Carnet
            </h1>
          </Link>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-3">
          {/* Blueprint Toggle */}
          <button
            onClick={toggleBlueprint}
            className={cn(
              "p-2 border-2 border-border transition-all",
              theme === "papier" && "hover:bg-secondary hover:rotate-1",
              theme === "vectrex" && showBlueprint && "neon-border",
              theme === "vectrex" && "hover:neon-border"
            )}
            aria-label="Toggle blueprint grid"
          >
            <Grid3x3 className={cn(
              "w-4 h-4",
              showBlueprint && "text-accent"
            )} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex items-center gap-2 px-3 py-2 border-2 border-border font-mono text-xs tracking-wider uppercase transition-all",
              theme === "papier" && "rough-border hover:bg-secondary hover:-rotate-1",
              theme === "vectrex" && "hover:neon-border"
            )}
            aria-label={`Switch to ${theme === "papier" ? "Vectrex" : "Papier"} theme`}
          >
            {theme === "papier" ? (
              <>
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Papier</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span className="hidden sm:inline">Vectrex</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
