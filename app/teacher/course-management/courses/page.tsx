"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, BookOpen } from "lucide-react"

export default function TeacherCourses() {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/teacher/course-management/courses")
      .then(res => res.json())
      .then(data => {
        if (data.courses) setCourses(data.courses)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = courses.filter((c) => (filter === "All" ? true : c.status === filter)).filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))

  const stat = {
    total: courses.length,
    active: courses.filter((c) => c.status === "Active").length,
    draft: courses.filter((c) => c.status === "Draft").length,
    archived: courses.filter((c) => c.status === "Archived").length,
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Courses</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{stat.total}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Active</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{stat.active}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Draft</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{stat.draft}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Archived</p>
          <p className="text-3xl font-bold text-slate-700 mt-2">{stat.archived}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 rounded-lg border text-sm">
          {['All','Active','Draft','Archived'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <Link href="/teacher/course-management/courses/create" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium">Create Course</Link>
      </div>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">Loading courses...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No courses found. Create your first course!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div key={c.id} className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center"><BookOpen className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.lessons} lessons</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{c.students} students</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-green-100 text-green-700' : c.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{c.status}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/teacher/course-management/courses/${c.id}/edit`} className="px-3 py-2 text-sm rounded-lg border hover:bg-muted inline-block">Edit</Link>
                <button className="px-3 py-2 text-sm rounded-lg border hover:bg-muted">Manage</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
