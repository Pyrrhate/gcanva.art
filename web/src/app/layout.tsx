import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Background from "@/components/Background";
import SiteFooter from "@/components/SiteFooter";
import ThemeProvider from "@/components/ThemeProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import GlobalPlayer from "@/components/audio/GlobalPlayer";
import { CARNET_URL, PORTAL_URL } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CARNET_URL),
  title: "Carnet de Guillaume Canva",
  description: "Dessins, peintures et expérimentations visuelles de Guillaume Canva, à Tournai.",
  authors: [{ name: "Guillaume Canva", url: PORTAL_URL }],
  creator: "Guillaume Canva",
  alternates: {
    types: {
      "application/rss+xml": `${CARNET_URL}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
    >
      <body
        className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <AudioProvider>
          <ThemeProvider
            attribute="data-theme"
            themes={["paper", "vectrex"]}
            defaultTheme="paper"
            storageKey="gcanva-theme"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Background />
            {children}
            <GlobalPlayer />
            <SiteFooter />
          </ThemeProvider>
        </AudioProvider>
      </body>
    </html>
  );
}