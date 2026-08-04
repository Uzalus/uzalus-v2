import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/lib/i18n-context";

export const metadata: Metadata = {
  title: "UZALUS — Boutique en Ligne Premium | Cosmétiques, Parfums, Mode, Électronique",
  description:
    "UZALUS — Votre destination premium en ligne. Cosmétiques, parfums, mode, chaussures, électronique, maison et accessoires. Soins anti-âge, anti-boutons, points noirs, peau lisse. Livraison rapide, paiement sécurisé.",
  keywords: [
    "UZALUS",
    "e-commerce",
    "boutique en ligne",
    "cosmétiques",
    "parfums",
    "mode",
    "chaussures",
    "électronique",
    "maison",
    "accessoires",
    "beauté",
    "soins peau",
    "anti-âge",
    "anti-boutons",
    "points noirs",
    "premium",
    "luxury",
    "online shopping",
    "paiement sécurisé",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛍️</text></svg>",
  },
  openGraph: {
    title: "UZALUS — Boutique en Ligne Premium",
    description: "Cosmétiques, parfums, mode, chaussures, électronique, maison et accessoires. Votre destination premium en ligne.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "es_ES", "ar_SA"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-noir text-foreground min-h-screen">
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}