"use client"

import { CarnetThemeProvider } from "@/components/carnet/carnet-theme-context"
import { CarnetThemeWrapper } from "@/components/carnet/carnet-theme-wrapper"
import { CarnetNavigation } from "@/components/carnet/carnet-navigation"
import { CarnetFooter } from "@/components/carnet/carnet-footer"
import { ArticleContent } from "./article-content"
import { use } from "react"

// Mock data - in production, this would come from a CMS
const articles: Record<string, {
  title: string
  date: string
  category: string
  content: string
  readTime: string
}> = {
  "transmutation-numerique": {
    title: "Transmutation Numerique : Du Code a l'Or Visuel",
    date: "28 Fevrier 2026",
    category: "Alchimie",
    readTime: "8 min",
    content: `
Le code est une matiere brute. Comme le plomb des anciens alchimistes, il attend d'etre transforme.

## L'Athanor Numerique

Dans mon laboratoire — un ecran, un clavier, et des heures de silence — je pratique une forme moderne d'alchimie. Chaque ligne de code est un ingredient, chaque fonction une formule secrete.

> "La vraie magie n'est pas dans l'effet final, mais dans le processus de transformation."

Le developpement web, quand il est pratique avec intention, devient un acte de creation pure. Non pas une simple execution technique, mais une transmutation veritable.

## Les Trois Principes

1. **Soufre** — L'intention creative, le concept initial
2. **Mercure** — La fluidite du code, son adaptabilite
3. **Sel** — La structure, les fondations techniques

Ces trois elements doivent s'equilibrer. Trop de concept sans technique produit des chimeres non-fonctionnelles. Trop de technique sans vision produit des interfaces steriles.

## La Pierre Philosophale du Web

Ce que je cherche, c'est ce moment precis ou le code cesse d'etre du code. Ce moment ou les lignes de JavaScript deviennent mouvement. Ou le CSS devient emotion. Ou le HTML devient architecture vivante.

\`\`\`javascript
const transmute = (rawCode) => {
  const purified = refine(rawCode);
  const elevated = transcend(purified);
  return gold(elevated);
};
\`\`\`

L'or numerique n'est pas dans la complexite, mais dans la clarte. Dans cette capacite a faire disparaitre la technologie derriere l'experience.

## Conclusion

Chaque projet est une experience alchimique. Certains echouent — le plomb reste plomb. Mais parfois, rarement, la transformation se produit. Et ce qui emerge est plus que du code.

C'est de l'or.
    `.trim(),
  },
  "grilles-invisibles": {
    title: "Les Grilles Invisibles",
    date: "25 Fevrier 2026",
    category: "Technique",
    readTime: "5 min",
    content: `
Les meilleures grilles sont celles qu'on ne voit pas.

## L'Ordre Cache

Derriere chaque interface reussie se cache un systeme. Une grille invisible qui organise le chaos visuel en harmonie structuree.

> "L'ordre n'est pas l'ennemi de la creativite — c'est son terrain de jeu."

## Briser pour Reconstruire

Le vrai travail commence quand on comprend les regles assez bien pour les transgresser.
    `.trim(),
  },
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const article = articles[resolvedParams.slug]

  if (!article) {
    return (
      <CarnetThemeProvider>
        <CarnetThemeWrapper>
          <CarnetNavigation />
          <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen flex items-center justify-center">
            <p className="font-mono text-sm">Article non trouve.</p>
          </main>
          <CarnetFooter />
        </CarnetThemeWrapper>
      </CarnetThemeProvider>
    )
  }

  return (
    <CarnetThemeProvider>
      <CarnetThemeWrapper>
        <CarnetNavigation />
        <ArticleContent article={article} />
        <CarnetFooter />
      </CarnetThemeWrapper>
    </CarnetThemeProvider>
  )
}
