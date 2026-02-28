"use client"

import { useCarnetTheme } from "@/components/carnet/carnet-theme-context"

export function HeroSection() {
  const { theme } = useCarnetTheme()

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1
          className={`
            text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-8
            ${theme === "papier"
              ? "font-serif"
              : "font-mono"
            }
          `}
        >
          <span className="block">CARNET</span>
          <span
            className={`
              block text-2xl md:text-3xl lg:text-4xl mt-2
              ${theme === "papier"
                ? "italic text-black/60"
                : "text-[#00d4ff]"
              }
            `}
          >
            : ALCHIMIE DIGITALE
          </span>
        </h1>

        {/* Manifesto */}
        <p
          className={`
            max-w-2xl mx-auto text-lg md:text-xl leading-relaxed
            ${theme === "papier"
              ? "font-serif text-black/70"
              : "font-mono text-[#00ff9f]/70"
            }
          `}
        >
          Un laboratoire ou les idees brutes se transforment en or numerique.
        </p>

        {/* Decorative Element */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {theme === "papier" ? (
            <div className="flex items-center gap-2">
              <span className="w-12 h-px bg-black/30" />
              <span className="font-mono text-xs text-black/40 tracking-widest">WIP</span>
              <span className="w-12 h-px bg-black/30" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#00ff9f] animate-pulse" />
              <span className="font-mono text-xs text-[#00ff9f]/60 tracking-widest">SYSTEM ACTIVE</span>
              <span className="w-2 h-2 bg-[#00ff9f] animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
