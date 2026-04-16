import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { LoadingProvider } from "@/components/providers/loading-provider"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

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
      <body className={`${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <LoadingProvider>
            {children}
            <Toaster />
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  )
}
