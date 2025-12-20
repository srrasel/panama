"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Copy, 
  Gift, 
  Briefcase, 
  Lightbulb,
  Video,
  User as UserIcon,
  Star
} from "lucide-react"
import StudentPortalLayout from "@/components/student/student-portal-layout"

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    allCourses: 0,
    enrolledCourses: 0,
    activeCourses: 0,
    completedCourses: 0
  })
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch Dashboard Stats
        const statsRes = await fetch("/api/student/dashboard")
        const statsData = await statsRes.json()
        if (statsData.stats) {
            setStats({
                allCourses: statsData.stats.find((s: any) => s.label === "All Courses")?.value || 0,
                enrolledCourses: statsData.stats.find((s: any) => s.label === "Enrolled Courses")?.value || 0,
                activeCourses: statsData.stats.find((s: any) => s.label === "Active Courses")?.value || 0,
                completedCourses: statsData.stats.find((s: any) => s.label === "Completed Courses")?.value || 0,
            })
        }

        // Fetch Courses
        const coursesRes = await fetch("/api/student/courses")
        const coursesData = await coursesRes.json()
        if (coursesData.courses) {
          setCourses(coursesData.courses)
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const inProgressCourses = courses.filter((c) => c.status === "in_progress")

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>
  }

  return (
    <StudentPortalLayout 
      title="Student Dashboard"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Student Dashboard" }
      ]}
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-1">All Courses</p>
              <h4 className="text-2xl font-bold text-slate-800">{stats.allCourses}</h4>
              <Link href="/student/browse" className="text-blue-600 text-[10px] font-bold underline mt-4 block">View all</Link>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm shadow-md">
              <Copy className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-1">Enrolled Courses</p>
              <h4 className="text-2xl font-bold text-slate-800">{stats.enrolledCourses}</h4>
              <Link href="/student/courses" className="text-blue-600 text-[10px] font-bold underline mt-4 block">View all</Link>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm shadow-md">
              <Gift className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-1">Active Courses</p>
              <h4 className="text-2xl font-bold text-slate-800">{stats.activeCourses}</h4>
              <Link href="/student/courses" className="text-blue-600 text-[10px] font-bold underline mt-4 block">View all</Link>
            </div>
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-1">Completed Courses</p>
              <h4 className="text-2xl font-bold text-slate-800">{stats.completedCourses}</h4>
              <Link href="/student/courses?filter=completed" className="text-blue-600 text-[10px] font-bold underline mt-4 block">View all</Link>
            </div>
            <div className="w-10 h-10 bg-[#0a1128] rounded-full flex items-center justify-center text-white text-sm shadow-md">
              <Lightbulb className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* In Progress Courses */}
        <section>
          <h3 className="text-lg font-bold text-[#1e293b] mb-6">In progress Courses</h3>

          {inProgressCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {inProgressCourses.map((course, i) => (
                  <div key={i} className="bg-white group rounded-[1.8rem] shadow-xl shadow-slate-200/40 p-3 border border-slate-50">
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                          <Image 
                              src={course.image || "/placeholder-course.jpg"} 
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
                      <div className="mb-8 px-3">
                          <div className="flex justify-between items-end mb-2">
                              <span className="text-slate-800 font-bold text-lg">Complete</span>
                              <span className="text-blue-500 font-bold text-sm">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full">
                              <div className="bg-[#007bff] h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                      </div>
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
              ))}
              </div>
          ) : (
              <div className="bg-white p-10 rounded-xl border border-slate-100 text-center">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">No courses in progress</h3>
                  <p className="text-slate-500 mb-6">Start learning today by enrolling in a new course!</p>
                  <Link href="/student/browse" className="px-6 py-3 bg-[#007bff] text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
                      Browse Courses
                  </Link>
              </div>
          )}
        </section>
      </div>
    </StudentPortalLayout>
  )
}
