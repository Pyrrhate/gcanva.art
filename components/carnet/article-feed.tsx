"use client"

import { articles } from "@/lib/articles"
import { ArticleCard } from "./article-card"

export function ArticleFeed() {
  return (
    <section className="px-6 py-12 md:px-12 md:py-20">
      {/* Section header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Entrees recentes
          </span>
          <div className="hidden md:block w-24 h-px bg-border" aria-hidden="true" />
          <span className="hidden md:inline font-mono text-[10px] text-muted-foreground">
            {articles.length} fragments
          </span>
        </div>
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>

      {/* Bottom signature */}
      <div className="mt-16 flex items-center justify-center">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Fin de la transmission
          </span>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
