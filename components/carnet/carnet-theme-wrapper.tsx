"use client"

import { useCarnetTheme } from "./carnet-theme-context"
import type { ReactNode } from "react"

export function CarnetThemeWrapper({ children }: { children: ReactNode }) {
  const { theme, showGrid } = useCarnetTheme()

  return (
    <div
      className={`
        min-h-screen transition-colors duration-700 relative overflow-hidden
        ${theme === "papier" 
          ? "bg-[#FDFCF0] text-black" 
          : "bg-black text-[#00ff9f]"
        }
      `}
    >
      {/* Paper texture overlay for Papier theme */}
      {theme === "papier" && (
        <div 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Scanlines overlay for Vectrex theme */}
      {theme === "vectrex" && (
        <div 
          className="fixed inset-0 pointer-events-none opacity-10 z-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 159, 0.1) 2px,
              rgba(0, 255, 159, 0.1) 4px
            )`,
          }}
        />
      )}

      {/* Blueprint/Grid overlay */}
      {showGrid && (
        <div 
          className={`
            fixed inset-0 pointer-events-none z-0
            ${theme === "papier" ? "opacity-20" : "opacity-15"}
          `}
          style={{
            backgroundImage: theme === "papier"
              ? `
                linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
              `
              : `
                linear-gradient(to right, rgba(0,255,159,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,255,159,0.3) 1px, transparent 1px)
              `,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {/* CRT flicker effect for Vectrex */}
      {theme === "vectrex" && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 animate-pulse opacity-5"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
