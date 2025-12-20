"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Video, User as UserIcon, Star } from "lucide-react"
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
    fetch("/api/courses")
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
                  <div className="bg-white group rounded-[1.8rem] shadow-xl shadow-slate-200/40 p-3 border border-slate-50 h-full">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                      <Image 
                        src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"} 
                        alt={course.title} 
                        fill
                        className="w-full group-hover:scale-110 transition-all duration-400 h-full object-cover" 
                      />
                    </div>
                    <span className="bg-emerald-50 hover:bg-emerald-500 px-3 hover:text-white transition-all duration-300 text-emerald-600 py-2 rounded-lg text-sm font-bold mb-5 inline-block">
                        Business
                    </span>
                    <div className="flex gap-6 px-3 mb-4 text-slate-500 text-sm justify-between font-bold uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-slate-400" /> {course.totalLessons} Lessons
                        </div>
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-slate-400" /> {course.students} Students
                        </div>
                    </div>
                    <h4 className="text-xl px-3 font-bold text-[#1e293b] mb-6 leading-snug line-clamp-2">
                        {course.title}
                    </h4>
                    
                    <div className="flex justify-between items-center text-sm px-3 pb-4 border-t border-slate-50 pt-5">
                        <div>
                            <div className="flex text-amber-400 text-[10px] mb-1 gap-0.5">
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current opacity-50" />
                            </div>
                            <p className="text-slate-400 text-sm font-bold">4.5 (1.5K Reviews)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image 
                                src={`https://ui-avatars.com/api/?name=${course.instructor}&background=fde68a&color=92400e`} 
                                alt="Instructor"
                                width={32}
                                height={32}
                                className="rounded-full shadow-sm"
                            />
                            <span className="text-slate-500 text-sm font-bold">{course.instructor}</span>
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
