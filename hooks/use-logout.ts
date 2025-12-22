"use client"

import { useRouter } from "next/navigation"
import { useLoading } from "@/components/providers/loading-provider"

export function useLogout() {
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()

  const logout = async () => {
    startLoading()
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      
      // Clear all local storage to ensure no stale data
      if (typeof window !== "undefined") {
        localStorage.clear()
        sessionStorage.clear()
      }
      
      router.push("/login")
      router.refresh()
      
      // Note: stopLoading is not called here because LoadingProvider 
      // automatically handles it when the pathname changes.
    } catch (error) {
      console.error("Logout failed:", error)
      stopLoading()
    }
  }

  return logout
}
