import type { Metadata } from "next"
import { CarnetThemeProvider } from "./context/theme-context"
import "./carnet.css"

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
      {children}
    </CarnetThemeProvider>
  )
}
