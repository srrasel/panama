"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Clock, MapPin, User as UserIcon, NotebookText, AlarmClock, Download } from "lucide-react"
import { Loader2 } from "lucide-react"

import StudentPortalLayout from "@/components/student/student-portal-layout"

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
    <StudentPortalLayout
      title="Schedule"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Schedule" }
      ]}
    >
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-2">
            <CalendarDays className="h-5 w-5 text-[#007bff]" />
            <h2 className="text-lg font-bold text-slate-700">Schedule Management</h2>
        </div>
        <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition text-sm font-bold shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Calendar
            </button>
            <button className="px-6 py-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition text-sm font-bold shadow-lg shadow-amber-200 flex items-center gap-2">
              <AlarmClock className="w-4 h-4" /> Add Reminder
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <NotebookText className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-600 text-sm">Total Classes</span>
          </div>
          <p className="text-4xl font-extrabold text-slate-800 mt-2">{schedule.reduce((a,b)=>a+b.classes.length,0)}</p>
        </div>
        <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <AlarmClock className="h-5 w-5" />
              </div>
              <span className="font-bold text-slate-600 text-sm">Next Event</span>
          </div>
          {upcomingExams.length > 0 ? (
            <div className="mt-2">
              <p className="text-slate-800 font-bold truncate" title={upcomingExams[0].title}>{upcomingExams[0].title}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{upcomingExams[0].date} • {upcomingExams[0].time}</p>
            </div>
          ) : (
            <p className="text-slate-400 font-medium mt-2">None</p>
          )}
        </div>
        <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <CalendarDays className="h-5 w-5" />
              </div>
              <span className="font-bold text-slate-600 text-sm">Events Count</span>
          </div>
          <p className="text-4xl font-extrabold text-slate-800 mt-2">{upcomingExams.length}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                 <CalendarDays className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Weekly Classes</h2>
            </div>
            {schedule.length > 0 ? (
              <div className="space-y-8">
                {schedule.map((day) => (
                  <div key={day.day} className="">
                    <h3 className="text-sm font-bold text-[#007bff] uppercase tracking-wider mb-4 px-1">{day.day}</h3>
                    <div className="space-y-4">
                      {day.classes.map((cls: any, i: number) => (
                        <div key={i} className="group grid grid-cols-[120px_1fr] items-center gap-6 p-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300">
                          <div className="flex items-center gap-2 text-slate-600 font-bold bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                            <Clock className="h-4 w-4 text-[#007bff]" /> {cls.time}
                          </div>
                          <div>
                            <p className="text-slate-800 font-bold text-lg mb-1 group-hover:text-[#007bff] transition-colors">{cls.title}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                              {cls.instructor && <span className="inline-flex items-center gap-1"><UserIcon className="h-4 w-4 text-slate-400" /> {cls.instructor}</span>}
                              {cls.location && <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-slate-400" /> {cls.location}</span>}
                              {cls.course && <span className="inline-flex items-center gap-1 text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-lg font-bold">{cls.course}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium">No classes scheduled for this week.</p>
              </div>
            )}
          </div>


        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm p-8 sticky top-8">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                  <AlarmClock className="h-6 w-6" />
               </div>
              <h2 className="text-2xl font-bold text-slate-800">Upcoming Events</h2>
            </div>
            {upcomingExams.length > 0 ? (
              <div className="space-y-4">
                {upcomingExams.map((exam, i) => (
                  <div key={i} className="group p-5 rounded-[1.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-2">
                           <span className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider
                            ${exam.type === 'Exam' ? 'bg-red-100 text-red-700' : 
                              exam.type === 'Assignment' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'}`}>
                            {exam.type}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{exam.date}</span>
                        </div>
                        
                        <p className="text-slate-800 font-bold group-hover:text-[#007bff] transition-colors">{exam.title}</p>
                        <p className="text-sm text-slate-500 font-medium mt-1">{exam.subject}</p>
                        
                        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-3 text-xs font-bold text-slate-500">
                          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.time}</span>
                          {exam.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {exam.location}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <div className="text-center py-8">
                  <p className="text-slate-400 font-medium">No upcoming events found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </StudentPortalLayout>
  )
}
