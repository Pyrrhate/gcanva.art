"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Monitor, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="flex items-center gap-2 px-3 py-1.5 border border-border font-mono text-xs tracking-wider uppercase transition-colors"
        aria-label="Changer de theme"
      >
        <span className="w-3 h-3" />
        <span>---</span>
      </button>
    )
  }

  const isPapier = theme === "light"

  return (
    <button
      onClick={() => setTheme(isPapier ? "dark" : "light")}
      className="group flex items-center gap-2 px-3 py-1.5 border border-border font-mono text-xs tracking-wider uppercase transition-all duration-300 hover:bg-foreground hover:text-background crt-flicker"
      aria-label={`Passer au theme ${isPapier ? "Vectrex" : "Papier"}`}
    >
      {isPapier ? (
        <>
          <Sun className="w-3 h-3" />
          <span>Papier</span>
        </>
      ) : (
        <>
          <Monitor className="w-3 h-3" />
          <span>Vectrex</span>
        </>
      )}
    </button>
  )
}
