"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CarnetTheme = "papier" | "vectrex"

interface CarnetThemeContextType {
  theme: CarnetTheme
  setTheme: (theme: CarnetTheme) => void
  toggleTheme: () => void
  showGrid: boolean
  setShowGrid: (show: boolean) => void
}

const CarnetThemeContext = createContext<CarnetThemeContextType | undefined>(undefined)

export function CarnetThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CarnetTheme>("papier")
  const [showGrid, setShowGrid] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("carnet-theme") as CarnetTheme | null
    if (stored) setTheme(stored)
    const storedGrid = localStorage.getItem("carnet-grid")
    if (storedGrid) setShowGrid(storedGrid === "true")
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("carnet-theme", theme)
    }
  }, [theme, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("carnet-grid", showGrid.toString())
    }
  }, [showGrid, mounted])

  const toggleTheme = () => {
    setTheme(theme === "papier" ? "vectrex" : "papier")
  }

  if (!mounted) {
    return null
  }

  return (
    <CarnetThemeContext.Provider value={{ theme, setTheme, toggleTheme, showGrid, setShowGrid }}>
      {children}
    </CarnetThemeContext.Provider>
  )
}

export function useCarnetTheme() {
  const context = useContext(CarnetThemeContext)
  if (context === undefined) {
    throw new Error("useCarnetTheme must be used within a CarnetThemeProvider")
  }
  return context
}
