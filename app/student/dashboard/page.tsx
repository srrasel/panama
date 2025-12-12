"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function StudentDashboard() {
  const upcomingAssignments = [
    { id: 1, title: "Math Problem Set #5", course: "Advanced Calculus", dueDate: "2025-12-10", priority: "High" },
    { id: 2, title: "Essay on World History", course: "Modern History", dueDate: "2025-12-12", priority: "Medium" },
    { id: 3, title: "Programming Project", course: "Web Development", dueDate: "2025-12-15", priority: "High" },
  ]

  const recentGrades = [
    { subject: "Mathematics", grade: "A-", percentage: 92 },
    { subject: "English", grade: "A", percentage: 95 },
    { subject: "Science", grade: "B+", percentage: 87 },
  ]

  const announcements = [
    { id: 1, title: "Semester Break Starts Next Week", date: "2025-12-01" },
    { id: 2, title: "Updated Course Materials Available", date: "2025-11-28" },
    { id: 3, title: "Reminder: Final Exams Schedule Released", date: "2025-11-25" },
  ]

  const heroBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/student/dashboard" },
    { label: "Student Dashboard" },
  ]

  const stats = [
    { label: "All Courses", value: 35, color: "bg-indigo-600", iconBg: "bg-indigo-600" },
    { label: "Enrolled Courses", value: 15, color: "bg-emerald-600", iconBg: "bg-emerald-600" },
    { label: "Active Courses", value: 11, color: "bg-amber-600", iconBg: "bg-amber-600" },
    { label: "Completed Courses", value: 4, color: "bg-neutral-900", iconBg: "bg-neutral-900" },
  ]

  const [courses, setCourses] = useState<any[]>([])
  useEffect(() => {
    fetch("/api/student/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]))
  }, [])
  const inProgressCourses = courses.filter((c) => c.status === "in_progress")

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-4">Student Dashboard</h1>
            <ul className="flex items-center gap-2 text-sm flex-wrap">
              {heroBreadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  {b.href ? (
                    <a href={b.href} className="text-white/90 hover:text-amber-400 font-medium">{b.label}</a>
                  ) : (
                    <span className="text-primary-300">{b.label}</span>
                  )}
                  {i < heroBreadcrumbs.length - 1 && <span className="text-white">›</span>}
                </li>
              ))}
            </ul>
          </div>
          <a href="#" className="px-4 py-2 rounded-full border border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-black transition text-sm">Become an Instructor</a>
        </div>
      </section>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="text-xl font-semibold text-foreground">{s.value}</p>
              </div>
              <div className={`w-11 h-11 ${s.iconBg} rounded-full text-white flex items-center justify-center`}>★</div>
            </div>
            <a href="#" className="text-xs font-medium text-primary underline">View all</a>
          </div>
        ))}
      </div>

      <h5 className="text-muted-foreground">In progress Courses</h5>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
        {inProgressCourses.map((c, idx) => (
          <Link href={`/student/learning/${c.id}`} key={idx} className="block bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
            <div className="rounded-xl overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-40 object-cover" />
            </div>
            <div className="p-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md mb-3">In Progress</span>
              <div className="flex items-center justify-between mb-3 text-sm">
                <div className="flex items-center gap-2 text-foreground"><span>🎥</span><span>{c.totalLessons} Lessons</span></div>
                <div className="flex items-center gap-2 text-foreground"><span>👤</span><span>{c.students} Students</span></div>
              </div>
              <h4 className="font-semibold text-foreground mb-4">{c.title}</h4>
              <div className="mb-4">
                <p className="text-foreground">Complete</p>
                <div className="w-full bg-primary/10 rounded-full h-4 relative">
                  <div className="bg-primary h-4 rounded-full" style={{ width: `${c.progress}%` }}></div>
                  <span className="absolute -top-6" style={{ left: `${c.progress}%` }}>
                    <span className="inline-flex items-center justify-center w-12 h-6 text-xs bg-white text-primary border border-border rounded">{c.progress}%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Next: {c.nextLesson} • {c.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-muted" />
                  <span className="text-xs text-muted-foreground">{c.instructor}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
