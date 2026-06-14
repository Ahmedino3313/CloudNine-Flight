import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/lib/AuthContext"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "CloudNine — Fly Above The Rest",
    template: "%s | CloudNine"
  },
  description: "Search and book flights to over 500 destinations worldwide with CloudNine. Fast, easy and affordable flight booking.",
  keywords: ["flight booking", "cheap flights", "book flights", "CloudNine", "travel", "airlines"],
  authors: [{ name: "CloudNine" }],
  creator: "CloudNine",
  metadataBase: new URL("https://cloudnine-flight.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudnine-flight.vercel.app",
    siteName: "CloudNine",
    title: "CloudNine — Fly Above The Rest",
    description: "Search and book flights to over 500 destinations worldwide. Fast, easy and affordable.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CloudNine Flight Booking",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudNine — Fly Above The Rest",
    description: "Search and book flights to over 500 destinations worldwide.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          <div id="main-content">
            {children}
          </div>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "#0a0a0a",
                border: "1px solid #E0E0E0",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                iconTheme: {
                  primary: "#E63946",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#E63946",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}