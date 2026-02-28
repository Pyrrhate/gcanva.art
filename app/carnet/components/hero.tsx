"use client"

import { useCarnetTheme } from "../context/theme-context"

export function Hero() {
  const { theme } = useCarnetTheme()
  const isPapier = theme === "papier"

  return (
    <section
      className={`relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 ${
        isPapier ? "papier-selection" : "vectrex-selection"
      }`}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isPapier ? (
          <>
            {/* Paper torn edges effect */}
            <div className="absolute top-20 left-8 w-16 h-16 border-2 border-[#1a1a1a] rotate-12 opacity-20" />
            <div className="absolute top-32 right-12 w-8 h-8 border-2 border-[#1a1a1a] -rotate-6 opacity-20" />
            <div className="absolute bottom-24 left-1/4 w-12 h-12 border-2 border-[#1a1a1a] rotate-45 opacity-10" />
          </>
        ) : (
          <>
            {/* CRT noise elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FF88] opacity-50 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#00FFFF] opacity-30 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#00FF88] opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
          </>
        )}
      </div>

      {/* Main Title */}
      <div className="relative text-center max-w-4xl mx-auto">
        {/* Top label */}
        <div
          className={`mb-6 text-xs tracking-[0.5em] uppercase ${
            isPapier ? "text-[#666]" : "text-[#00FF88]/60"
          }`}
          style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
        >
          Underground Alchemist
        </div>

        {/* Main Title */}
        <h1 className="relative">
          <span
            className={`block text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight ${
              isPapier ? "text-[#1a1a1a]" : "text-[#00FF88] neon-glow"
            }`}
            style={{ fontFamily: "var(--font-serif-carnet), Georgia, serif" }}
          >
            CARNET
          </span>
          
          {/* Separator */}
          <span
            className={`block my-4 sm:my-6 text-2xl sm:text-3xl md:text-4xl ${
              isPapier ? "text-[#1a1a1a]" : "text-[#00FFFF]"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            :
          </span>
          
          <span
            className={`block text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide italic ${
              isPapier ? "text-[#1a1a1a]" : "text-[#00FF88] neon-glow"
            }`}
            style={{ fontFamily: "var(--font-serif-carnet), Georgia, serif" }}
          >
            ALCHIMIE DIGITALE
          </span>
        </h1>

        {/* Manifesto */}
        <p
          className={`mt-12 max-w-xl mx-auto text-sm sm:text-base leading-relaxed ${
            isPapier ? "text-[#444]" : "text-[#00FF88]/80"
          }`}
          style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
        >
          Un laboratoire où le code devient matière première et les pixels, pigments d{"'"}une nouvelle réalité.
        </p>

        {/* Status indicator */}
        <div
          className={`mt-8 inline-flex items-center gap-3 px-4 py-2 text-xs tracking-wider uppercase ${
            isPapier
              ? "border-2 border-[#1a1a1a] text-[#1a1a1a]"
              : "border border-[#00FF88]/50 text-[#00FF88]"
          }`}
          style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isPapier ? "bg-[#1a1a1a]" : "bg-[#00FF88]"
            }`}
          />
          <span>Work in Progress</span>
          <span className={isPapier ? "text-[#666]" : "text-[#00FF88]/50"}>
            v0.1.0
          </span>
        </div>
      </div>
    </section>
  )
}
