import type { Metadata, Viewport } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { LanguageGate } from "@/components/language-gate"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AURA — Powerful Hold. Pure Hydration.",
  description:
    "AURA premium insulated water bottles with an integrated magnetic ring holder. 40oz capacity, 304 stainless steel, superior thermal control.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased">
        <LanguageGate>{children}</LanguageGate>
      </body>
    </html>
  )
}
