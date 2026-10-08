import type { Metadata } from "next"
import { Space_Grotesk, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { jsonLd, site } from "./site"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · gcanva.art",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
