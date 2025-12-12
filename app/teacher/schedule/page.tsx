"use client"

import { useState } from "react"
import Link from "next/link"
import { addWeeks, startOfWeek, endOfWeek, format } from "date-fns"

export default function TeacherSchedule() {
  const [view, setView] = useState<"week" | "day">("week")
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [query, setQuery] = useState("")
  const weekSchedule = [
    { day: "Monday", classes: [{ time: "09:00 - 10:30", course: "Advanced Mathematics 101", room: "Room 101" }] },
    {
      day: "Tuesday",
      classes: [
        { time: "11:00 - 12:30", course: "Physics Lab", room: "Lab A" },
        { time: "14:00 - 15:30", course: "Computer Science", room: "Room 205" },
      ],
    },
    { day: "Wednesday", classes: [{ time: "09:00 - 10:30", course: "Advanced Mathematics 101", room: "Room 101" }] },
    { day: "Thursday", classes: [{ time: "11:00 - 12:30", course: "Physics Lab", room: "Lab A" }] },
    {
      day: "Friday",
      classes: [
        { time: "09:00 - 10:30", course: "Computer Science", room: "Room 205" },
        { time: "14:00 - 15:30", course: "Office Hours", room: "Office 315" },
      ],
    },
  ]

  const upcomingExams = [
    { id: 1, course: "Advanced Mathematics 101", date: "2025-12-15", time: "09:00", room: "Exam Hall A" },
    { id: 2, course: "Physics Lab", date: "2025-12-18", time: "11:00", room: "Exam Hall B" },
    { id: 3, course: "Computer Science", date: "2025-12-20", time: "14:00", room: "Exam Hall C" },
  ]

  const officeHours = [
    { id: 1, day: "Friday", time: "14:00 - 15:30", location: "Office 315" },
    { id: 2, day: "Monday", time: "16:00 - 17:30", location: "Office 315" },
  ]

  const start = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 })
  const end = endOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 })
  const weekLabel = `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`

  const filteredWeekSchedule = weekSchedule.map((d) => ({
    ...d,
    classes: d.classes.filter(
      (c) => query === "" || c.course.toLowerCase().includes(query.toLowerCase())
    ),
  }))

  const classesThisWeek = filteredWeekSchedule.reduce((sum, d) => sum + d.classes.length, 0)

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Teaching Schedule</h1>
            <p className="text-white/80">Manage your class schedule and office hours</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setWeekOffset(weekOffset - 1)} className="px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10">Prev</button>
            <span className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm">{weekLabel}</span>
            <button onClick={() => setWeekOffset(weekOffset + 1)} className="px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10">Next</button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/assignments">Assignments</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/attendance">Attendance</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/grade-submission">Grade</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/student-management">Students</Link>
          <Link className="px-4 py-2 rounded-full text-sm bg-amber-500 text-black" href="/teacher/schedule">Schedule</Link>
        </div>
      </section>
      <div className="flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search course" className="bg-transparent outline-none text-sm" />
          </div>
          <div className="flex rounded-lg overflow-hidden border">
            <button onClick={() => setView("week")} className={`px-3 py-2 text-sm ${view === "week" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Week</button>
            <button onClick={() => setView("day")} className={`px-3 py-2 text-sm ${view === "day" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Day</button>
          </div>
          {view === "day" && (
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
              {["Monday","Tuesday","Wednesday","Thursday","Friday"].map((d) => (<option key={d} value={d}>{d}</option>))}
            </select>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Classes This Week</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{classesThisWeek}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Office Hours</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{officeHours.length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Upcoming Exams</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{upcomingExams.length}</p>
        </div>
      </div>

      {view === "week" && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Weekly Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWeekSchedule.map((day) => (
              <div key={day.day} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground text-lg">{day.day}</h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-muted">{day.classes.length} items</span>
                </div>
                {day.classes.length > 0 ? (
                  <div className="space-y-2">
                    {day.classes.map((cls, i) => (
                      <div key={i} className="p-3 rounded-lg border hover:bg-muted/60 transition-colors">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground">{cls.course}</p>
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{cls.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{cls.room}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No classes scheduled</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">{selectedDay}</h2>
          {filteredWeekSchedule.find((d) => d.day === selectedDay)?.classes.length ? (
            <div className="space-y-2">
              {filteredWeekSchedule
                .find((d) => d.day === selectedDay)!
                .classes.map((cls, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:bg-muted/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{cls.course}</p>
                      <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{cls.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{cls.room}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No classes scheduled</p>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Office Hours */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Office Hours</h2>
          <div className="space-y-4">
            {officeHours.map((hours) => (
              <div key={hours.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold text-foreground">{hours.day}</h3>
                <p className="text-sm text-muted-foreground mt-2">⏰ {hours.time}</p>
                <p className="text-sm text-muted-foreground">📍 {hours.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Exam Schedule</h2>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold text-foreground">{exam.course}</h3>
                <p className="text-sm text-muted-foreground mt-2">📅 {exam.date}</p>
                <p className="text-sm text-muted-foreground">⏰ {exam.time}</p>
                <p className="text-sm text-muted-foreground">📍 {exam.room}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
