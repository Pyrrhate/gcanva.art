import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/carnet/navigation"
import { ArticleHeader } from "@/components/carnet/article-header"
import { ArticleBody } from "@/components/carnet/article-body"
import { Footer } from "@/components/carnet/footer"
import { articles, getArticleBySlug, type Article } from "@/lib/articles"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Article introuvable" }

  return {
    title: `${article.title} | Carnet`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Find next/prev articles
  const currentIndex = articles.findIndex((a) => a.slug === slug)
  const prevArticle: Article | undefined = currentIndex > 0 ? articles[currentIndex - 1] : undefined
  const nextArticle: Article | undefined = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : undefined

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ArticleHeader article={article} />

      {/* Article content */}
      <article className="px-6 py-12 md:px-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <ArticleBody article={article} />
        </div>
      </article>

      {/* Article navigation */}
      <nav className="border-t border-border" aria-label="Navigation entre articles">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Previous */}
          {prevArticle ? (
            <Link
              href={`/article/${prevArticle.slug}`}
              className="group flex items-center gap-4 px-6 py-8 md:px-12 border-b md:border-b-0 md:border-r border-border hover:bg-card transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
              <div className="min-w-0">
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">
                  Precedent
                </span>
                <span className="font-serif italic text-lg truncate block">
                  {prevArticle.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block border-r border-border" />
          )}

          {/* Next */}
          {nextArticle ? (
            <Link
              href={`/article/${nextArticle.slug}`}
              className="group flex items-center justify-end gap-4 px-6 py-8 md:px-12 hover:bg-card transition-colors text-right"
            >
              <div className="min-w-0">
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">
                  Suivant
                </span>
                <span className="font-serif italic text-lg truncate block">
                  {nextArticle.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to feed */}
        <div className="border-t border-border px-6 py-6 md:px-12 flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Retour au Carnet
          </Link>
        </div>
      </nav>

      <Footer />
    </main>
  )
}
