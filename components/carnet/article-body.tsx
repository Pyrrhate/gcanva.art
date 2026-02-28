import type { Article } from "@/lib/articles"

interface ArticleBodyProps {
  article: Article
}

export function ArticleBody({ article }: ArticleBodyProps) {
  const paragraphs = article.content.split("\n\n")

  return (
    <div className="prose-carnet">
      {paragraphs.map((block, i) => {
        // Blockquote
        if (block.startsWith("> ")) {
          const quoteText = block.replace(/^> /gm, "")
          return (
            <blockquote key={i}>
              <p>{quoteText}</p>
            </blockquote>
          )
        }

        // Code block
        if (block.startsWith("```")) {
          const lines = block.split("\n")
          const lang = lines[0].replace("```", "")
          const code = lines.slice(1, -1).join("\n")
          return (
            <pre key={i} data-language={lang}>
              <code>{code}</code>
            </pre>
          )
        }

        // Unordered list
        if (block.startsWith("- ")) {
          const items = block.split("\n").filter(l => l.startsWith("- "))
          return (
            <ul key={i} className="my-6 ml-4 space-y-2">
              {items.map((item, j) => (
                <li key={j} className="font-mono text-sm leading-relaxed text-foreground flex items-start gap-3">
                  <span className="text-accent mt-1 shrink-0" aria-hidden="true">--</span>
                  <span>{item.replace(/^- /, "")}</span>
                </li>
              ))}
            </ul>
          )
        }

        // Regular paragraph with drop cap on first
        return (
          <p
            key={i}
            className={`text-base md:text-lg leading-relaxed md:leading-[1.8] mb-6 text-foreground ${
              i === 0 ? "drop-cap" : ""
            }`}
          >
            {block}
          </p>
        )
      })}
    </div>
  )
}
