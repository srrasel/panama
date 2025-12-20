"use client"

import type React from "react"
import { ParentProvider } from "./ParentContext"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ParentProvider>
      {children}
    </ParentProvider>
  )
}
