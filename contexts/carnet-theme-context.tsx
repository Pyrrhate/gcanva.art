"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "papier" | "vectrex"

interface CarnetThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  showBlueprint: boolean
  setShowBlueprint: (show: boolean) => void
  toggleBlueprint: () => void
}

const CarnetThemeContext = createContext<CarnetThemeContextType | undefined>(undefined)

export function CarnetThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("papier")
  const [showBlueprint, setShowBlueprint] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("carnet-theme") as Theme
    const savedBlueprint = localStorage.getItem("carnet-blueprint")
    if (savedTheme) setTheme(savedTheme)
    if (savedBlueprint) setShowBlueprint(savedBlueprint === "true")
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("carnet-theme", theme)
    
    const root = document.documentElement
    if (theme === "vectrex") {
      root.classList.add("vectrex")
      root.classList.remove("papier")
    } else {
      root.classList.add("papier")
      root.classList.remove("vectrex")
    }
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("carnet-blueprint", String(showBlueprint))
  }, [showBlueprint, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === "papier" ? "vectrex" : "papier")
  }

  const toggleBlueprint = () => {
    setShowBlueprint(prev => !prev)
  }

  if (!mounted) {
    // Return a loading skeleton that matches the papier theme to prevent flash
    return (
      <div className="min-h-screen bg-[#FDFCF0] animate-pulse">
        <div className="h-16 border-b-2 border-[#1a1a1a]" />
      </div>
    )
  }

  return (
    <CarnetThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      showBlueprint, 
      setShowBlueprint, 
      toggleBlueprint 
    }}>
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
