"use client"

import { useCarnetTheme } from "./carnet-theme-context"

export function CarnetFooter() {
  const { theme } = useCarnetTheme()

  return (
    <footer
      className={`
        py-12 px-6 md:px-12
        transition-colors duration-500
        ${theme === "papier"
          ? "border-t-2 border-black"
          : "border-t border-[#00ff9f]/30"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className={`
            font-mono text-xs tracking-wider
            ${theme === "papier"
              ? "text-black/50"
              : "text-[#00ff9f]/50"
            }
          `}
        >
          Underground Alchemist / GCanva
        </p>

        <p
          className={`
            font-mono text-xs tracking-wider
            ${theme === "papier"
              ? "text-black/50"
              : "text-[#00ff9f]/50"
            }
          `}
        >
          Travail en cours
        </p>
      </div>
    </footer>
  )
}
