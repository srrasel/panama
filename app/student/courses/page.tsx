"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { PlayCircle, CheckCircle2, Clock, BookMarked, UserCircle, User as UserIcon } from "lucide-react"

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

import StudentPortalLayout from "@/components/student/student-portal-layout"

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filter, setFilter] = useState<string>("All")

  useEffect(() => {
    fetch("/api/student/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses)
        } else {
          setCourses([])
        }
      })
      .catch(() => setCourses([]))
  }, [])

  const inProgress = (courses || []).filter((c) => c.status === "in_progress")
  const filtered = (courses || []).filter((c) => (filter === "All" ? true : filter === "In Progress" ? c.status === "in_progress" : filter === "Completed" ? c.status === "completed" : c.status === "not_started"))

  return (
    <StudentPortalLayout
      title="My Courses"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Enrolled Courses" }
      ]}
    >
      <div className="space-y-8">
        {/* Modern Filter Section */}
        <div className="bg-white p-4 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-wrap gap-2">
            {["All", "In Progress", "Completed", "Not Started"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  filter === tab 
                  ? "bg-[#007bff] text-white shadow-lg shadow-blue-200" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
        </div>

        {inProgress.length === 0 && filtered.length === 0 && (
        <div className="bg-white p-12 rounded-[1.8rem] shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookMarked className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No courses found</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't enrolled in any courses matching this filter yet. Start your learning journey today!</p>
          <Link href="/student/browse" className="px-8 py-4 bg-[#007bff] text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all inline-flex items-center gap-2">
            Browse Course Catalog
          </Link>
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <PlayCircle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Continue Learning</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {inProgress.map((course) => (
              <Link href={`/student/learning/${course.id}`} key={course.id} className="group block bg-slate-50 rounded-[1.5rem] border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-100 shadow-sm uppercase tracking-wider">Course</span>
                    <span className="text-xs font-bold text-[#007bff] bg-blue-50 px-3 py-1 rounded-lg">{course.estimatedTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#007bff] transition-colors line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-6">{course.instructor}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#007bff] h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                     <span className="text-xs font-medium text-slate-500">{course.completedLessons}/{course.totalLessons} lessons</span>
                     <span className="text-xs font-bold text-[#007bff] flex items-center gap-1">
                        Resume <PlayCircle className="w-3 h-3" />
                     </span>
                  </div>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
             <Clock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">All Enrolled Courses</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((course) => (
            <div key={course.id} className="group flex flex-col sm:flex-row gap-6 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                    course.status === "completed" ? "bg-green-100 text-green-700" : 
                    course.status === "in_progress" ? "bg-blue-100 text-blue-700" : 
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {course.status.replace("_", " ")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#007bff] transition-colors">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description?.replace(/<[^>]*>?/gm, '') || "No description available."}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6">
                    <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> {course.instructor}</span>
                    <span className="flex items-center gap-1"><UserIcon className="w-4 h-4" /> {course.students} students</span>
                </div>

                <div className="flex gap-3">
                  <Link href={`/course/${course.id}`} className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all shadow-sm">
                    Overview
                  </Link>
                  {course.status !== "completed" ? (
                    <Link href={`/student/learning/${course.id}`} className="px-5 py-2.5 bg-[#007bff] text-white rounded-xl font-bold text-sm hover:bg-blue-600 shadow-md shadow-blue-200 transition-all">
                        Continue
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-700 rounded-xl font-bold text-sm border border-green-200">
                        <CheckCircle2 className="h-4 w-4" /> Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </StudentPortalLayout>
  )
}
