"use client"

import { useEffect, useState } from "react"
import { useParent } from "../ParentContext"
import { Calendar, Clock, MapPin, AlertCircle, Search, Filter } from "lucide-react"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"

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
        return <Calendar className="w-5 h-5 text-emerald-500" />
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
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
    }
  }

  return (
    <ParentPortalLayout
      title="Upcoming Events"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: "Events" },
      ]}
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Events Calendar</h1>
            <p className="text-slate-500 mt-2 text-lg">
              {childName ? `${childName}'s` : "Student"} schedule, exams, and deadlines
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">{events.length}</span>
              <span className="text-sm text-slate-500 font-medium">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Filters and Search - Placeholder for future implementation */}
        <div className="flex gap-4 overflow-x-auto pb-2">
           <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium shadow-lg shadow-slate-900/20 whitespace-nowrap">
             All Events
           </button>
           <button className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">
             Exams
           </button>
           <button className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">
             Assignments
           </button>
           <button className="px-5 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">
             Meetings
           </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-900 border-t-transparent"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white p-12 rounded-[1.8rem] shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No upcoming events</h3>
            <p className="text-slate-500 mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 group hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center"
              >
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {new Date(event.date).toLocaleString("default", { month: "short" })}
                  </span>
                  <span className="text-3xl font-bold text-slate-900">
                    {new Date(event.date).getDate()}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border ${getEventColor(
                        event.type
                      )}`}
                    >
                      {getEventIcon(event.type)}
                      {event.type}
                    </span>
                    {event.courseId && (
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg font-medium">
                        Course Event
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                  <p className="text-slate-500 font-medium">{event.description}</p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {/* Placeholder for time if available */}
                  {/* <p className="text-sm text-slate-500 mt-1">10:00 AM - 11:30 AM</p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ParentPortalLayout>
  )
}
