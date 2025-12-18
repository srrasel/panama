"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Clock, MapPin, User as UserIcon, NotebookText, AlarmClock } from "lucide-react"
import { Loader2 } from "lucide-react"

export default function StudentSchedule() {
  const [schedule, setSchedule] = useState<any[]>([])
  const [upcomingExams, setUpcomingExams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/student/schedule")
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          const events = data.events
          
          // Filter classes and group by day
          // Note: Since we store specific dates, we should probably show the *current week's* classes or just recurring ones.
          // For now, let's group all future classes by day name to simulate a weekly schedule, 
          // or ideally, we should filter for the current week.
          // Let's assume the user wants to see their general weekly routine based on upcoming classes.
          
          // Better approach: Show classes for the next 7 days.
          const today = new Date()
          const nextWeek = new Date()
          nextWeek.setDate(today.getDate() + 7)
          
          const classes = events.filter((e: any) => {
             if (e.type !== "Class") return false
             const d = new Date(e.date)
             return d >= today // && d <= nextWeek // Show all future classes for now
          })
          
          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          const groupedClasses = days.map(day => {
            const dayClasses = classes.filter((c: any) => {
              const d = new Date(c.date)
              return d.toLocaleDateString("en-US", { weekday: "long" }) === day
            }).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            
            // Deduplicate if multiple same classes on different dates (e.g. recurring)
            // For a simple view, we just show unique time slots per day
            const uniqueSlots = new Map()
            dayClasses.forEach((c: any) => {
                const key = `${c.time}-${c.course}`
                if (!uniqueSlots.has(key)) {
                    uniqueSlots.set(key, c)
                }
            })
            
            return { day, classes: Array.from(uniqueSlots.values()) }
          }).filter(d => d.classes.length > 0)
          
          setSchedule(groupedClasses)
          
          // Filter exams and assignments
          const exams = events.filter((e: any) => e.type === "Exam" || e.type === "Assignment" || e.type === "Deadline")
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            
          setUpcomingExams(exams.map((e: any) => ({
            subject: e.course || e.title,
            title: e.title,
            date: new Date(e.date).toLocaleDateString(),
            time: e.time,
            type: e.type,
            location: e.location
          })))
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

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
            {schedule.length > 0 ? (
              <div className="space-y-6">
                {schedule.map((day) => (
                  <div key={day.day} className="">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3">{day.day}</h3>
                    <div className="space-y-3">
                      {day.classes.map((cls: any, i: number) => (
                        <div key={i} className="grid grid-cols-[120px_1fr] items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/40">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-foreground"><Clock className="h-4 w-4" /> {cls.time}</div>
                          <div>
                            <p className="text-foreground font-semibold">{cls.title}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                              {cls.instructor && <span className="inline-flex items-center gap-1"><UserIcon className="h-4 w-4" /> {cls.instructor}</span>}
                              {cls.location && <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {cls.location}</span>}
                              {cls.course && <span className="inline-flex items-center gap-1 text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">{cls.course}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No classes scheduled.</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
              <div className="flex items-center gap-3 mb-2"><NotebookText className="h-5 w-5 text-slate-500" /><span className="font-semibold text-foreground">Total Classes</span></div>
              <p className="text-3xl font-bold text-foreground">{schedule.reduce((a,b)=>a+b.classes.length,0)}</p>
            </div>
            <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
              <div className="flex items-center gap-3 mb-2"><AlarmClock className="h-5 w-5 text-slate-500" /><span className="font-semibold text-foreground">Next Event</span></div>
              {upcomingExams.length > 0 ? (
                <>
                  <p className="text-foreground truncate" title={upcomingExams[0].title}>{upcomingExams[0].title}</p>
                  <p className="text-sm text-muted-foreground">{upcomingExams[0].date} at {upcomingExams[0].time}</p>
                </>
              ) : (
                <p className="text-muted-foreground">None</p>
              )}
            </div>
            <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
              <div className="flex items-center gap-3 mb-2"><CalendarDays className="h-5 w-5 text-slate-500" /><span className="font-semibold text-foreground">Events Count</span></div>
              <p className="text-3xl font-bold text-foreground">{upcomingExams.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlarmClock className="h-5 w-5 text-slate-500" />
              <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
            </div>
            {upcomingExams.length > 0 ? (
              <div className="space-y-4">
                {upcomingExams.map((exam, i) => (
                  <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-border hover:bg-slate-50 dark:hover:bg-muted transition">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-foreground font-semibold">{exam.title}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold
                            ${exam.type === 'Exam' ? 'bg-red-100 text-red-700' : 
                              exam.type === 'Assignment' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'}`}>
                            {exam.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{exam.subject}</p>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {exam.date}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
