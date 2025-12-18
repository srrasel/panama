"use client"

import { useEffect, useState } from "react"
import { useParent } from "../ParentContext"
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react"

export default function ParentEvents() {
  const { selectedChild } = useParent()
  const [events, setEvents] = useState<any[]>([])
  const [childName, setChildName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!selectedChild) return

    setIsLoading(true)
    // Fetch all upcoming events (limit=0)
    fetch(`/api/parent/upcoming-events?childId=${selectedChild.id}&limit=0`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.upcomingEvents || [])
        setChildName(data.childName || "")
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [selectedChild])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Exam":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "Assignment":
        return <Clock className="w-5 h-5 text-amber-500" />
      case "Meeting":
        return <MapPin className="w-5 h-5 text-blue-500" />
      default:
        return <Calendar className="w-5 h-5 text-green-500" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "Exam":
        return "bg-red-50 text-red-700 border-red-200"
      case "Assignment":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Meeting":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-green-50 text-green-700 border-green-200"
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Upcoming Events</h1>
            <p className="text-white/80">
              {childName ? `${childName}'s` : "Student"} schedule, exams, and deadlines
            </p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
            <span className="text-2xl font-bold">{events.length}</span>
            <span className="ml-2 text-sm opacity-80">Upcoming Items</span>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No upcoming events</h3>
          <p className="text-muted-foreground">You're all caught up!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card p-6 rounded-xl border border-border hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-muted rounded-lg border border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {new Date(event.date).toLocaleString("default", { month: "short" })}
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {new Date(event.date).getDate()}
                </span>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${getEventColor(
                      event.type
                    )}`}
                  >
                    {getEventIcon(event.type)}
                    {event.type}
                  </span>
                  {event.courseId && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Course Event
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-medium text-foreground">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {/* Placeholder for time if available */}
                {/* <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
