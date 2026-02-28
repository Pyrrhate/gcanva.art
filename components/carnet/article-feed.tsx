"use client"

import { useState } from "react"
import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { ArticleCard, type Article } from "./article-card"
import { CategoryFilter } from "./category-filter"
import { cn } from "@/lib/utils"

// Sample articles data
const SAMPLE_ARTICLES: Article[] = [
  {
    slug: "transmutation-du-pixel",
    title: "Transmutation du Pixel",
    excerpt: "Explorer les frontières entre le code et l'art visuel. Comment les algorithmes peuvent-ils devenir des pinceaux numériques?",
    category: "Théorie",
    date: "28.02.26",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "glitch-comme-medium",
    title: "Le Glitch Comme Médium",
    excerpt: "L'erreur n'est pas un bug, c'est une feature. Manifeste pour une esthétique de l'imprévu et du chaos contrôlé.",
    category: "Manifeste",
    date: "25.02.26",
    readTime: "8 min",
  },
  {
    slug: "cartographie-du-vide",
    title: "Cartographie du Vide",
    excerpt: "Notes sur l'espace négatif dans le design d'interface. Ce qui n'est pas là définit ce qui l'est.",
    category: "Étude",
    date: "22.02.26",
    readTime: "4 min",
  },
  {
    slug: "machines-qui-revent",
    title: "Machines qui Rêvent",
    excerpt: "Quand l'IA génère des images, que se passe-t-il dans les couches cachées? Voyage au cœur des réseaux de neurones.",
    category: "Exploration",
    date: "18.02.26",
    readTime: "12 min",
    featured: true,
  },
  {
    slug: "typographie-quantique",
    title: "Typographie Quantique",
    excerpt: "Les lettres existent-elles avant d'être observées? Réflexions sur la superposition des formes typographiques.",
    category: "Expérience",
    date: "15.02.26",
    readTime: "6 min",
  },
  {
    slug: "noir-absolu",
    title: "Noir Absolu #000000",
    excerpt: "Une méditation sur la couleur la plus profonde. Pourquoi le vrai noir n'existe pas sur nos écrans.",
    category: "Méditation",
    date: "12.02.26",
    readTime: "3 min",
  },
  {
    slug: "anatomie-du-scroll",
    title: "Anatomie du Scroll",
    excerpt: "Le défilement infini comme métaphore de la quête humaine. Nous scrollons, donc nous sommes.",
    category: "Philosophie",
    date: "08.02.26",
    readTime: "7 min",
  },
  {
    slug: "frequences-cachees",
    title: "Fréquences Cachées",
    excerpt: "Le son du web: analyse des vibrations numériques que nous ne percevons jamais consciemment.",
    category: "Audio",
    date: "05.02.26",
    readTime: "9 min",
  },
]

export function ArticleFeed() {
  const { theme } = useCarnetTheme()
  const [activeCategory, setActiveCategory] = useState("Tous")

  const filteredArticles = activeCategory === "Tous" 
    ? SAMPLE_ARTICLES 
    : SAMPLE_ARTICLES.filter(article => article.category === activeCategory)

  return (
    <section className="pb-24">
      {/* Section Header */}
      <div className={cn(
        "flex items-center gap-4 mb-8 pb-4 px-6 md:px-12 border-b-2 border-border",
        theme === "papier" && "border-dashed"
      )}>
        <span className={cn(
          "font-mono text-xs tracking-[0.3em] uppercase",
          theme === "vectrex" && "text-accent"
        )}>
          Archives
        </span>
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-xs text-muted-foreground">
          {filteredArticles.length} entrées
        </span>
      </div>

      {/* Category Filter */}
      <CategoryFilter onFilterChange={setActiveCategory} />

      {/* Masonry Grid */}
      <div className={cn(
        "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 px-6 md:px-12",
        "[column-fill:balance]"
      )}>
        {filteredArticles.map((article, index) => (
          <div 
            key={article.slug} 
            className="mb-6 break-inside-avoid"
          >
            <ArticleCard article={article} index={index} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className={cn(
          "text-center py-24 px-6",
          "font-mono text-sm text-muted-foreground"
        )}>
          Aucun article dans cette catégorie.
        </div>
      )}

      {/* Load More (decorative) */}
      {filteredArticles.length > 0 && (
        <div className="mt-16 flex justify-center px-6">
          <button className={cn(
            "px-8 py-3 border-2 border-border font-mono text-xs tracking-widest uppercase",
            "transition-all duration-300",
            theme === "papier" && "rough-border hover:bg-secondary hover:-rotate-1",
            theme === "vectrex" && "hover:neon-border"
          )}>
            Charger plus
          </button>
        </div>
      )}
    </section>
  )
}

export { SAMPLE_ARTICLES }
