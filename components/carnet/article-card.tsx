"use client"

import Link from "next/link"
import type { Article } from "@/lib/articles"
import { ArrowRight } from "lucide-react"

interface ArticleCardProps {
  article: Article
  index: number
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const isLarge = article.featured

  return (
    <Link
      href={`/article/${article.slug}`}
      className={`group relative block border-[length:var(--card-border-width)] border-border bg-card transition-all duration-500 hover:-translate-y-1 crt-flicker ${
        isLarge ? "md:col-span-2" : ""
      }`}
    >
      {/* Category tag */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {article.category}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {article.readTime}
        </span>
      </div>

      {/* Content */}
      <div className={`px-5 py-6 ${isLarge ? "md:py-10" : ""}`}>
        <h2
          className={`font-serif italic leading-tight text-balance ${
            isLarge
              ? "text-2xl md:text-4xl"
              : "text-xl md:text-2xl"
          }`}
        >
          {article.title}
        </h2>

        <p className="mt-4 font-mono text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 pb-5">
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border border-border text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
          <span className="hidden md:inline">Lire</span>
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Hover decorative corner marks */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-accent transition-colors duration-300" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-accent transition-colors duration-300" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-accent transition-colors duration-300" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-accent transition-colors duration-300" aria-hidden="true" />
    </Link>
  )
}
