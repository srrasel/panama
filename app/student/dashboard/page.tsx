"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function StudentDashboard() {
  const [stats, setStats] = useState([
    { label: "All Courses", value: 0, color: "bg-indigo-600", iconBg: "bg-indigo-600" },
    { label: "Enrolled Courses", value: 0, color: "bg-emerald-600", iconBg: "bg-emerald-600" },
    { label: "Active Courses", value: 0, color: "bg-amber-600", iconBg: "bg-amber-600" },
    { label: "Completed Courses", value: 0, color: "bg-neutral-900", iconBg: "bg-neutral-900" },
  ])
  const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([])
  const [recentGrades, setRecentGrades] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard stats and assignments/grades
    fetch("/api/student/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats)
        if (data.upcomingAssignments) setUpcomingAssignments(data.upcomingAssignments)
        if (data.recentGrades) setRecentGrades(data.recentGrades)
      })
      .catch((err) => console.error("Error fetching dashboard data:", err))

    // Fetch courses (keeping existing logic for now, or could be merged)
    fetch("/api/student/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses)
      })
      .catch((err) => console.error("Error fetching courses:", err))
      .finally(() => setLoading(false))
  }, [])

  const inProgressCourses = courses.filter((c) => c.status === "in_progress")

  const heroBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/student/dashboard" },
    { label: "Student Dashboard" },
  ]

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>
  }


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
          <Link href="/student/browse" className="px-4 py-2 rounded-full border border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-black transition text-sm">
            Browse All Courses
          </Link>
        </div>
      </section>

      {courses.length === 0 && (
         <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Start Your Learning Journey</h3>
            <p className="text-blue-600 dark:text-blue-400 mb-6">You haven't enrolled in any courses yet. Explore our catalog to find courses that interest you.</p>
            <Link href="/student/browse" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Browse Course Catalog
            </Link>
         </div>
      )}

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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h5 className="text-lg font-semibold mb-4 text-foreground">Upcoming Assignments</h5>
          <div className="space-y-4">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h6 className="font-medium text-foreground">{assignment.title}</h6>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      assignment.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {assignment.priority}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Due: {assignment.dueDate}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No upcoming assignments.</p>
            )}
          </div>
          <Link href="/student/assignments" className="block text-center text-sm text-primary mt-4 hover:underline">View all assignments</Link>
        </div>

        {/* Recent Grades */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h5 className="text-lg font-semibold mb-4 text-foreground">Recent Grades</h5>
          <div className="space-y-4">
            {recentGrades.length > 0 ? (
              recentGrades.map((grade, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h6 className="font-medium text-foreground">{grade.subject}</h6>
                    <p className="text-xs text-muted-foreground">{new Date(grade.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">{grade.grade}</span>
                    <span className="text-sm text-muted-foreground">({grade.percentage}%)</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No grades available yet.</p>
            )}
          </div>
        </div>
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
