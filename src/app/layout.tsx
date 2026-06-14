import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/lib/AuthContext"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CloudNine - Fly Above The Rest",
  description: "Book flights worldwide with CloudNine Airways",
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