import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carnet : Alchimie Digitale | Underground Alchemist',
  description: 'Un laboratoire où le code rencontre l\'art, où chaque pixel est une formule, et où l\'expérimentation perpétuelle forge de nouvelles réalités numériques.',
  openGraph: {
    title: 'Carnet : Alchimie Digitale',
    description: 'Un laboratoire où le code rencontre l\'art, où chaque pixel est une formule.',
    type: 'website',
  },
}

export default function CarnetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
