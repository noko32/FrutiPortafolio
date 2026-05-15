import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://fruti-portafolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pablo Armenta — Full-Stack Engineer",
  description:
    "Full-stack engineer based in Guadalajara with 4.5 years building products used by 500K+ people. React, TypeScript, Next.js, and performance-focused.",
  keywords: [
    "Pablo Armenta",
    "software engineer",
    "full-stack developer",
    "React",
    "TypeScript",
    "Next.js",
    "Guadalajara",
    "frontend engineer",
    "portfolio",
  ],
  authors: [{ name: "Pablo Armenta", url: SITE_URL }],
  creator: "Pablo Armenta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Pablo Armenta",
    title: "Pablo Armenta — Full-Stack Engineer",
    description:
      "Full-stack engineer with 4.5 years building products used by 500K+ people. React, TypeScript, Next.js, and performance-focused.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Armenta — Full-Stack Engineer",
    description:
      "Full-stack engineer with 4.5 years building products used by 500K+ people. React, TypeScript, Next.js, and performance-focused.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
