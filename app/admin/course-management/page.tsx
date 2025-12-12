"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function CourseManagement() {
  const [courses, setCourses] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<any>({})

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    teacher: "",
    description: "",
    status: "Active",
    lessons: 0,
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/teacher/course-management/courses").catch(() => null)
      const data = await res?.json().catch(() => null)
      if (data?.courses) setCourses(data.courses)
    })()
  }, [])

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      title: formData.title,
      teacher: formData.teacher,
      description: formData.description,
      status: formData.status,
      lessons: formData.lessons,
      students: 0,
    }
    const res = await fetch("/api/teacher/course-management/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null)
    const data = await res?.json().catch(() => null)
    if (data?.course) setCourses([data.course, ...courses])
    setFormData({ title: "", teacher: "", description: "", status: "Active", lessons: 0 })
    setShowForm(false)
  }

  const handleDeleteCourse = async (id: number) => {
    const res = await fetch("/api/teacher/course-management/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => null)
    if (res?.ok) setCourses(courses.filter((c) => c.id !== id))
  }

  const startEdit = (course: any) => {
    setEditingId(course.id)
    setEditData({
      title: course.title,
      teacher: course.teacher || "",
      students: course.students,
      status: course.status,
      lessons: course.lessons || 0,
      description: course.description || "",
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Course Management</h1>
          <p className="text-muted-foreground">Add or remove courses and assign teachers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          {showForm ? "Cancel" : "Create Course"}
        </button>
      </div>

      {/* Create Course Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Create New Course</h2>
          <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Course Name</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Assign Teacher</label>
              <select
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select a teacher</option>
                <option value="Prof. Smith">Prof. Smith</option>
                <option value="Dr. Johnson">Dr. Johnson</option>
                <option value="Emma Davis">Emma Davis</option>
                <option value="Prof. Chen">Prof. Chen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              >
                {["Active","Draft","Archived"].map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Lessons</label>
              <input type="number" value={formData.lessons} onChange={(e) => setFormData({ ...formData, lessons: Number(e.target.value) })} className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter course description"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="md:col-span-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Create Course
            </button>
          </form>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-lg p-6">
            {editingId === course.id ? (
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
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.teacher ? `Taught by ${course.teacher}` : ""}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">
                  {course.status}
                </span>
              </div>
            )}

            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Enrolled Students</span>
                <span className="text-sm font-semibold text-foreground">{course.students}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created Date</span>
                <span className="text-sm font-semibold text-foreground">{course.createdDate}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {editingId === course.id ? (
                <>
                  <button onClick={saveEdit} className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm font-medium">Save</button>
                  <button onClick={cancelEdit} className="flex-1 px-3 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors text-sm font-medium">Cancel</button>
                </>
              ) : (
                <button onClick={() => startEdit(course)} className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium">Edit</button>
              )}
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
