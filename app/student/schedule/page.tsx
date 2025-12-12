"use client"

import { CalendarDays, Clock, MapPin, User as UserIcon, NotebookText, AlarmClock } from "lucide-react"

export default function StudentSchedule() {
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "09:00 AM", course: "Advanced Calculus", instructor: "Dr. Sarah Johnson", room: "Lab 101" },
        { time: "11:00 AM", course: "Web Development", instructor: "Dr. Emily Wilson", room: "Computer Lab" },
        { time: "02:00 PM", course: "Modern History", instructor: "Prof. Michael Brown", room: "Room 305" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { time: "10:00 AM", course: "Literature & Composition", instructor: "Prof. James Miller", room: "Room 201" },
        { time: "01:00 PM", course: "Advanced Calculus", instructor: "Dr. Sarah Johnson", room: "Lab 101" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { time: "09:00 AM", course: "Web Development", instructor: "Dr. Emily Wilson", room: "Computer Lab" },
        { time: "02:00 PM", course: "Science Lab", instructor: "Dr. Robert Davis", room: "Science Building" },
      ],
    },
  ]

  const upcomingExams = [
    { subject: "Mathematics", date: "2025-12-18", time: "09:00 AM" },
    { subject: "English", date: "2025-12-20", time: "02:00 PM" },
    { subject: "Science", date: "2025-12-22", time: "10:00 AM" },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Schedule</h1>
            <p className="text-white/80">View your class schedule and upcoming exams</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm">Export</button>
            <button className="px-4 py-2 rounded-full bg-amber-500 text-black hover:bg-amber-600 transition text-sm">Add Reminder</button>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="h-5 w-5 text-slate-500" />
              <h2 className="text-xl font-bold text-foreground">Weekly Classes</h2>
            </div>
            <div className="space-y-6">
              {schedule.map((day) => (
                <div key={day.day} className="">
                  <h3 className="text-sm font-semibold text-slate-500 mb-3">{day.day}</h3>
                  <div className="space-y-3">
                    {day.classes.map((cls, i) => (
                      <div key={i} className="grid grid-cols-[120px_1fr] items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-foreground"><Clock className="h-4 w-4" /> {cls.time}</div>
                        <div>
                          <p className="text-foreground font-semibold">{cls.course}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="inline-flex items-center gap-1"><UserIcon className="h-4 w-4" /> {cls.instructor}</span>
                            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {cls.room}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
              <div className="flex items-center gap-3 mb-2"><NotebookText className="h-5 w-5 text-slate-500" /><span className="font-semibold text-foreground">Total Classes</span></div>
              <p className="text-3xl font-bold text-foreground">{schedule.reduce((a,b)=>a+b.classes.length,0)}</p>
            </div>
            <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
              <div className="flex items-center gap-3 mb-2"><AlarmClock className="h-5 w-5 text-slate-500" /><span className="font-semibold text-foreground">Next Exam</span></div>
              <p className="text-foreground">{upcomingExams[0].subject}</p>
              <p className="text-sm text-muted-foreground">{upcomingExams[0].date} at {upcomingExams[0].time}</p>
            </div>
            <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
              <div className="flex items-center gap-3 mb-2"><CalendarDays className="h-5 w-5 text-slate-500" /><span className="font-semibold text-foreground">Exam Count</span></div>
              <p className="text-3xl font-bold text-foreground">{upcomingExams.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlarmClock className="h-5 w-5 text-slate-500" />
              <h2 className="text-xl font-bold text-foreground">Upcoming Exams</h2>
            </div>
            <div className="space-y-4">
              {upcomingExams.map((exam, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-muted transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-foreground font-semibold">{exam.subject}</p>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {exam.date}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold">Add to Calendar</button>
                      <button className="px-3 py-2 rounded-md bg-muted text-foreground text-xs font-semibold">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
