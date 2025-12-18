"use client"

import { useEffect, useState } from "react"
import { useParent } from "../ParentContext"

export default function ParentDashboard() {
  const { selectedChild } = useParent()
  const [childInfo, setChildInfo] = useState<any>(null)
  const [childPerformance, setChildPerformance] = useState<any[]>([])
  const [attendance, setAttendance] = useState<any>({})
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    if (!selectedChild) return

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
      .catch(() => {
        setChildInfo(null)
        setChildPerformance([])
        setAttendance({})
        setUpcomingEvents([])
        setRecentActivities([])
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
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Welcome Back</h1>
            <p className="text-white/80">Here's {(childInfo?.name || "Student")}'s learning overview</p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg border border-white/20 p-4">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {(childInfo?.name?.[0] || "S").toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{childInfo?.name || "Student"}</p>
              <p className="text-sm text-white/80">{childInfo?.grade || ""}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Attendance</p>
              <p className="text-xl font-semibold text-foreground">{attendance.presentagePercentage || 0}%</p>
            </div>
            <div className="w-11 h-11 bg-emerald-600 rounded-full text-white flex items-center justify-center">✓</div>
          </div>
          <span className="text-xs font-medium text-primary">{attendance.presentDays || 0} present, {attendance.absentDays || 0} absent</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Average Grade</p>
              <p className="text-xl font-semibold text-foreground">{averageGrade > 0 ? getGradeLetter(averageGrade) : "-"}</p>
            </div>
            <div className="w-11 h-11 bg-blue-600 rounded-full text-white flex items-center justify-center">A</div>
          </div>
          <span className="text-xs font-medium text-primary">Average: {averageGrade}%</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Courses Enrolled</p>
              <p className="text-xl font-semibold text-foreground">{childPerformance.length}</p>
            </div>
            <div className="w-11 h-11 bg-purple-600 rounded-full text-white flex items-center justify-center">📚</div>
          </div>
          <span className="text-xs font-medium text-primary">Active subjects</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Upcoming Events</p>
              <p className="text-xl font-semibold text-foreground">{upcomingEvents.length}</p>
            </div>
            <div className="w-11 h-11 bg-amber-600 rounded-full text-white flex items-center justify-center">⚑</div>
          </div>
          <span className="text-xs font-medium text-primary">Next: {upcomingEvents[0]?.title || "None"}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Academic Performance */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Academic Performance</h2>
          <div className="space-y-4">
            {childPerformance.map((subject, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{subject.subject}</h3>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="text-lg font-bold text-primary">{subject.currentGrade}</span>
                  <span className="text-2xl">{subject.trend === "up" ? "📈" : "➡️"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Attendance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-foreground font-medium">Present</span>
              <span className="text-xl font-bold text-green-700">{attendance.presentDays}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-foreground font-medium">Absent</span>
              <span className="text-xl font-bold text-red-700">{attendance.absentDays}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-foreground font-medium">Leave</span>
              <span className="text-xl font-bold text-amber-700">{attendance.leaveDays}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-3xl font-bold text-primary mt-2">{attendance.presentagePercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
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

      {/* Recent Activities */}
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
