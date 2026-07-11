import type { Metadata, Viewport } from "next";
import { Outfit, Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zavro.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zavro Solutions Pte Ltd — AI-Native Growth Partner | Singapore",
    template: "%s | Zavro Solutions",
  },
  applicationName: "Zavro Solutions",
  description:
    "Zavro is a Singapore-based growth and IT partner for founders and CMOs — website development, branding, marketing, and AI automation engineered as one compounding system.",
  keywords: [
    "AI automation",
    "website development",
    "branding",
    "marketing agency",
    "Singapore",
    "AI receptionist",
    "business process automation",
    "CRM solutions",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Zavro Solutions",
    title: "Zavro Solutions — AI-Native Growth Partner",
    description:
      "Brand, web, marketing and AI automation engineered as one compounding system. Based in Singapore, working worldwide.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Zavro Solutions Pte Ltd — Digital Growth & IT Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zavro Solutions — AI-Native Growth Partner",
    description:
      "Brand, web, marketing and AI automation engineered as one compounding system.",
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#02040A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-background ${outfit.variable} ${unbounded.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
