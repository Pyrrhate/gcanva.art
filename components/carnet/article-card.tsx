"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Clock, Tag } from "lucide-react"
import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { cn } from "@/lib/utils"

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image?: string
  featured?: boolean
}

interface ArticleCardProps {
  article: Article
  index: number
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const { theme } = useCarnetTheme()
  
  // Create varied card heights for masonry effect
  const heightVariants = ["min-h-[280px]", "min-h-[340px]", "min-h-[300px]", "min-h-[360px]", "min-h-[260px]"]
  const height = heightVariants[index % heightVariants.length]
  
  // Slight rotation for papier theme
  const rotations = ["rotate-0", "-rotate-1", "rotate-1", "-rotate-0.5", "rotate-0.5"]
  const rotation = theme === "papier" ? rotations[index % rotations.length] : "rotate-0"

  return (
    <Link
      href={`/carnet/${article.slug}`}
      className={cn(
        "group relative flex flex-col p-5 border-2 border-border overflow-hidden",
        "transition-all duration-300 ease-out",
        height,
        // Papier theme styles
        theme === "papier" && [
          "bg-card rough-border",
          "hover:scale-[1.02] hover:-translate-y-1",
          rotation,
          "hover:rotate-0",
          "paper-texture"
        ],
        // Vectrex theme styles
        theme === "vectrex" && [
          "bg-card",
          "hover:neon-border",
          "hover:scale-[1.01]"
        ]
      )}
    >
      {/* Category Tag */}
      <div className={cn(
        "inline-flex items-center gap-2 self-start px-2 py-1 mb-4",
        "font-mono text-[10px] tracking-widest uppercase",
        "border border-border",
        theme === "vectrex" && "text-accent"
      )}>
        <Tag className="w-3 h-3" />
        {article.category}
      </div>

      {/* Image (if available) */}
      {article.image && (
        <div className={cn(
          "relative w-full h-32 mb-4 overflow-hidden border border-border",
          theme === "vectrex" && "opacity-80 group-hover:opacity-100"
        )}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              "group-hover:scale-105",
              theme === "vectrex" && "grayscale group-hover:grayscale-0"
            )}
          />
          {theme === "vectrex" && (
            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className={cn(
          "font-serif text-xl md:text-2xl leading-tight mb-3",
          "transition-colors duration-300",
          theme === "vectrex" && "group-hover:neon-glow"
        )}>
          {article.title}
        </h3>

        <p className={cn(
          "font-mono text-xs leading-relaxed text-muted-foreground line-clamp-3 mb-4"
        )}>
          {article.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className={cn(
        "flex items-center justify-between pt-4 mt-auto",
        "border-t border-border/50"
      )}>
        <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        <ArrowUpRight className={cn(
          "w-4 h-4 transition-transform duration-300",
          "group-hover:translate-x-1 group-hover:-translate-y-1",
          theme === "vectrex" && "group-hover:text-accent"
        )} />
      </div>

      {/* Decorative corner (Papier only) */}
      {theme === "papier" && (
        <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-border bg-background" 
          style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} 
        />
      )}

      {/* Scanlines overlay (Vectrex only) */}
      {theme === "vectrex" && (
        <div className="absolute inset-0 pointer-events-none scanlines opacity-50" />
      )}
    </Link>
  )
}
