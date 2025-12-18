"use client"

import { useParent } from "./ParentContext"
import { Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChildSwitcher({ collapsed }: { collapsed: boolean }) {
  const { childrenList, selectedChild, setSelectedChild, isLoading } = useParent()

  if (isLoading) return <div className="animate-pulse h-10 w-full bg-muted rounded-lg" />
  if (childrenList.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className={`mb-3 text-xs uppercase text-muted-foreground ${collapsed ? "hidden" : "block"}`}>
        Selected Student
      </h3>
      <div className={collapsed ? "flex justify-center" : ""}>
        {collapsed ? (
           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary" title={selectedChild?.name}>
             {selectedChild?.name.charAt(0).toUpperCase()}
           </div>
        ) : (
          <Select
            value={selectedChild?.id}
            onValueChange={(val) => {
              const child = childrenList.find((c) => c.id === val)
              if (child) setSelectedChild(child)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Child">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">
                    {selectedChild?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate">{selectedChild?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {childrenList.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                     <span>{child.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}
