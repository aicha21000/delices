import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Import Google Fonts
import "./globals.css";

// Configure fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Les Délices Sucrés - Gâteaux Traditionnels",
  description: "Vente de gâteaux traditionnels orientaux et biscuits secs faits maison. Produits naturels.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
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
        {children}
      </body>
    </html>
  );
}
