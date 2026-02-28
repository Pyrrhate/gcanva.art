"use client"

import { CarnetThemeProvider } from "@/components/carnet/carnet-theme-context"
import { CarnetThemeWrapper } from "@/components/carnet/carnet-theme-wrapper"
import { CarnetNavigation } from "@/components/carnet/carnet-navigation"
import { CarnetFooter } from "@/components/carnet/carnet-footer"
import { ArticleCard } from "@/components/carnet/article-card"
import { HeroSection } from "./hero-section"

// Mock data for articles
const articles = [
  {
    slug: "transmutation-numerique",
    title: "Transmutation Numerique : Du Code a l'Or Visuel",
    excerpt: "Explorer les frontieres entre le code brut et l'expression artistique. Comment le developpement web devient un acte de creation pure.",
    date: "28.02.2026",
    category: "Alchimie",
    featured: true,
  },
  {
    slug: "grilles-invisibles",
    title: "Les Grilles Invisibles",
    excerpt: "Deconstruire les systemes de mise en page pour mieux les reconstruire.",
    date: "25.02.2026",
    category: "Technique",
  },
  {
    slug: "couleurs-primordiales",
    title: "Couleurs Primordiales",
    excerpt: "Une exploration des palettes qui transcendent les tendances.",
    date: "20.02.2026",
    category: "Visuel",
  },
  {
    slug: "typographie-vivante",
    title: "Typographie Vivante",
    excerpt: "Quand les lettres respirent et les mots dansent sur l'ecran.",
    date: "15.02.2026",
    category: "Typographie",
  },
  {
    slug: "interfaces-organiques",
    title: "Interfaces Organiques",
    excerpt: "L'UI comme un organisme vivant : mutations, adaptations, evolutions.",
    date: "10.02.2026",
    category: "UX",
  },
  {
    slug: "code-poetique",
    title: "Code Poetique",
    excerpt: "Ecrire du code comme on ecrit de la poesie. La beaute dans la syntaxe.",
    date: "05.02.2026",
    category: "Dev",
  },
]

export default function CarnetPage() {
  return (
    <CarnetThemeProvider>
      <CarnetThemeWrapper>
        <CarnetNavigation />
        
        <main className="pt-20">
          <HeroSection />

          {/* Feed Grid */}
          <section className="px-6 md:px-12 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    {...article}
                    featured={index === 0}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        <CarnetFooter />
      </CarnetThemeWrapper>
    </CarnetThemeProvider>
  )
}
