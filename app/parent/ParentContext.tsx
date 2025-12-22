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
        
        let childToSelect = selectedChild;

        // If we have a selected child, verify it still exists in the new list
        if (childToSelect) {
            const stillExists = data.children.find((c: any) => c.id === childToSelect?.id);
            if (!stillExists) {
                childToSelect = null; // Child removed or invalid, force re-selection
            } else {
                childToSelect = stillExists; // Update with fresh data
            }
        }

        // If no valid selection yet, try localStorage or default to first child
        if (!childToSelect && data.children.length > 0) {
           const savedId = localStorage.getItem("selectedChildId")
           // Only use savedId if it actually exists in the fetched children list
           const found = savedId ? data.children.find((c: any) => c.id === savedId) : null
           childToSelect = found || data.children[0]
        }
        
        // If list is empty, ensure selection is null
        if (data.children.length === 0) {
            childToSelect = null;
        }

        setSelectedChild(childToSelect);
        
        // Update localStorage to reflect the actual selection (or clear it if null)
        if (childToSelect) {
             localStorage.setItem("selectedChildId", childToSelect.id)
        } else {
             localStorage.removeItem("selectedChildId")
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
