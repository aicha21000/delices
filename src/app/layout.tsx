import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Import Google Fonts
import "./globals.css";

// Configure fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Les Délices Sucrés - Gâteaux Traditionnels",
  description: "Vente de gâteaux traditionnels orientaux et biscuits secs faits maison. Produits naturels.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Les Délices Sucrés - Gâteaux Traditionnels",
    description: "Vente de gâteaux traditionnels orientaux et biscuits secs faits maison. Produits naturels.",
    url: '/',
    siteName: 'Les Délices Sucrés',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
