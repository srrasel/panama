import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/sonner"
import { LoadingProvider } from "@/components/providers/loading-provider"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Navigation from "@/components/navigation"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pamavambo - Modern Learning Platform",
  description: "Transform your education with our modern learning management system",
  generator: "Pamavambo",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={null}>
          <LoadingProvider>
            <NextTopLoader color="#7c3aed" showSpinner={false} />
            
            {children}
            <Analytics />
            <Toaster />
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  )
}
