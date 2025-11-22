import type { Metadata } from "next";
import { Playfair_Display, Tajawal } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "@/components/layout/root-layout";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

const arabicFont = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-ar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Classimo – كراء و بيع كوستيم الأفراح",
  description:
    "Classimo، علامة جزائرية متخصصة في كراء وبيع كوستيم الأفراح للعرسان وضيوفهم مع خدمة فاخرة.",
  metadataBase: new URL("https://classimo.example.com"),
  openGraph: {
    title: "Classimo – كراء و بيع كوستيم الأفراح",
    description:
      "إطلالات ذهبية داكنة للعرسان وضيوفهم مع تجربة كراء وبيع متكاملة في الجزائر.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${displayFont.variable} ${arabicFont.variable} antialiased text-white`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
