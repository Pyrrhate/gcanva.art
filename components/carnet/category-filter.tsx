"use client"

import { useState } from "react"
import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "Tous",
  "Théorie",
  "Manifeste", 
  "Étude",
  "Exploration",
  "Expérience",
  "Méditation",
  "Philosophie",
  "Audio"
]

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const { theme } = useCarnetTheme()
  const [activeCategory, setActiveCategory] = useState("Tous")

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onFilterChange?.(category)
  }

  return (
    <div className={cn(
      "flex flex-wrap gap-2 px-6 md:px-12 mb-8"
    )}>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={cn(
            "px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase",
            "border border-border transition-all duration-200",
            // Active state
            activeCategory === category && [
              theme === "papier" && "bg-foreground text-background",
              theme === "vectrex" && "bg-accent text-background neon-border"
            ],
            // Inactive state
            activeCategory !== category && [
              "text-muted-foreground",
              theme === "papier" && "hover:bg-secondary hover:text-foreground hover:-rotate-1",
              theme === "vectrex" && "hover:text-accent hover:border-accent"
            ]
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
