import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import { Cairo, Playfair_Display } from "next/font/google";
import "../globals.css";
import { RootLayoutClient } from "@/components/layout/root-layout";

// const displayFont = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-classimo-english",
//   display: "swap",
// });

// const arabicFont = Cairo({
//   subsets: ["arabic"],
//   weight: ["400", "600", "700"],
//   variable: "--font-classimo-arabic",
//   display: "swap",
// });

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const locale = params.locale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`antialiased text-white`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
