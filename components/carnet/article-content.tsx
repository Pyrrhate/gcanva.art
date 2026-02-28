"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Tag, Share2, Bookmark } from "lucide-react"
import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { cn } from "@/lib/utils"

interface ArticleContentProps {
  title: string
  category: string
  date: string
  readTime: string
  children: React.ReactNode
}

export function ArticleContent({ title, category, date, readTime, children }: ArticleContentProps) {
  const { theme } = useCarnetTheme()

  return (
    <article className={cn(
      "min-h-screen pt-24 pb-24 theme-transition",
      theme === "vectrex" && "scanlines"
    )}>
      {/* Back Link */}
      <div className="px-6 md:px-12 mb-12">
        <Link 
          href="/carnet"
          className={cn(
            "inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase",
            "text-muted-foreground hover:text-foreground transition-colors",
            theme === "vectrex" && "hover:neon-glow"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au carnet
        </Link>
      </div>

      {/* Header */}
      <header className="px-6 md:px-12 lg:px-24 xl:px-32 mb-16">
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 mb-6",
          "font-mono text-[10px] tracking-widest uppercase",
          "border border-border",
          theme === "vectrex" && "text-accent neon-border"
        )}>
          <Tag className="w-3 h-3" />
          {category}
        </div>

        <h1 className={cn(
          "font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-8",
          theme === "vectrex" && "neon-glow"
        )}>
          {title}
        </h1>

        <div className={cn(
          "flex flex-wrap items-center gap-6 pt-6 border-t-2 border-border",
          theme === "papier" && "border-dashed"
        )}>
          <span className="font-mono text-sm text-muted-foreground">{date}</span>
          <span className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {readTime}
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button className={cn(
              "p-2 border border-border transition-all",
              theme === "papier" && "hover:bg-secondary",
              theme === "vectrex" && "hover:neon-border"
            )}>
              <Bookmark className="w-4 h-4" />
            </button>
            <button className={cn(
              "p-2 border border-border transition-all",
              theme === "papier" && "hover:bg-secondary",
              theme === "vectrex" && "hover:neon-border"
            )}>
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={cn(
        "px-6 md:px-12 lg:px-24 xl:px-32",
        "prose prose-lg max-w-3xl",
        // Papier prose styles
        theme === "papier" && [
          "prose-headings:font-serif prose-headings:tracking-tight",
          "prose-p:font-sans prose-p:leading-relaxed prose-p:text-foreground",
          "prose-a:text-foreground prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4",
          "prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:bg-secondary/30",
          "prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:not-italic",
          "prose-code:font-mono prose-code:text-sm prose-code:bg-secondary prose-code:px-2 prose-code:py-1",
          "prose-pre:bg-foreground prose-pre:text-background prose-pre:border-2 prose-pre:border-foreground",
        ],
        // Vectrex prose styles
        theme === "vectrex" && [
          "prose-headings:font-mono prose-headings:tracking-widest prose-headings:uppercase",
          "prose-headings:text-foreground",
          "prose-p:font-mono prose-p:leading-relaxed prose-p:text-foreground",
          "prose-a:text-accent prose-a:no-underline prose-a:border-b prose-a:border-accent",
          "prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-secondary/50",
          "prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:text-accent",
          "prose-code:font-mono prose-code:text-accent prose-code:bg-secondary prose-code:px-2 prose-code:py-1",
          "prose-pre:bg-secondary prose-pre:border prose-pre:border-accent prose-pre:text-foreground",
        ]
      )}>
        {children}
      </div>

      {/* Footer Navigation */}
      <footer className={cn(
        "mt-24 px-6 md:px-12 lg:px-24 xl:px-32 py-12",
        "border-t-2 border-border",
        theme === "papier" && "border-dashed"
      )}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link 
            href="/carnet"
            className={cn(
              "px-6 py-3 border-2 border-border font-mono text-xs tracking-widest uppercase",
              "transition-all",
              theme === "papier" && "rough-border hover:bg-secondary",
              theme === "vectrex" && "hover:neon-border"
            )}
          >
            ← Article précédent
          </Link>
          <Link 
            href="/carnet"
            className={cn(
              "px-6 py-3 border-2 border-border font-mono text-xs tracking-widest uppercase",
              "transition-all",
              theme === "papier" && "rough-border hover:bg-secondary",
              theme === "vectrex" && "hover:neon-border"
            )}
          >
            Article suivant →
          </Link>
        </div>
      </footer>
    </article>
  )
}

// Portable Text compatible components
export function ArticleDropCap({ children }: { children: React.ReactNode }) {
  return (
    <p className="drop-cap first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1">
      {children}
    </p>
  )
}

export function ArticleBlockquote({ children, citation }: { children: React.ReactNode; citation?: string }) {
  const { theme } = useCarnetTheme()
  
  return (
    <blockquote className={cn(
      "my-8 py-6 px-8 border-l-4",
      theme === "papier" && "border-foreground bg-secondary/30",
      theme === "vectrex" && "border-accent bg-secondary/50"
    )}>
      <p className={cn(
        "font-serif text-xl italic leading-relaxed mb-4",
        theme === "vectrex" && "font-mono not-italic text-accent"
      )}>
        {children}
      </p>
      {citation && (
        <cite className="font-mono text-xs tracking-widest uppercase text-muted-foreground not-italic">
          — {citation}
        </cite>
      )}
    </blockquote>
  )
}

export function ArticleCodeBlock({ code, language }: { code: string; language?: string }) {
  const { theme } = useCarnetTheme()
  
  return (
    <div className={cn(
      "my-8 overflow-hidden border-2",
      theme === "papier" && "border-foreground",
      theme === "vectrex" && "border-accent neon-border"
    )}>
      {language && (
        <div className={cn(
          "px-4 py-2 border-b-2 font-mono text-xs tracking-widest uppercase",
          theme === "papier" && "bg-foreground text-background border-foreground",
          theme === "vectrex" && "bg-accent text-background border-accent"
        )}>
          {language}
        </div>
      )}
      <pre className={cn(
        "p-6 overflow-x-auto font-mono text-sm leading-relaxed",
        theme === "papier" && "bg-foreground text-background",
        theme === "vectrex" && "bg-secondary text-foreground"
      )}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ArticleImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const { theme } = useCarnetTheme()
  
  return (
    <figure className="my-12">
      <div className={cn(
        "overflow-hidden border-2",
        theme === "papier" && "border-foreground rough-border",
        theme === "vectrex" && "border-accent"
      )}>
        <img 
          src={src} 
          alt={alt} 
          className={cn(
            "w-full h-auto",
            theme === "vectrex" && "opacity-90"
          )} 
        />
      </div>
      {caption && (
        <figcaption className={cn(
          "mt-4 font-mono text-xs text-center text-muted-foreground tracking-wider"
        )}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
