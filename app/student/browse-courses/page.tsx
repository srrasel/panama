"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, Star, User, Clock, BookOpen, ChevronRight, Tag, Loader2 } from "lucide-react"
import StudentPortalLayout from "@/components/student/student-portal-layout"

interface Course {
  id: string
  title: string
  instructor: string
  description: string
  price: number
  isFree: boolean
  imageUrl: string | null
  lessonsCount: number
  studentsCount: number
  isEnrolled: boolean
}

export default function BrowseCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [enrollingId, setEnrollingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/student/catalog")
        if (response.ok) {
          const data = await response.json()
          setCourses(data.courses || [])
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId)
    try {
      const res = await fetch("/api/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      })

      if (res.ok) {
        setCourses(courses.map(c => c.id === courseId ? { ...c, isEnrolled: true } : c))
      } else {
        const data = await res.json()
        alert(data.error || "Failed to enroll")
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      alert("An error occurred")
    } finally {
      setEnrollingId(null)
    }
  }

  const filteredCourses = courses.filter(course => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <StudentPortalLayout
      title="Browse Courses"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Browse Courses" }
      ]}
    >
      <div className="space-y-8">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 space-y-6">
           {/* Search Bar */}
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
             <input 
               type="text" 
               placeholder="Search for courses or instructors..." 
               className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-bold text-slate-800">
             {loading ? "Loading courses..." : `Showing ${filteredCourses.length} Courses`}
           </h2>
           {!loading && (
             <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
               <span>Sort by:</span>
               <select className="bg-transparent border-none font-bold text-slate-800 focus:ring-0 cursor-pointer outline-none">
                 <option>Newest</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
               </select>
             </div>
           )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          </div>
        )}

        {/* Course Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="group bg-white rounded-[1.8rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
                {/* Course Image Placeholder */}
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                   {course.imageUrl ? (
                     <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <BookOpen className="h-12 w-12 opacity-50" />
                     </div>
                   )}
                   {/* Badge */}
                   <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold rounded-lg shadow-sm">
                        General
                      </span>
                   </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                        <Star className="h-4 w-4 fill-current" />
                        <span>5.0</span>
                        <span className="text-slate-400 font-medium">(0)</span>
                     </div>
                     <span className="text-xs font-bold text-[#007bff] bg-blue-50 px-2.5 py-1 rounded-lg">
                        All Levels
                     </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-[#007bff] transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-4 flex items-center gap-2">
                     <User className="h-4 w-4" />
                     {course.instructor}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6 mt-auto">
                     <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        Self-paced
                     </div>
                     <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        {course.lessonsCount} Lessons
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                     <span className="text-2xl font-extrabold text-slate-800">
                       {course.isFree ? "Free" : `$${course.price}`}
                     </span>
                     {course.isEnrolled ? (
                       <Link 
                         href={`/student/learning/${course.id}`}
                         className="px-6 py-2.5 bg-green-50 text-green-600 font-bold rounded-xl border border-green-200 hover:bg-green-100 transition-all flex items-center gap-2"
                       >
                         Continue Learning
                       </Link>
                     ) : (
                       <button
                         onClick={() => handleEnroll(course.id)}
                         disabled={enrollingId === course.id}
                         className="px-6 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 group-hover:bg-[#007bff] group-hover:text-white group-hover:border-[#007bff] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         {enrollingId === course.id ? (
                           <>
                             <Loader2 className="h-4 w-4 animate-spin" />
                             Enrolling...
                           </>
                         ) : (
                           "Enroll Now"
                         )}
                       </button>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredCourses.length === 0 && (
           <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No courses found</h3>
              <p className="text-slate-500">Try adjusting your search to find what you're looking for.</p>
           </div>
        )}
      </div>
    </StudentPortalLayout>
  )
}
