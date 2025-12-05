import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dav/Devs - Full Stack Developer Portfolio",
    template: "%s | Dav/Devs"
  },
  description: "Professional portfolio of Davina Leong, a full-stack developer specializing in modern web technologies, React, Next.js, and cloud solutions.",
  keywords: ["developer", "portfolio", "full-stack", "React", "Next.js", "TypeScript", "web development", "programming"],
  authors: [{ name: "Davina Leong" }],
  creator: "Davina Leong",
  publisher: "Dav/Devs",
  metadataBase: new URL("https://davdevs.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davdevs.me",
    title: "Dav/Devs - Full Stack Developer Portfolio",
    description: "Professional portfolio of Davina Leong, a full-stack developer specializing in modern web technologies, React, Next.js, and cloud solutions.",
    siteName: "Dav/Devs",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Dav/Devs - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dav/Devs - Full Stack Developer Portfolio",
    description: "Professional portfolio of Davina Leong, a full-stack developer specializing in modern web technologies.",
    creator: "@davdevs", // Replace with your actual Twitter handle
    images: ["/og-image.jpg"], // Add your Twitter card image
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
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${montserrat.variable} antialiased min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
