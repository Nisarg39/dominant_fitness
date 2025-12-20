import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Oswald, Rajdhani, Caveat, Roboto } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "DOMINATE — Built for Sport Performance",
    template: "%s | DOMINATE Sport Performance"
  },
  description: "Elite performance isn't a privilege — it's a process. Professional sports performance training and coaching for athletes of all levels. UKSCA certified coaching with evidence-based training methods.",
  keywords: [
    "sports performance",
    "athlete training",
    "strength and conditioning",
    "sports coaching",
    "fitness training",
    "athlete development",
    "performance testing",
    "sports science",
    "UKSCA certified",
    "elite performance",
    "sport performance training",
    "athletic development",
    "performance coaching"
  ],
  authors: [{ name: "DOMINATE Performance" }],
  creator: "DOMINATE Performance",
  publisher: "DOMINATE Performance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    siteName: 'DOMINATE Sport Performance',
    title: 'DOMINATE — Built for Sport Performance',
    description: 'Elite performance isn\'t a privilege — it\'s a process. Professional sports performance training and coaching for athletes of all levels.',
    images: [
      {
        url: '/images/og-image.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'DOMINATE Sport Performance Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOMINATE — Built for Sport Performance',
    description: 'Elite performance isn\'t a privilege — it\'s a process. Professional sports performance training and coaching.',
    images: ['/images/twitter-image.jpg'], // You'll need to create this image
    creator: '@dominateperformance', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.ico?v=2", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon-32x32.ico?v=2", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico?v=2", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.ico?v=2", sizes: "180x180", type: "image/x-icon" }
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" }
    ]
  },
  manifest: "/site.webmanifest",
  category: 'sports',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${oswald.variable} ${rajdhani.variable} ${caveat.variable} ${roboto.variable} antialiased`}
      >
        <StructuredData type="Organization" />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
