import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Background from "@/components/Background";
import SiteFooter from "@/components/SiteFooter";
import ThemeProvider from "@/components/ThemeProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import GlobalPlayer from "@/components/audio/GlobalPlayer";
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