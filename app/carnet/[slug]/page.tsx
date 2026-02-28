"use client"

import Link from "next/link"
import { useCarnetTheme } from "../context/theme-context"
import { Navigation } from "../components/navigation"
import { Footer } from "../components/footer"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from "lucide-react"

// Sample article content - in production this would come from a CMS
const articleData = {
  title: "Transmutation des Pixels",
  subtitle: "Explorer les frontières entre le code et l'art génératif",
  category: "Génératif",
  date: "2026-02-15",
  readTime: "8 min",
  author: "Underground Alchemist",
  content: `
    <p class="lead">Dans l'atelier numérique, chaque ligne de code est un coup de pinceau, chaque fonction une incantation qui transforme le vide en lumière. La programmation créative n'est pas seulement technique — c'est une forme de magie moderne.</p>
    
    <p>Les artistes génératifs travaillent avec des algorithmes comme d'autres travaillent avec des pigments. La différence ? Nos œuvres peuvent évoluer, muter, et parfois nous surprendre par leur autonomie.</p>
    
    <h2>La Philosophie du Pixel</h2>
    
    <p>Le pixel est l'atome de notre univers visuel numérique. Mais contrairement aux atomes physiques, nous pouvons le manipuler à volonté, le transformer, le multiplier à l'infini.</p>
    
    <blockquote>
      <p>"Le code n'est pas un outil, c'est un médium artistique à part entière — aussi expressif que l'huile ou le marbre, mais avec une dimension temporelle unique."</p>
      <cite>— Journal de l'Alchimiste, Entrée 47</cite>
    </blockquote>
    
    <p>Cette transformation perpétuelle est au cœur de ma pratique. Chaque projet commence par une question simple : que se passe-t-il si...?</p>
    
    <h2>Techniques de Transmutation</h2>
    
    <p>Voici quelques-unes des formules que j'utilise dans mon laboratoire numérique :</p>
    
    <pre><code>// Formule de base pour la génération de noise
function alchemicalNoise(x, y, time) {
  const frequency = 0.01;
  const amplitude = 255;
  
  return Math.sin(x * frequency + time) * 
         Math.cos(y * frequency - time) * 
         amplitude;
}</code></pre>
    
    <p>Cette simple fonction crée des motifs organiques qui semblent respirer. En la combinant avec d'autres techniques, les possibilités deviennent infinies.</p>
    
    <h2>L'Accident Comme Méthode</h2>
    
    <p>Contrairement à la programmation traditionnelle où les bugs sont des erreurs, en art génératif, ils peuvent devenir des découvertes. J'ai appris à cultiver ces accidents heureux.</p>
    
    <p>Les meilleurs résultats viennent souvent de l'inattendu — une variable mal typée, une boucle infinie interrompue au bon moment, un débordement de mémoire qui crée des artefacts visuels fascinants.</p>
    
    <h2>Conclusion : La Quête Continue</h2>
    
    <p>L'alchimie digitale n'a pas de pierre philosophale, pas de but final. C'est un processus perpétuel de transformation, d'expérimentation, et de découverte.</p>
    
    <p>Le prochain projet est toujours le plus important. La prochaine ligne de code pourrait révéler quelque chose de nouveau sur la nature de la création elle-même.</p>
  `,
}

function ArticleContent({ content, isPapier }: { content: string; isPapier: boolean }) {
  // Parse and render content with proper styling
  const processContent = (html: string) => {
    // This is simplified - in production use a proper HTML parser
    return html
      .replace(/<p class="lead">/g, `<p class="lead text-lg sm:text-xl leading-relaxed mb-8 ${isPapier ? 'text-[#333]' : 'text-[#00FF88]/90'}">`)
      .replace(/<p>/g, `<p class="mb-6 leading-relaxed ${isPapier ? 'text-[#444]' : 'text-[#00FF88]/70'}">`)
      .replace(/<h2>/g, `<h2 class="text-2xl sm:text-3xl mt-12 mb-6 ${isPapier ? 'text-[#1a1a1a]' : 'text-[#00FF88]'}" style="font-family: var(--font-serif-carnet), Georgia, serif;">`)
      .replace(/<blockquote>/g, `<blockquote class="my-8 pl-6 py-4 ${isPapier ? 'blockquote-papier bg-[#f5f4e8]' : 'blockquote-vectrex bg-[#0a0a0a]'}">`)
      .replace(/<blockquote>\s*<p>/g, `<blockquote class="my-8 pl-6 py-4 ${isPapier ? 'blockquote-papier bg-[#f5f4e8]' : 'blockquote-vectrex bg-[#0a0a0a]'}"><p class="text-lg italic mb-2 ${isPapier ? 'text-[#333]' : 'text-[#00FF88]'}">`)
      .replace(/<cite>/g, `<cite class="block text-sm not-italic mt-2 ${isPapier ? 'text-[#666]' : 'text-[#00FF88]/50'}">`)
      .replace(/<pre><code>/g, `<pre class="code-block ${isPapier ? 'code-block-papier' : 'code-block-vectrex'} p-4 sm:p-6 my-8 overflow-x-auto"><code>`)
  }

  return (
    <div
      className="article-content"
      style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  )
}

