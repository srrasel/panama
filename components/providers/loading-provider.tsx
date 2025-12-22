"use client"

import React, { createContext, useContext, useState, useEffect, Suspense } from "react"
import Preloader from "@/components/preloader"
import { usePathname, useSearchParams } from "next/navigation"

interface LoadingContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

function UrlListener({ stopLoading }: { stopLoading: () => void }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    stopLoading()
  }, [pathname, searchParams, stopLoading])

  return null
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {isLoading && <Preloader />}
      <Suspense fallback={null}>
        <UrlListener stopLoading={stopLoading} />
      </Suspense>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
