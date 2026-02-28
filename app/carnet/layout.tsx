import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google"

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Carnet | Alchimie Digitale",
  description: "Un laboratoire ou les idees brutes se transforment en or numerique. Journal creatif de l'Underground Alchemist.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFCF0" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function CarnetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${ibmPlexMono.variable} ${instrumentSerif.variable}`}>
      {children}
    </div>
  )
}
