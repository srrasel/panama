"use client"

import LibraryView from "@/components/library/library-view"

export default function TeacherLibrary() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Online Library</h1>
          <p className="text-sm text-muted-foreground">Manage and share resources with students and parents</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 min-h-[600px]">
        <LibraryView currentUserRole="teacher" />
      </div>
    </div>
  )
}
