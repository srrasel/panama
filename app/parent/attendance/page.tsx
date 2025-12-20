"use client"

import { useEffect, useState } from "react"
import { useParent } from "../ParentContext"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"
import { CheckCircle2, XCircle, Clock, Percent, Calendar, AlertCircle, CheckCircle } from "lucide-react"

export default function ParentAttendance() {
  const { selectedChild } = useParent()
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([])
  const [attendanceStats, setAttendanceStats] = useState<any>({})
  const [childName, setChildName] = useState<string>("")
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    if (!selectedChild) return
    Promise.all([
      fetch(`/api/parent/attendance?childId=${selectedChild.id}`).then((r) => r.json()),
      fetch(`/api/parent/upcoming-events?childId=${selectedChild.id}`).then((r) => r.json()),
      fetch(`/api/parent/recent-activities?childId=${selectedChild.id}`).then((r) => r.json()),
    ])
      .then(([att, events, recent]) => {
        setAttendanceRecords(att.attendanceRecords || [])
        setAttendanceStats(att.attendanceStats || {})
        setChildName(att.childName || "")
        setUpcomingEvents(events.upcomingEvents || [])
        setRecentActivities(recent.recentActivities || [])
      })
      .catch(() => {
        setAttendanceRecords([])
        setAttendanceStats({})
        setChildName("")
        setUpcomingEvents([])
        setRecentActivities([])
      })
  }, [selectedChild])

  return (
    <ParentPortalLayout
      title="Attendance Records"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: "Attendance" },
      ]}
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Attendance Overview</h1>
            <p className="text-slate-500 mt-2 text-lg">
              Track {childName || "Student"}'s daily attendance and upcoming schedule
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="w-24 h-24 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-slate-500 font-medium">Present</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{attendanceStats.present}</h3>
              <p className="text-emerald-600 text-sm font-medium mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-lg">
                Days present
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <XCircle className="w-24 h-24 text-red-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-slate-500 font-medium">Absent</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{attendanceStats.absent}</h3>
              <p className="text-red-600 text-sm font-medium mt-2 bg-red-50 inline-block px-2 py-1 rounded-lg">
                Days absent
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-24 h-24 text-amber-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-slate-500 font-medium">Leave</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{attendanceStats.leave}</h3>
              <p className="text-amber-600 text-sm font-medium mt-2 bg-amber-50 inline-block px-2 py-1 rounded-lg">
                Days on leave
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Percent className="w-24 h-24 text-blue-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Percent className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-500 font-medium">Attendance Rate</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">95%</h3>
              <p className="text-blue-600 text-sm font-medium mt-2 bg-blue-50 inline-block px-2 py-1 rounded-lg">
                Excellent record
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Recent Attendance History</h2>
            <button className="text-slate-500 hover:text-slate-900 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {attendanceRecords.map((record, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                      record.status === "Present"
                        ? "bg-emerald-100 text-emerald-700"
                        : record.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {record.status === "Present" ? "P" : record.status === "Absent" ? "A" : "L"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {record.day}
                    </h4>
                    <p className="text-slate-500 text-sm">{record.date}</p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    record.status === "Present"
                      ? "bg-white text-emerald-700 border border-emerald-100"
                      : record.status === "Absent"
                        ? "bg-white text-red-700 border border-red-100"
                        : "bg-white text-amber-700 border border-amber-100"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
              <Calendar className="w-6 h-6 text-slate-400" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{event.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{event.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ml-2 ${
                        event.type === "Exam"
                          ? "bg-red-100 text-red-700"
                          : event.type === "Meeting"
                            ? "bg-blue-100 text-blue-700"
                            : event.type === "Deadline"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Recent Activities</h2>
              <AlertCircle className="w-6 h-6 text-slate-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{item.activity}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-slate-500">{item.date}</p>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          item.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "Passed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParentPortalLayout>
  )
}
