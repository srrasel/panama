"use client"

import { useEffect, useState } from "react"
import { useParent } from "@/app/parent/ParentContext"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"
import { CalendarDays, Award, BookOpen, Clock, Activity, TrendingUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ParentDashboard() {
  const { selectedChild } = useParent()
  const [childInfo, setChildInfo] = useState<any>(null)
  const [childPerformance, setChildPerformance] = useState<any[]>([])
  const [attendance, setAttendance] = useState<any>({})
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!selectedChild) return

    setLoading(true)
    Promise.all([
      fetch(`/api/parent/dashboard?childId=${selectedChild.id}`).then((r) => r.json()),
      fetch(`/api/parent/performance?childId=${selectedChild.id}`).then((r) => r.json()),
      fetch(`/api/parent/attendance?childId=${selectedChild.id}`).then((r) => r.json()),
      fetch(`/api/parent/upcoming-events?childId=${selectedChild.id}`).then((r) => r.json()),
      fetch(`/api/parent/recent-activities?childId=${selectedChild.id}`).then((r) => r.json()),
    ])
      .then(([dash, perf, att, events, recent]) => {
        setChildInfo(dash.childInfo)
        setChildPerformance(perf.performance || dash.childPerformance || [])
        setAttendance(att.attendanceStats || dash.attendance || {})
        setUpcomingEvents(events.upcomingEvents || dash.upcomingEvents || [])
        setRecentActivities(recent.recentActivities || dash.recentActivities || [])
      })
      .catch((err) => {
        console.error("Error fetching parent dashboard data:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [selectedChild])

  const averageGrade = childPerformance.length > 0 
    ? Math.round(childPerformance.reduce((sum, p) => sum + p.percentage, 0) / childPerformance.length)
    : 0

  const getGradeLetter = (pct: number) => {
    if (pct >= 90) return "A"
    if (pct >= 80) return "B"
    if (pct >= 70) return "C"
    if (pct >= 60) return "D"
    return "F"
  }

  return (
    <ParentPortalLayout
      title="Dashboard"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: selectedChild?.name || "Child" }
      ]}
    >
      <div className="space-y-8">
        
        {/* Welcome Section */}
        {!loading && (
            <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back!</h2>
                    <p className="text-slate-500 mt-1">Here is the latest progress report for <span className="font-bold text-slate-700">{selectedChild?.name}</span>.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                     <div className="w-12 h-12 rounded-full bg-[#007bff] text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200">
                        {selectedChild?.name?.charAt(0) || "C"}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-800 uppercase tracking-wide">Student ID</p>
                        <p className="text-xs text-slate-500 font-mono">{selectedChild?.id?.substring(0, 8) || "Unknown"}</p>
                     </div>
                </div>
            </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Attendance Card */}
            <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <CalendarDays className="h-6 w-6" />
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg">Good</span>
                </div>
                <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Attendance</h3>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-slate-800">{attendance.presentagePercentage || 0}%</span>
                    <span className="text-sm text-slate-400 font-semibold mb-1.5">Present</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {attendance.presentDays || 0} Present</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-red-400" /> {attendance.absentDays || 0} Absent</span>
                </div>
            </div>

            {/* Average Grade Card */}
            <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <Award className="h-6 w-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${averageGrade >= 80 ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                        {averageGrade >= 80 ? 'Excellent' : 'Average'}
                    </span>
                </div>
                <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Overall Grade</h3>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-slate-800">{averageGrade > 0 ? getGradeLetter(averageGrade) : "-"}</span>
                    <span className="text-xl text-slate-400 font-bold mb-1.5">({averageGrade}%)</span>
                </div>
                 <div className="mt-4 pt-4 border-t border-slate-50 text-xs font-semibold text-slate-500">
                    Across {childPerformance.length} enrolled courses
                </div>
            </div>

             {/* Enrolled Courses Card */}
             <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                        <BookOpen className="h-6 w-6" />
                    </div>
                </div>
                <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Active Courses</h3>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-slate-800">{childPerformance.length}</span>
                    <span className="text-sm text-slate-400 font-semibold mb-1.5">Courses</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50">
                     <Link href="/parent/grades" className="text-purple-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        View Performance <TrendingUp className="h-3 w-3" />
                     </Link>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-slate-400" /> Recent Activity
                    </h3>
                    <Link href="/parent/communication" className="text-sm font-bold text-[#007bff]">View All</Link>
                </div>
                
                <div className="space-y-6">
                    {recentActivities.length > 0 ? recentActivities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{activity.title || "Activity"}</h4>
                                <p className="text-slate-500 text-xs mt-1">{activity.description || "No details available."}</p>
                                <p className="text-xs text-slate-400 font-medium mt-2">{new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-slate-400">
                            <p>No recent activities found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100 h-fit">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-slate-400" /> Upcoming
                    </h3>
                    <Link href="/parent/events" className="text-sm font-bold text-[#007bff]">View Calendar</Link>
                </div>

                <div className="space-y-4">
                    {upcomingEvents.length > 0 ? upcomingEvents.map((event, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-[#007bff]/5 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="px-2 py-1 bg-white rounded-lg text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">
                                    {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                                <span className="text-xs font-bold text-[#007bff] bg-blue-50 px-2 py-0.5 rounded-md">{event.type || "Event"}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#007bff] transition-colors">{event.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{event.description}</p>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-slate-400">
                            <p>No upcoming events.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </ParentPortalLayout>
  )
}
