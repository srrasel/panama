"use client"

import { useEffect, useState } from "react"

export default function ParentAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([])
  const [attendanceStats, setAttendanceStats] = useState<any>({})
  const [childName, setChildName] = useState<string>("")
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch("/api/parent/attendance").then((r) => r.json()),
      fetch("/api/parent/upcoming-events").then((r) => r.json()),
      fetch("/api/parent/recent-activities").then((r) => r.json()),
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
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Attendance Records</h1>
            <p className="text-white/80">{childName || "Student"}'s attendance overview</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Present</p>
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</div>
          </div>
          <p className="text-xl font-semibold text-foreground">{attendanceStats.present}</p>
          <span className="text-xs font-medium text-primary">Days present</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Absent</p>
            <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center">−</div>
          </div>
          <p className="text-xl font-semibold text-foreground">{attendanceStats.absent}</p>
          <span className="text-xs font-medium text-primary">Days absent</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Leave</p>
            <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center">L</div>
          </div>
          <p className="text-xl font-semibold text-foreground">{attendanceStats.leave}</p>
          <span className="text-xs font-medium text-primary">Days on leave</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Attendance Rate</p>
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">%</div>
          </div>
          <p className="text-xl font-semibold text-foreground">95%</p>
          <span className="text-xs font-medium text-primary">Excellent record</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent Attendance Records</h2>
        <div className="space-y-3">
          {attendanceRecords.map((record, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    record.status === "Present"
                      ? "bg-green-500"
                      : record.status === "Absent"
                        ? "bg-red-500"
                        : "bg-amber-500"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-foreground">{record.day}</p>
                  <p className="text-sm text-muted-foreground">{record.date}</p>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  record.status === "Present"
                    ? "bg-green-100 text-green-700"
                    : record.status === "Absent"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Events & Deadlines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    event.type === "Exam"
                      ? "bg-red-100 text-red-700"
                      : event.type === "Meeting"
                        ? "bg-blue-100 text-blue-700"
                        : event.type === "Deadline"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                  }`}
                >
                  {event.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">📅 {event.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="text-2xl mt-1">📌</div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.activity}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
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
  )
}
