"use client"

import LibraryView from "@/components/library/library-view"
import StudentPortalLayout from "@/components/student/student-portal-layout"

export default function StudentLibrary() {
  return (
    <StudentPortalLayout
      title="Online Library"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Library" }
      ]}
    >
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 min-h-[600px]">
        <LibraryView currentUserRole="student" />
      </div>
    </StudentPortalLayout>
  )
}
