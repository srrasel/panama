"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, BookOpen, User, Clock, CheckCircle } from "lucide-react"

type Course = {
  id: string
  title: string
  instructor: string
  description: string
  price: number
  isFree: boolean
  imageUrl?: string
  lessonsCount: number
  studentsCount: number
  isEnrolled: boolean
}

export default function BrowseCourses() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [enrolling, setEnrolling] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/student/catalog")
      .then((res) => {
        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses)
        } else {
          console.warn("Unexpected API response:", data)
          setCourses([])
        }
      })
      .catch((err) => {
        console.error("Browse page error:", err)
        setCourses([])
      })
      .finally(() => setLoading(false))
  }, [])

  // Auto-refresh to ensure data is fresh
  useEffect(() => {
     router.refresh()
  }, [])

  const handleEnroll = async (courseId: string) => {
    setEnrolling(courseId)
    try {
      const res = await fetch("/api/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      })

      if (res.ok) {
        // Update local state to show enrolled
        setCourses(courses.map(c => c.id === courseId ? { ...c, isEnrolled: true } : c))
        router.refresh()
      } else {
        alert("Failed to enroll. Please try again.")
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      alert("An error occurred.")
    } finally {
      setEnrolling(null)
    }
  }

  const filteredCourses = courses.filter(course => 
    (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (course.instructor && course.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-700 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Browse Courses</h1>
            <p className="text-white/80">Explore new skills and knowledge</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-colors"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading courses...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl mb-2">No courses found</p>
            <p className="text-sm">Try adjusting your search or check back later for new courses.</p>
            <p className="text-xs mt-2 opacity-50">Debug: Loaded {courses.length} raw courses.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-48 bg-muted relative">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30">
                    <BookOpen className="h-12 w-12 text-indigo-500" />
                  </div>
                )}
                {course.isFree && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FREE
                  </span>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{course.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{course.lessonsCount} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{course.studentsCount} Students</span>
                  </div>
                </div>

                <div className="mt-auto">
                  {course.isEnrolled ? (
                    <button 
                      disabled
                      className="w-full py-2.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-medium flex items-center justify-center gap-2 cursor-default"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Enrolled
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolling === course.id}
                      className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {enrolling === course.id ? "Enrolling..." : course.isFree ? "Enroll Now" : `Enroll for $${course.price}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
