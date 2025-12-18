"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { addWeeks, startOfWeek, endOfWeek, format, isSameDay, parseISO } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Plus, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react"

export default function TeacherSchedule() {
  const [view, setView] = useState<"week" | "day">("week")
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString("en-US", { weekday: "long" }))
  const [query, setQuery] = useState("")
  const [events, setEvents] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "Class",
    date: new Date().toISOString().split('T')[0],
    startTime: "09:00",
    endTime: "10:30",
    courseId: "none",
    location: "",
    description: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [scheduleRes, coursesRes] = await Promise.all([
        fetch("/api/teacher/schedule"),
        fetch("/api/teacher/course-management/courses")
      ])
      
      const scheduleData = await scheduleRes.json()
      const coursesData = await coursesRes.json()
      
      if (scheduleData.schedules) {
        setEvents(scheduleData.schedules)
      }
      if (coursesData.courses) {
        setCourses(coursesData.courses)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load schedule")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      toast.error("Please fill in all required fields")
      return
    }

    setSubmitting(true)
    try {
      // Combine date and time
      const startDateTime = new Date(`${newEvent.date}T${newEvent.startTime}`)
      const endDateTime = new Date(`${newEvent.date}T${newEvent.endTime}`)

      const res = await fetch("/api/teacher/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEvent.title,
          type: newEvent.type,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          location: newEvent.location,
          description: newEvent.description,
          courseId: newEvent.courseId === "none" ? null : newEvent.courseId
        })
      })

      if (!res.ok) throw new Error("Failed to create event")

      toast.success("Event created successfully")
      setIsAddOpen(false)
      fetchData() // Reload data
      
      // Reset form
      setNewEvent({
        title: "",
        type: "Class",
        date: new Date().toISOString().split('T')[0],
        startTime: "09:00",
        endTime: "10:30",
        courseId: "none",
        location: "",
        description: ""
      })
    } catch (error) {
      console.error(error)
      toast.error("Failed to create event")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return
    
    try {
      const res = await fetch(`/api/teacher/schedule/${id}`, {
        method: "DELETE"
      })
      
      if (!res.ok) throw new Error("Failed to delete")
      
      toast.success("Event deleted")
      setEvents(events.filter(e => e.id !== id))
    } catch (error) {
      toast.error("Failed to delete event")
    }
  }

  const start = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 })
  const end = endOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 })
  const weekLabel = `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`

  // Group events by day for the week view
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const groupedEvents = weekDays.map((dayName, index) => {
    const currentDayDate = new Date(start)
    currentDayDate.setDate(start.getDate() + index)
    
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.startTime)
      return isSameDay(eventDate, currentDayDate) && 
             (query === "" || event.title.toLowerCase().includes(query.toLowerCase()) || 
              event.course?.title?.toLowerCase().includes(query.toLowerCase()))
    })
    
    return {
      day: dayName,
      date: currentDayDate,
      events: dayEvents.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    }
  })

  const classesThisWeek = groupedEvents.reduce((sum, d) => sum + d.events.filter(e => e.type === "Class").length, 0)
  const officeHoursCount = events.filter(e => e.type === "OfficeHours").length // Total, or maybe filter by week? Let's just show total for now or filter
  // Let's filter office hours and exams by week too for the stats cards
  const thisWeekEvents = events.filter(e => {
    const d = new Date(e.startTime)
    return d >= start && d <= end
  })
  const officeHoursThisWeek = thisWeekEvents.filter(e => e.type === "OfficeHours").length
  const examsThisWeek = thisWeekEvents.filter(e => e.type === "Exam").length

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
        <div className="mt-6 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/assignments">Assignments</Link>
            <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/attendance">Attendance</Link>
            <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/grade-submission">Grade</Link>
            <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/student-management">Students</Link>
            <Link className="px-4 py-2 rounded-full text-sm bg-amber-500 text-black" href="/teacher/schedule">Schedule</Link>
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-slate-900 hover:bg-white/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Schedule Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      placeholder="e.g. Math Class" 
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={newEvent.type} 
                      onValueChange={(val) => setNewEvent({...newEvent, type: val})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Class">Class</SelectItem>
                        <SelectItem value="OfficeHours">Office Hours</SelectItem>
                        <SelectItem value="Exam">Exam</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input 
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input 
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input 
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Course (Optional)</Label>
                  <Select 
                    value={newEvent.courseId} 
                    onValueChange={(val) => setNewEvent({...newEvent, courseId: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {courses.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    placeholder="e.g. Room 101" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Additional details..." 
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  />
                </div>
                
                <Button className="w-full" onClick={handleCreateEvent} disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="bg-transparent outline-none text-sm" />
          </div>
          <div className="flex rounded-lg overflow-hidden border">
            <button onClick={() => setView("week")} className={`px-3 py-2 text-sm ${view === "week" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Week</button>
            <button onClick={() => setView("day")} className={`px-3 py-2 text-sm ${view === "day" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Day</button>
          </div>
          {view === "day" && (
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
              {weekDays.map((d) => (<option key={d} value={d}>{d}</option>))}
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
          <p className="text-muted-foreground text-sm">Office Hours This Week</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{officeHoursThisWeek}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Exams This Week</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{examsThisWeek}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {view === "week" && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Weekly Schedule</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedEvents.map((day) => (
                  <div key={day.day} className={`border border-border rounded-lg p-4 ${isSameDay(day.date, new Date()) ? 'ring-2 ring-primary/20' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{day.day}</h3>
                        <p className="text-xs text-muted-foreground">{format(day.date, "MMM d")}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-muted">{day.events.length} items</span>
                    </div>
                    {day.events.length > 0 ? (
                      <div className="space-y-2">
                        {day.events.map((event, i) => (
                          <div key={event.id} className="p-3 rounded-lg border hover:bg-muted/60 transition-colors group relative">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-foreground truncate">{event.title}</p>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold
                                ${event.type === 'Class' ? 'bg-blue-100 text-blue-700' : 
                                  event.type === 'Exam' ? 'bg-red-100 text-red-700' :
                                  event.type === 'OfficeHours' ? 'bg-emerald-100 text-emerald-700' :
                                  'bg-gray-100 text-gray-700'}`}>
                                {event.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>
                                {format(new Date(event.startTime), "HH:mm")} - {format(new Date(event.endTime), "HH:mm")}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            <button 
                              onClick={() => handleDeleteEvent(event.id)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm py-4 text-center">No events</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "day" && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">{selectedDay}</h2>
              {(() => {
                const dayData = groupedEvents.find(d => d.day === selectedDay)
                if (!dayData || dayData.events.length === 0) {
                  return <p className="text-muted-foreground">No classes scheduled</p>
                }
                return (
                  <div className="space-y-2">
                    {dayData.events.map((event, i) => (
                      <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/60 transition-colors flex justify-between items-center group">
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-foreground text-lg">{event.title}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs uppercase font-bold
                                ${event.type === 'Class' ? 'bg-blue-100 text-blue-700' : 
                                  event.type === 'Exam' ? 'bg-red-100 text-red-700' :
                                  event.type === 'OfficeHours' ? 'bg-emerald-100 text-emerald-700' :
                                  'bg-gray-100 text-gray-700'}`}>
                              {event.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}</span>
                            {event.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>}
                            {event.course && <span>Course: {event.course.title}</span>}
                          </div>
                          {event.description && <p className="text-sm text-muted-foreground mt-2">{event.description}</p>}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          )}
        </>
      )}
    </div>
  )
}
