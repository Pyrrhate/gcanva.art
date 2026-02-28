import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Article | Carnet",
  description: "Fragments d'expérimentations et réflexions de l'Underground Alchemist.",
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
