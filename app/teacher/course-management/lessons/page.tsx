"use client"

import { useState } from "react"
import { ListOrdered, Plus, Clock, Video, Image as ImageIcon } from "lucide-react"

export default function TeacherLessons() {
  const [course, setCourse] = useState(1)
  const [creating, setCreating] = useState(false)
  const [newLesson, setNewLesson] = useState({ title: "", duration: "", status: "Draft" })
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const courses = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Mobile Apps" },
  ]
  const lessonsByCourse: Record<number, { title: string; duration: string; status: string }[]> = {
    1: [
      { title: "HTML & CSS Basics", duration: "45 min", status: "Published" },
      { title: "Flexbox & Grid", duration: "50 min", status: "Published" },
      { title: "JavaScript Fundamentals", duration: "60 min", status: "Draft" },
    ],
    2: [
      { title: "Python for Data", duration: "55 min", status: "Published" },
      { title: "Pandas Essentials", duration: "50 min", status: "Draft" },
    ],
    3: [
      { title: "Intro to React Native", duration: "40 min", status: "Published" },
      { title: "Navigation & State", duration: "60 min", status: "Draft" },
    ],
  }
  const lessons = lessonsByCourse[course] || []

  const stat = {
    total: lessons.reduce((s) => s + 1, 0),
    published: lessons.filter((l) => l.status === "Published").length,
    draft: lessons.filter((l) => l.status === "Draft").length,
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center"><ListOrdered className="h-5 w-5" /></div>
        <div>
          <p className="text-sm text-muted-foreground">Selected Course</p>
          <p className="font-semibold text-foreground">{courses.find((c) => c.id === course)?.name}</p>
        </div>
        <select value={course} onChange={(e) => setCourse(Number(e.target.value))} className="ml-auto px-4 py-2 rounded-lg border text-sm">
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Create Lesson</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Lessons</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{stat.total}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Published</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{stat.published}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Draft</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{stat.draft}</p>
        </div>
      </div>

      <div className="space-y-3">
        {creating && (
          <div className="border border-border rounded-lg p-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                <input value={newLesson.duration} onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 45 min" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select value={newLesson.status} onChange={(e) => setNewLesson({ ...newLesson, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                  {['Published','Draft'].map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 inline-flex items-center gap-2"><Video className="h-4 w-4" /> Video</label>
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 inline-flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Images</label>
                <input type="file" accept="image/*" multiple onChange={(e) => setImageFiles(Array.from(e.target.files || []))} />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const fd = new FormData()
                  fd.append("courseId", String(course))
                  fd.append("title", newLesson.title)
                  fd.append("duration", newLesson.duration)
                  fd.append("status", newLesson.status)
                  if (videoFile) fd.append("video", videoFile)
                  imageFiles.forEach((f) => fd.append("images", f))
                  const res = await fetch("/api/teacher/course-management/lessons", { method: "POST", body: fd })
                  const data = await res.json().catch(() => ({}))
                  if (data?.lesson) {
                    lessonsByCourse[course] = [{ title: data.lesson.title, duration: data.lesson.duration, status: data.lesson.status }, ...lessonsByCourse[course]]
                    setCreating(false)
                    setNewLesson({ title: "", duration: "", status: "Draft" })
                    setVideoFile(null)
                    setImageFiles([])
                  }
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
              >
                Save Lesson
              </button>
              <button onClick={() => setCreating(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
            </div>
          </div>
        )}
        <div className="flex justify-end mb-4">
          <button onClick={() => setCreating((v) => !v)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Create Lesson</button>
        </div>
        {lessons.map((l, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center"><Clock className="h-4 w-4" /></div>
              <div>
                <p className="font-semibold text-foreground">{l.title}</p>
                <p className="text-xs text-muted-foreground">{l.duration}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${l.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
