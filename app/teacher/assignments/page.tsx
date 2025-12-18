"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AssignmentsGrading() {
  const [selectedTab, setSelectedTab] = useState("pending")
  const [showCreateAssignment, setShowCreateAssignment] = useState(false)
  const [query, setQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [items, setItems] = useState<any[]>([])
  const [teacherCourses, setTeacherCourses] = useState<any[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newCourseId, setNewCourseId] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newDueDate, setNewDueDate] = useState("")
  const [newTotal, setNewTotal] = useState<number | "">("")

  

  useEffect(() => {
    ;(async () => {
      // Fetch assignments
      const res = await fetch("/api/teacher/assignments").catch(() => null)
      const data = await res?.json().catch(() => null)
      if (data?.assignments) setItems(data.assignments)

      // Fetch courses for dropdown
      const resCourses = await fetch("/api/teacher/course-management/courses").catch(() => null)
      const dataCourses = await resCourses?.json().catch(() => null)
      if (dataCourses?.courses) {
        setTeacherCourses(dataCourses.courses)
        if (dataCourses.courses.length > 0) {
          setNewCourseId(dataCourses.courses[0].id)
        }
      }
    })()
  }, [])

  const courses = ["All", ...teacherCourses.map(c => c.title)]
  const pendingAssignments = items.filter((a) => a.status === "Pending")
  const gradedAssignments = items.filter((a) => a.status === "Graded")

  const filteredPending = pendingAssignments.filter((a) =>
    (courseFilter === "All" || a.course === courseFilter) &&
    (statusFilter === "All" || statusFilter === "Pending") &&
    (query === "" || a.title.toLowerCase().includes(query.toLowerCase()) || a.course.toLowerCase().includes(query.toLowerCase()))
  )
  const filteredGraded = gradedAssignments.filter((a) =>
    (courseFilter === "All" || a.course === courseFilter) &&
    (statusFilter === "All" || statusFilter === "Graded") &&
    (query === "" || a.title.toLowerCase().includes(query.toLowerCase()) || a.course.toLowerCase().includes(query.toLowerCase()))
  )

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      title: newTitle,
      courseId: newCourseId,
      description: newDescription,
      dueDate: newDueDate,
      total: newTotal === "" ? 100 : Number(newTotal),
    }
    const res = await fetch("/api/teacher/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null)
    const data = await res?.json().catch(() => null)
    if (data?.assignment) {
      setItems((prev) => [data.assignment, ...prev])
      setShowCreateAssignment(false)
      setNewTitle("")
      setNewDescription("")
      setNewDueDate("")
      setNewTotal("")
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Assignments & Grading</h1>
            <p className="text-white/80">Create assignments and grade student submissions</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="px-4 py-2 rounded-full text-sm bg-amber-500 text-black" href="/teacher/assignments">Assignments</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/attendance">Attendance</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/grade-submission">Grade</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/student-management">Students</Link>
        </div>
      </section>
      <div className="flex items-center justify-between">
       
        <button
          onClick={() => setShowCreateAssignment(!showCreateAssignment)}
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          + Create Assignment
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Pending Grading</p>
          <p className="text-3xl font-bold text-indigo-700 mt-2">{pendingAssignments.length}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Graded</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{gradedAssignments.length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Due Soon</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{
            pendingAssignments.filter((a) => new Date(a.dueDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000).length
          }</p>
        </div>
      </div>

      {showCreateAssignment && (
        <div className="bg-card rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Create New Assignment</h2>
          <form className="space-y-6" onSubmit={handleCreate}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assignment Title</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground" placeholder="Enter assignment title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Course</label>
                <select value={newCourseId} onChange={(e) => setNewCourseId(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground">
                  {teacherCourses.map((c) => (<option key={c.id} value={c.id}>{c.title}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground" rows={4} placeholder="Assignment details"></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
                <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Total Points</label>
                <input type="number" value={newTotal === "" ? "" : String(newTotal)} onChange={(e) => setNewTotal(e.target.value === "" ? "" : Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground" placeholder="100" />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
              >
                Create Assignment
              </button>
              <button
                type="button"
                onClick={() => setShowCreateAssignment(false)}
                className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 border-b border-border">
        <button
          onClick={() => setSelectedTab("pending")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            selectedTab === "pending"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Pending Grading ({pendingAssignments.length})
        </button>
        <button
          onClick={() => setSelectedTab("graded")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            selectedTab === "graded"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Graded ({gradedAssignments.length})
        </button>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="bg-transparent outline-none text-sm" />
          </div>
          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
            {courses.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
            {["All","Pending","Graded"].map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
      </div>

      {/* Pending Grading */}
      {selectedTab === "pending" && (
        <div className="space-y-4">
          {filteredPending.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                  {assignment.submissions}/{assignment.total} Submitted
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                  <div className="mt-2">
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/teacher/grade-submission" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors">Grade Submissions</Link>
                  <button className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium transition-colors">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Graded */}
      {selectedTab === "graded" && (
        <div className="space-y-4">
          {filteredGraded.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {assignment.graded}/{assignment.total} Graded
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">
                    Average Score: <span className="font-bold text-primary">{assignment.avgScore}%</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium transition-colors">View Details</button>
                  <Link href="/teacher/grade-submission" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors">Open Gradebook</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
