import type { Metadata } from "next";
import { Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swatch Library — color token shelf",
  description: "Browse preset palettes and export as CSS, Tailwind, or JSON.",
  keywords: ["color","palette","css","tailwind","design"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  publisher: "Bookchaowalit",
  metadataBase: new URL("https://color-palettes.bookchaowalit.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Swatch Library — color token shelf",
    description: "Browse preset palettes and export as CSS, Tailwind, or JSON.",
    siteName: "Bookchaowalit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swatch Library — color token shelf",
    description: "Browse preset palettes and export as CSS, Tailwind, or JSON.",
    creator: "@bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dmMono.variable}`}>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
