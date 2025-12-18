"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Child = {
  id: string
  name: string
  email: string
  // add other fields if needed
}

type ParentContextType = {
  childrenList: Child[]
  selectedChild: Child | null
  setSelectedChild: (child: Child) => void
  isLoading: boolean
  refreshChildren: () => Promise<void>
}

const ParentContext = createContext<ParentContextType>({
  childrenList: [],
  selectedChild: null,
  setSelectedChild: () => {},
  isLoading: true,
  refreshChildren: async () => {},
})

export const useParent = () => useContext(ParentContext)

export function ParentProvider({ children }: { children: React.ReactNode }) {
  const [childrenList, setChildrenList] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/parent/children")
      const data = await res.json()
      if (data.children) {
        setChildrenList(data.children)
        // If no child selected yet, select first. 
        // If child selected but not in new list (unlikely unless removed), handle that?
        // For now, keep selection logic simple.
        if (!selectedChild && data.children.length > 0) {
           const savedId = localStorage.getItem("selectedChildId")
           const found = data.children.find((c: any) => c.id === savedId)
           setSelectedChild(found || data.children[0])
        }
      }
    } catch (err) {
      console.error("Failed to fetch children:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChildren()
  }, [])

  const handleSetChild = (child: Child) => {
    setSelectedChild(child)
    localStorage.setItem("selectedChildId", child.id)
  }

  return (
    <ParentContext.Provider
      value={{
        childrenList,
        selectedChild,
        setSelectedChild: handleSetChild,
        isLoading,
        refreshChildren: fetchChildren
      }}
    >
      {children}
    </ParentContext.Provider>
  )
}
