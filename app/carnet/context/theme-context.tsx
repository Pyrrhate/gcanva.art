"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CarnetTheme = "papier" | "vectrex"

interface ThemeContextType {
  theme: CarnetTheme
  toggleTheme: () => void
  showBlueprint: boolean
  toggleBlueprint: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function CarnetThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CarnetTheme>("papier")
  const [showBlueprint, setShowBlueprint] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("carnet-theme") as CarnetTheme | null
    if (saved) setTheme(saved)
    const blueprintSaved = localStorage.getItem("carnet-blueprint")
    if (blueprintSaved) setShowBlueprint(blueprintSaved === "true")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "papier" ? "vectrex" : "papier"
    setTheme(newTheme)
    localStorage.setItem("carnet-theme", newTheme)
  }

  const toggleBlueprint = () => {
    const newValue = !showBlueprint
    setShowBlueprint(newValue)
    localStorage.setItem("carnet-blueprint", String(newValue))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FDFCF0]" />
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, showBlueprint, toggleBlueprint }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useCarnetTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useCarnetTheme must be used within CarnetThemeProvider")
  }
  return context
}
