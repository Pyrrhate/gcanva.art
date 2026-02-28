"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useCarnetTheme } from "@/components/carnet/carnet-theme-context"

interface ArticleContentProps {
  article: {
    title: string
    date: string
    category: string
    content: string
    readTime: string
  }
}

export function ArticleContent({ article }: ArticleContentProps) {
  const { theme } = useCarnetTheme()

  // Parse markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeContent: string[] = []
    let codeLanguage = ""

    lines.forEach((line, index) => {
      // Code block start/end
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.slice(3).trim()
          codeContent = []
        } else {
          inCodeBlock = false
          elements.push(
            <pre
              key={index}
              className={`
                my-8 p-6 overflow-x-auto font-mono text-sm
                ${theme === "papier"
                  ? "bg-black text-[#FDFCF0] border-2 border-black"
                  : "bg-[#00ff9f]/10 text-[#00ff9f] border border-[#00ff9f]/30"
                }
              `}
            >
              <code>{codeContent.join("\n")}</code>
            </pre>
          )
        }
        return
      }

      if (inCodeBlock) {
        codeContent.push(line)
        return
      }

      // Empty line
      if (line.trim() === "") {
        elements.push(<div key={index} className="h-4" />)
        return
      }

      // H2
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className={`
              text-2xl md:text-3xl mt-12 mb-6
              ${theme === "papier" ? "font-serif" : "font-mono"}
            `}
          >
            {line.slice(3)}
          </h2>
        )
        return
      }

      // Blockquote
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={index}
            className={`
              my-8 pl-6 py-4 text-xl md:text-2xl leading-relaxed italic
              ${theme === "papier"
                ? "border-l-4 border-black font-serif text-black/80"
                : "border-l-2 border-[#00d4ff] font-mono text-[#00d4ff]"
              }
            `}
          >
            {line.slice(2).replace(/"/g, "")}
          </blockquote>
        )
        return
      }

      // Ordered list
      if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*—\s*(.+)$/)
        if (match) {
          elements.push(
            <div key={index} className="my-4 flex gap-4">
              <span
                className={`
                  font-mono text-sm
                  ${theme === "papier" ? "text-black/50" : "text-[#00ff9f]/50"}
                `}
              >
                {line.match(/^\d+/)?.[0]}.
              </span>
              <p className="leading-relaxed">
                <strong className={theme === "papier" ? "" : "text-[#00d4ff]"}>
                  {match[1]}
                </strong>
                {" — "}
                <span className={theme === "papier" ? "text-black/70" : "text-[#00ff9f]/70"}>
                  {match[2]}
                </span>
              </p>
            </div>
          )
          return
        }
      }

      // Regular paragraph with bold handling
      const boldRegex = /\*\*(.+?)\*\*/g
      const parts = line.split(boldRegex)
      elements.push(
        <p
          key={index}
          className={`
            my-4 leading-relaxed text-lg
            ${theme === "papier" ? "text-black/80" : "text-[#00ff9f]/80"}
          `}
        >
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className={theme === "papier" ? "" : "text-[#00d4ff]"}>
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      )
    })

    return elements
  }

  return (
    <main className="pt-24 pb-16">
      {/* Back Link */}
      <div className="px-6 md:px-12 mb-12">
        <Link
          href="/carnet"
          className={`
            inline-flex items-center gap-2 font-mono text-sm tracking-wider
            transition-colors duration-300
            ${theme === "papier"
              ? "text-black/50 hover:text-black"
              : "text-[#00ff9f]/50 hover:text-[#00ff9f]"
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      {/* Article Header */}
      <header className="px-6 md:px-12 mb-12 md:mb-16">
        <div className="max-w-3xl mx-auto">
          {/* Category */}
          <span
            className={`
              inline-block px-3 py-1 mb-6 font-mono text-xs tracking-wider uppercase
              ${theme === "papier"
                ? "bg-black text-[#FDFCF0]"
                : "bg-[#00ff9f]/20 text-[#00ff9f] border border-[#00ff9f]/50"
              }
            `}
          >
            {article.category}
          </span>

          {/* Title */}
          <h1
            className={`
              text-3xl md:text-4xl lg:text-5xl leading-tight mb-6
              ${theme === "papier" ? "font-serif" : "font-mono"}
            `}
          >
            {article.title}
          </h1>

          {/* Meta */}
          <div
            className={`
              flex items-center gap-4 font-mono text-sm
              ${theme === "papier" ? "text-black/50" : "text-[#00ff9f]/50"}
            `}
          >
            <time>{article.date}</time>
            <span>•</span>
            <span>{article.readTime} de lecture</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="px-6 md:px-12">
        <div
          className={`
            max-w-3xl mx-auto
            ${theme === "papier"
              ? "[&_p:first-of-type]:first-letter:float-left [&_p:first-of-type]:first-letter:text-6xl [&_p:first-of-type]:first-letter:font-serif [&_p:first-of-type]:first-letter:mr-3 [&_p:first-of-type]:first-letter:mt-1 [&_p:first-of-type]:first-letter:leading-none"
              : ""
            }
          `}
        >
          {renderContent(article.content)}
        </div>
      </article>
    </main>
  )
}
