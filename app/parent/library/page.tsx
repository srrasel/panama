"use client"

import LibraryView from "@/components/library/library-view"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"

export default function ParentLibrary() {
  return (
    <ParentPortalLayout
      title="Online Library"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: "Library" }
      ]}
    >
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 min-h-[600px]">
        <LibraryView currentUserRole="parent" />
      </div>
    </ParentPortalLayout>
  )
}
