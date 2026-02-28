import type { Metadata } from "next"
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google"
import { CarnetThemeProvider } from "./context/theme-context"
import "./carnet.css"

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono-carnet",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif-carnet",
})

export const metadata: Metadata = {
  title: "Carnet | Alchimie Digitale",
  description: "Un laboratoire où le code devient matière première et les pixels, pigments d'une nouvelle réalité.",
}

export default function CarnetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CarnetThemeProvider>
      <div className={`${ibmPlexMono.variable} ${playfairDisplay.variable}`}>
        {children}
      </div>
    </CarnetThemeProvider>
  )
}
