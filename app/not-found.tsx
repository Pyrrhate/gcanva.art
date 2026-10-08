import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-background px-6 py-24 text-foreground md:px-12">
      <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">Erreur 404</p>
      <h1 className="mt-4 font-serif text-5xl italic md:text-6xl">Cette page n’existe pas</h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
        Le lien est peut-être ancien, ou l’adresse a été mal saisie. L’Interstice est sur la page d’accueil.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 w-fit items-center border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
      >
        Retour à l’accueil
      </Link>
    </main>
  )
}
