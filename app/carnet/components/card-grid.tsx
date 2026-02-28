"use client"

import Link from "next/link"
import { useCarnetTheme } from "../context/theme-context"
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image?: string
  featured?: boolean
}

const articles: Article[] = [
  {
    id: "1",
    slug: "transmutation-pixels",
    title: "Transmutation des Pixels",
    excerpt: "Explorer les frontières entre le code et l'art génératif, où chaque ligne devient un coup de pinceau numérique.",
    category: "Génératif",
    date: "2026-02-15",
    readTime: "8 min",
    featured: true,
  },
  {
    id: "2",
    slug: "rituels-interface",
    title: "Rituels d'Interface",
    excerpt: "Les micro-interactions comme actes magiques: comment l'UX devient une forme de sorcellerie moderne.",
    category: "UX/UI",
    date: "2026-02-10",
    readTime: "5 min",
  },
  {
    id: "3",
    slug: "grimoire-webgl",
    title: "Grimoire WebGL",
    excerpt: "Incantations shader et formules GLSL pour invoquer des dimensions impossibles dans le navigateur.",
    category: "3D",
    date: "2026-02-05",
    readTime: "12 min",
  },
  {
    id: "4",
    slug: "alchimie-typographique",
    title: "Alchimie Typographique",
    excerpt: "Transformer le plomb des lettres en or visuel: essais sur la typographie variable.",
    category: "Typographie",
    date: "2026-01-28",
    readTime: "6 min",
    featured: true,
  },
  {
    id: "5",
    slug: "fractales-urbaines",
    title: "Fractales Urbaines",
    excerpt: "Quand l'architecture rencontre les mathématiques: générer des villes impossibles.",
    category: "Génératif",
    date: "2026-01-20",
    readTime: "10 min",
  },
  {
    id: "6",
    slug: "sons-algorithmes",
    title: "Sons & Algorithmes",
    excerpt: "Audio réactif et visualisations sonores: synesthésie programmée.",
    category: "Audio",
    date: "2026-01-15",
    readTime: "7 min",
  },
]

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const { theme } = useCarnetTheme()
  const isPapier = theme === "papier"
  
  // Asymmetric sizing for masonry effect
  const isLarge = article.featured || index % 5 === 0
  const isMedium = index % 3 === 1

  return (
    <Link
      href={`/carnet/${article.slug}`}
      className={`group block ${
        isLarge ? "md:col-span-2 md:row-span-2" : isMedium ? "md:row-span-2" : ""
      }`}
    >
      <article
        className={`relative h-full p-6 transition-all duration-300 overflow-hidden ${
          isPapier
            ? "rough-border bg-[#FDFCF0] card-papier"
            : "border border-[#00FF88]/30 bg-[#0a0a0a] card-vectrex"
        }`}
      >
        {/* Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-wider ${
              isPapier
                ? "bg-[#1a1a1a] text-[#FDFCF0]"
                : "border border-[#00FF88] text-[#00FF88]"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
          
          <ArrowUpRight
            className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
              isPapier ? "text-[#1a1a1a]" : "text-[#00FF88]"
            }`}
          />
        </div>

        {/* Image placeholder for featured */}
        {isLarge && (
          <div
            className={`relative aspect-video mb-6 overflow-hidden ${
              isPapier ? "border-2 border-[#1a1a1a]" : "border border-[#00FF88]/50"
            }`}
          >
            <div
              className={`absolute inset-0 ${
                isPapier
                  ? "bg-gradient-to-br from-[#e8e7dc] to-[#d4d3c8]"
                  : "bg-gradient-to-br from-[#0a0a0a] to-[#111]"
              }`}
            />
            {/* Grid pattern overlay */}
            <div
              className={`absolute inset-0 opacity-30 ${
                isPapier ? "blueprint-grid" : "vectrex-blueprint-grid"
              }`}
            />
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-16 h-16 border-2 rotate-45 ${
                  isPapier ? "border-[#1a1a1a]/20" : "border-[#00FF88]/30"
                }`}
              />
            </div>
          </div>
        )}

        {/* Title */}
        <h3
          className={`text-xl ${isLarge ? "md:text-3xl" : ""} leading-tight mb-3 ${
            isPapier ? "text-[#1a1a1a]" : "text-[#00FF88]"
          }`}
          style={{ fontFamily: "var(--font-serif-carnet), Georgia, serif" }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p
          className={`text-sm leading-relaxed mb-6 ${
            isPapier ? "text-[#666]" : "text-[#00FF88]/60"
          }`}
          style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
        >
          {article.excerpt}
        </p>

        {/* Meta */}
        <div
          className={`flex items-center gap-4 text-xs ${
            isPapier ? "text-[#888]" : "text-[#00FF88]/40"
          }`}
          style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
        >
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(article.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        {/* Decorative corner for Papier */}
        {isPapier && (
          <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#1a1a1a] origin-bottom-right -rotate-45 translate-y-8 translate-x-8 group-hover:translate-y-6 group-hover:translate-x-6 transition-transform" />
          </div>
        )}
      </article>
    </Link>
  )
}

export function CardGrid() {
  const { theme } = useCarnetTheme()
  const isPapier = theme === "papier"

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2
              className={`text-2xl sm:text-3xl mb-2 ${
                isPapier ? "text-[#1a1a1a]" : "text-[#00FF88]"
              }`}
              style={{ fontFamily: "var(--font-serif-carnet), Georgia, serif" }}
            >
              Transmissions Récentes
            </h2>
            <p
              className={`text-sm ${isPapier ? "text-[#666]" : "text-[#00FF88]/60"}`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              Fragments d{"'"}expérimentations et réflexions
            </p>
          </div>

          {/* Filter indicator */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider ${
              isPapier
                ? "border-2 border-[#1a1a1a] text-[#1a1a1a]"
                : "border border-[#00FF88]/50 text-[#00FF88]"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            <span className={`w-2 h-2 ${isPapier ? "bg-[#1a1a1a]" : "bg-[#00FF88]"}`} />
            Tous les sujets
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button
            className={`inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-wider transition-all ${
              isPapier
                ? "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FDFCF0]"
                : "border border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-[#050505] neon-border"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            Charger plus de transmissions
            <span className={isPapier ? "text-[#666]" : "text-[#00FF88]/50"}>
              [+6]
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
