"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

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

export default function CoursesPage() {
  const [query, setQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/student/courses")
      .then((r) => r.json())
      .then((data) => {
        setCourses(Array.isArray(data?.courses) ? data.courses : [])
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let items = courses
    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter((c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q))
    }
    return items
  }, [courses, query])

  return (
    <main>
      <Navigation />

      <section className="px-4 py-20 sm:py-28 bg-[rgb(127,29,29)] relative overflow-hidden reveal-on-scroll is-visible">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Explore Our Courses
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto text-balance">
            Learn from industry experts and advance your skills with our comprehensive course catalog
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses or instructors"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
                  <div className="h-40 rounded-lg bg-muted mb-4" />
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-5 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((course) => (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <div className="group rounded-xl border border-border bg-card overflow-hidden h-full">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      {course.image ? (
                        <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-foreground/40">Course</div>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">{course.title}</h3>
                      </div>
                      <p className="text-sm text-foreground/60">By {course.instructor}</p>
                      <div className="flex items-center justify-between text-sm text-foreground/70">
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">Next: {course.nextLesson || "TBD"}</span>
                        <span className="text-foreground/60">{course.estimatedTime || ""}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>

  )
}
