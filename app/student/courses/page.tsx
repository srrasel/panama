"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { PlayCircle, CheckCircle2, Clock } from "lucide-react"

type Course = {
  id: number
  title: string
  instructor: string
  progress: number
  students: number
  description: string
  status: "in_progress" | "completed" | "not_started"
  completedLessons: number
  totalLessons: number
  nextLesson: string
  estimatedTime: string
  image?: string
}

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filter, setFilter] = useState<string>("All")

  useEffect(() => {
    fetch("/api/student/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]))
  }, [])

  const inProgress = courses.filter((c) => c.status === "in_progress")
  const filtered = courses.filter((c) => (filter === "All" ? true : filter === "In Progress" ? c.status === "in_progress" : filter === "Completed" ? c.status === "completed" : c.status === "not_started"))

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">My Courses</h1>
            <p className="text-white/80">Continue learning and track progress</p>
          </div>
          <div className="flex items-center gap-2">
            {["All", "In Progress", "Completed", "Not Started"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-full text-sm ${filter === tab ? "bg-amber-500 text-black" : "border border-white/20 text-white hover:bg-white/10"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {inProgress.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-slate-600" />
            <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {inProgress.map((course) => (
              <Link href={`/student/learning/${course.id}`} key={course.id} className="block bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
                <p className="text-sm text-foreground mb-3">{course.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm font-semibold text-primary">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">{course.completedLessons}/{course.totalLessons} lessons • Next: {course.nextLesson} • {course.estimatedTime}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{course.students} students</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-slate-600" />
          <h2 className="text-xl font-bold text-foreground">All Courses</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((course) => (
            <div key={course.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.status === "completed" ? "bg-green-100 text-green-700" : course.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{course.status.replace("_", " ")}</span>
              </div>
              <p className="text-sm text-foreground mb-4">{course.description}</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{course.students} students enrolled</p>
                <div className="flex gap-3">
                  <Link href={`/course/${course.id}`} className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors">Overview</Link>
                  {course.status !== "completed" ? (
                    <Link href={`/student/learning/${course.id}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Continue</Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg"><CheckCircle2 className="h-4 w-4" /> Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
