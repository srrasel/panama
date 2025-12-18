"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FileText, Clock, BookOpen, CheckCircle, AlertCircle } from "lucide-react"

export default function StudentAssignments() {
  const [filter, setFilter] = useState<string>("All")
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/student/assignments")
      .then((res) => res.json())
      .then((data) => {
        if (data.assignments) setAssignments(data.assignments)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Submitted":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getAccent = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-amber-300"
      case "In Progress":
        return "border-blue-300"
      case "Submitted":
        return "border-green-300"
      default:
        return "border-slate-200"
    }
  }

  const filtered = assignments.filter((a) => (filter === "All" ? true : a.status === filter))

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Assignments</h1>
            <p className="text-white/80">View and submit your assignments</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: "All" },
              { label: "Pending" },
              { label: "In Progress" },
              { label: "Submitted" },
            ].map((f) => (
              <button
                key={f.label}
                onClick={() => setFilter(f.label)}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === f.label ? "bg-amber-500 text-black" : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((assignment) => (
          <div
            key={assignment.id}
            className={`bg-white dark:bg-card rounded-xl border ${getAccent(assignment.status)} p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{assignment.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" /> {assignment.course}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
            </div>

            <p className="text-foreground mb-4">{assignment.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Due</span>
                <span className="font-semibold text-foreground">{assignment.dueDate}</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/student/assignments/${assignment.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <AlertCircle className="h-4 w-4" />
                  View Details
                </Link>
                {assignment.status !== "Submitted" && (
                  <Link
                    href={`/student/assignments/${assignment.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Submit Work
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
