import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "RCS Teknoloji - Research & Creative Solutions Technology",
  description: "Yeniliğin sınırlarını zorlayan AR-GE firması olarak, mühendislik dünyasında devrim yaratan ParametriX AI ile CAD süreçlerini dönüştürüyoruz.",
  keywords: ["ParametriX", "CAD", "SolidWorks", "Yapay Zeka", "AI", "Mühendislik", "Tasarım"],
  authors: [{ name: "RCS Teknoloji" }],
  openGraph: {
    title: "RCS Teknoloji - ParametriX AI",
    description: "Yapay zeka destekli CAD otomasyon platformu",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

