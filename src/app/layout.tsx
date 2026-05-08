import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import BrandIntro from "@/components/BrandIntro";
import PageTransition from "@/components/PageTransition";
import Cursor from "@/components/Cursor";
import MotionDebug from "@/components/MotionDebug";

export const metadata: Metadata = {
  title: "76 Graphics | Large Format Graphics Solutions",
  description:
    "76 Graphics delivers premium large format graphics solutions — vehicle wraps, architectural graphics, brand activations, and more. Request a quote today.",
  keywords: "vehicle wraps, large format printing, architectural graphics, brand activation, 76 Graphics",
  icons: {
    icon: "/logos/76Graphics_BrandMark-FullColor.svg",
    shortcut: "/logos/76Graphics_BrandMark-FullColor.svg",
    apple: "/logos/76Graphics_BrandMark-FullColor.svg",
  },
  openGraph: {
    title: "76 Graphics | Large Format Graphics Solutions",
    description: "Premium large format graphics for vehicles, buildings, events, and brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <MotionDebug />
        <Cursor />
        <BrandIntro />
        <PageTransition>{children}</PageTransition>
        {/* HubSpot tracking — drops the hutk cookie so form submissions pass spam filtering */}
        <Script
          id="hs-script-loader"
          src="//js-na2.hs-scripts.com/242669442.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
