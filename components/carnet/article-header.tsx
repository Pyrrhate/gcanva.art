import type { Article } from "@/lib/articles"

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16 border-b border-border">
      <div className="max-w-3xl mx-auto">
        {/* Meta line */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
            {article.category}
          </span>
          <div className="w-8 h-px bg-border" aria-hidden="true" />
          <time className="font-mono text-[10px] tracking-wider text-muted-foreground">
            {formattedDate}
          </time>
          <div className="w-8 h-px bg-border" aria-hidden="true" />
          <span className="font-mono text-[10px] text-muted-foreground">
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl italic leading-[0.95] tracking-tight text-balance glow-text">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-8 font-mono text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-8 flex-wrap">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 border border-border text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