export default function ArticlePage() {
  const { theme, showBlueprint } = useCarnetTheme()
  const isPapier = theme === "papier"

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 ${
        isPapier
          ? "bg-[#FDFCF0] text-[#1a1a1a] papier-selection"
          : "bg-[#050505] text-[#00FF88] vectrex-selection"
      }`}
    >
      {/* Paper texture overlay for Papier theme */}
      {isPapier && (
        <div className="fixed inset-0 pointer-events-none paper-texture" />
      )}

      {/* Scanlines for Vectrex theme */}
      {!isPapier && (
        <div className="fixed inset-0 pointer-events-none scanlines" />
      )}

      {/* Blueprint grid overlay */}
      {showBlueprint && (
        <div
          className={`fixed inset-0 pointer-events-none ${
            isPapier ? "blueprint-grid" : "vectrex-blueprint-grid"
          }`}
        />
      )}

      <Navigation />

      <main className="pt-24 pb-16">
        {/* Back Link */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-8">
          <Link
            href="/carnet"
            className={`inline-flex items-center gap-2 text-sm transition-colors ${
              isPapier
                ? "text-[#666] hover:text-[#1a1a1a]"
                : "text-[#00FF88]/60 hover:text-[#00FF88]"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au Carnet
          </Link>
        </div>

        {/* Article Header */}
        <header className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-12">
          {/* Category */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-wider mb-6 ${
              isPapier
                ? "bg-[#1a1a1a] text-[#FDFCF0]"
                : "border border-[#00FF88] text-[#00FF88]"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            <Tag className="w-3 h-3" />
            {articleData.category}
          </span>

          {/* Title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 ${
              isPapier ? "text-[#1a1a1a]" : "text-[#00FF88] neon-glow"
            }`}
            style={{ fontFamily: "var(--font-serif-carnet), Georgia, serif" }}
          >
            {articleData.title}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl mb-8 ${
              isPapier ? "text-[#666]" : "text-[#00FF88]/60"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            {articleData.subtitle}
          </p>

          {/* Meta Info */}
          <div
            className={`flex flex-wrap items-center gap-4 sm:gap-6 text-xs ${
              isPapier ? "text-[#888]" : "text-[#00FF88]/40"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(articleData.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {articleData.readTime} de lecture
            </span>
            <span className={isPapier ? "text-[#1a1a1a]" : "text-[#00FF88]"}>
              {articleData.author}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-8">
            <button
              className={`p-2 transition-all ${
                isPapier
                  ? "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FDFCF0]"
                  : "border border-[#00FF88]/50 text-[#00FF88] hover:border-[#00FF88] hover:bg-[#00FF88] hover:text-[#050505]"
              }`}
              aria-label="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              className={`p-2 transition-all ${
                isPapier
                  ? "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FDFCF0]"
                  : "border border-[#00FF88]/50 text-[#00FF88] hover:border-[#00FF88] hover:bg-[#00FF88] hover:text-[#050505]"
              }`}
              aria-label="Sauvegarder"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Separator */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-12">
          <div
            className={`h-px ${isPapier ? "bg-[#1a1a1a]/20" : "bg-[#00FF88]/20"}`}
          />
        </div>

        {/* Article Content */}
        <article className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          {/* Drop Cap First Paragraph */}
          <div
            className={`drop-cap ${isPapier ? "drop-cap-papier" : "drop-cap-vectrex"} mb-8 leading-relaxed ${
              isPapier ? "text-[#444]" : "text-[#00FF88]/70"
            }`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            Dans l{"'"}atelier numérique, chaque ligne de code est un coup de pinceau, chaque fonction une incantation qui transforme le vide en lumière. La programmation créative n{"'"}est pas seulement technique — c{"'"}est une forme de magie moderne.
          </div>

          <ArticleContent content={articleData.content} isPapier={isPapier} />
        </article>

        {/* Article Footer */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-16">
          <div
            className={`p-6 sm:p-8 ${
              isPapier
                ? "rough-border bg-[#f5f4e8]"
                : "border border-[#00FF88]/30 bg-[#0a0a0a]"
            }`}
          >
            <p
              className={`text-sm mb-4 ${isPapier ? "text-[#666]" : "text-[#00FF88]/60"}`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              Continuer l{"'"}exploration
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/carnet"
                className={`flex-1 text-center px-4 py-3 text-sm uppercase tracking-wider transition-all ${
                  isPapier
                    ? "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FDFCF0]"
                    : "border border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-[#050505]"
                }`}
                style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
              >
                Tous les articles
              </Link>
              <Link
                href="/carnet/rituels-interface"
                className={`flex-1 text-center px-4 py-3 text-sm uppercase tracking-wider transition-all ${
                  isPapier
                    ? "bg-[#1a1a1a] text-[#FDFCF0] hover:bg-[#333]"
                    : "bg-[#00FF88] text-[#050505] hover:bg-[#00FFFF]"
                }`}
                style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
              >
                Article suivant →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
