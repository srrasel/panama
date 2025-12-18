"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Search, BookOpen } from "lucide-react"

export default function AdminCourses() {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [courses, setCourses] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/teacher/course-management/courses").catch(() => null)
      const data = await res?.json().catch(() => null)
      setCourses(Array.isArray(data?.courses) ? data.courses : [])
    })()
  }, [])

  const filtered = courses
    .filter((c) => (filter === "All" ? true : String(c.status) === filter))
    .filter((c) => String(c.title || "").toLowerCase().includes(query.toLowerCase()))

  const stat = {
    total: courses.length,
    active: courses.filter((c) => c.status === "Active").length,
    draft: courses.filter((c) => c.status === "Draft").length,
    archived: courses.filter((c) => c.status === "Archived").length,
  }

  const startEdit = (course: any) => {
    setEditingId(course.id)
    setEditData({
      title: course.title,
      teacher: course.teacher || "",
      students: Number(course.students || 0),
      status: String(course.status || "Active"),
      lessons: Number(course.lessons || 0),
      description: String(course.description || ""),
    })
  }

  const saveEdit = async () => {
    if (editingId == null) return
    const res = await fetch("/api/teacher/course-management/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, ...editData }),
    }).catch(() => null)
    const data = await res?.json().catch(() => null)
    if (data?.course) {
      setCourses(courses.map((c) => (c.id === editingId ? data.course : c)))
      setEditingId(null)
      setEditData({})
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleDeleteCourse = async (id: string) => {
    const res = await fetch("/api/teacher/course-management/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => null)
    if (res?.ok) setCourses(courses.filter((c) => c.id !== id))
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
          {["All","Active","Draft","Archived"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <Link href="/admin/course-management/courses/create" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium">Create Course</Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div key={c.id} className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
            {editingId === c.id ? (
              <div className="space-y-3 mb-4">
                <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="w-full px-3 py-2 border rounded" />
                <input value={editData.teacher} onChange={(e) => setEditData({ ...editData, teacher: e.target.value })} className="w-full px-3 py-2 border rounded" placeholder="Teacher" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" value={editData.students} onChange={(e) => setEditData({ ...editData, students: Number(e.target.value) })} className="px-3 py-2 border rounded" />
                  <input type="number" value={editData.lessons} onChange={(e) => setEditData({ ...editData, lessons: Number(e.target.value) })} className="px-3 py-2 border rounded" />
                </div>
                <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} className="w-full px-3 py-2 border rounded">
                  {["Active","Draft","Archived"].map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
                <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="w-full px-3 py-2 border rounded" rows={3} />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center"><BookOpen className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.lessons} lessons</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{c.students} students</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-green-100 text-green-700' : c.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{c.status}</span>
                </div>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              {editingId === c.id ? (
                <>
                  <button onClick={saveEdit} className="px-3 py-2 text-sm rounded-lg border bg-green-100 text-green-700 hover:bg-green-200">Save</button>
                  <button onClick={cancelEdit} className="px-3 py-2 text-sm rounded-lg border hover:bg-muted">Cancel</button>
                </>
              ) : (
                <Link href={`/admin/course-management/courses/${c.slug || c.id}/edit`} className="px-3 py-2 text-sm rounded-lg border hover:bg-muted">Edit</Link>
              )}
              <button onClick={() => handleDeleteCourse(c.id)} className="px-3 py-2 text-sm rounded-lg border hover:bg-muted">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
