import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HSA vs FSA Calculator 2026 | Open Enrollment Optimizer",
    template: "%s | HSA/FSA Optimizer 2026",
  },
  description:
    "Calculate the optimal mix of HSA, Health FSA, and Dependent Care FSA contributions to maximize your federal tax savings for the 2026 benefits year. Free, private, and easy to use.",
  keywords: [
    "HSA calculator",
    "FSA calculator",
    "HSA vs FSA",
    "open enrollment 2026",
    "tax savings calculator",
    "health savings account",
    "flexible spending account",
    "HDHP",
    "dependent care FSA",
    "benefits enrollment",
  ],
  authors: [{ name: "HSA/FSA Optimizer" }],
  creator: "HSA/FSA Optimizer",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "HSA vs FSA Calculator 2026 | Open Enrollment Optimizer",
    description:
      "Find the optimal mix of HSA, Health FSA, and Dependent Care FSA to maximize your federal tax savings. Free calculator with 2026 IRS limits.",
    siteName: "HSA/FSA Optimizer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HSA/FSA Optimizer 2026 - Maximize Your Tax Savings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HSA vs FSA Calculator 2026 | Open Enrollment Optimizer",
    description:
      "Calculate the optimal HSA and FSA contributions to maximize your tax savings for 2026.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="flex min-h-full flex-col bg-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
