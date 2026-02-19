import type { Metadata } from "next";
import { Caveat, Inter, Playfair_Display } from "next/font/google";
import Background from "@/components/Background";
import SiteFooter from "@/components/SiteFooter";
import ThemeProvider from "@/components/ThemeProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import GlobalPlayer from "@/components/audio/GlobalPlayer";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-brand-hand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gcanva.art"),
  title: "gcanva.art — Digital Garden",
  description: "A curated space for creative expressions, images, music, and events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${playfair.variable} ${caveat.variable} antialiased`}
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