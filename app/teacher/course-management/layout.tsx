"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CourseManagementLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const tabs = [
    { href: "/teacher/course-management/courses", label: "Courses" },
    { href: "/teacher/course-management/lessons", label: "Lessons" },
    { href: "/teacher/course-management/quizzes", label: "Quizz" },
    { href: "/teacher/course-management/questions", label: "Question" },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Course Management</h1>
            <p className="text-white/80">Manage courses, lessons, quizzes and question bank</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = pathname?.startsWith(t.href)
            return (
              <Link key={t.href} href={t.href} className={`px-4 py-2 rounded-full text-sm ${active ? "bg-amber-500 text-black" : "border border-white/20 text-white hover:bg-white/10"}`}>
                {t.label}
              </Link>
            )
          })}
        </div>
      </section>

      <div className="bg-card rounded-lg border border-border p-8">{children}</div>
    </div>
  )
}

