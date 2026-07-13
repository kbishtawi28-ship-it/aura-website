import type { Metadata } from "next";
import { Geist, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "AURA — Powerful Hold. Pure Hydration.",
  description:
    "AURA is a premium 40oz stainless steel water bottle with an integrated MagSafe magnetic ring, superior thermal control, and a leak-proof design. Launch offer: first 10 orders at 15 JOD.",
  openGraph: {
    title: "AURA — Powerful Hold. Pure Hydration.",
    description:
      "Premium stainless steel bottle with an integrated MagSafe magnetic ring and superior thermal control.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bebas.variable}`}
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
