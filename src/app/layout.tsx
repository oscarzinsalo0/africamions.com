import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.africamions.com'),
  title: {
    default: "Africamions - Camions et véhicules industriels pour l'Afrique",
    template: "%s | Africamions"
  },
  description: "Africamions - Camions et véhicules industriels neufs ou rénovés pour l'Afrique francophone. Exportateur direct usine. Marques HOWO et SHACMAN.",
  keywords: ["camions", "véhicules industriels", "Afrique", "HOWO", "SHACMAN", "benne", "tracteur", "import", "Chine"],
  authors: [{ name: "Africamions" }],
  creator: "Africamions",
  publisher: "Chongqing Chuanyu Ji International Trade Co., Ltd.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.africamions.com",
    siteName: "Africamions",
    title: "Africamions - Camions et véhicules industriels pour l'Afrique",
    description: "Camions et véhicules industriels neufs ou rénovés pour l'Afrique francophone. Exportateur direct usine.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Africamions - La qualité nous connecte"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Africamions - Camions et véhicules industriels",
    description: "Camions et véhicules industriels pour l'Afrique francophone",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
