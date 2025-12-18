"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function GradeSubmission() {
  const [courses, setCourses] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [grades, setGrades] = useState<any[]>([])
  
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState("")
  
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingAssignments, setLoadingAssignments] = useState(false)
  const [loadingGrades, setLoadingGrades] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [assignmentTotal, setAssignmentTotal] = useState(100)

  // Fetch courses on mount
  useEffect(() => {
    fetch("/api/teacher/course-management/courses")
      .then(res => res.json())
      .then(data => {
        if (data.courses) {
          setCourses(data.courses)
          if (data.courses.length > 0) {
            setSelectedCourse(data.courses[0].id)
          }
        }
      })
      .finally(() => setLoadingCourses(false))
  }, [])

  // Fetch assignments when course changes
  useEffect(() => {
    if (!selectedCourse) return
    setLoadingAssignments(true)
    fetch(`/api/teacher/assignments?courseId=${selectedCourse}`)
      .then(res => res.json())
      .then(data => {
        if (data.assignments) {
          setAssignments(data.assignments)
          if (data.assignments.length > 0) {
            setSelectedAssignment(data.assignments[0].id)
          } else {
            setSelectedAssignment("")
            setGrades([])
          }
        }
      })
      .finally(() => setLoadingAssignments(false))
  }, [selectedCourse])

  // Fetch grades when assignment changes
  useEffect(() => {
    if (!selectedAssignment) return
    setLoadingGrades(true)
    fetch(`/api/teacher/assignments/${selectedAssignment}/grades`)
      .then(res => res.json())
      .then(data => {
        if (data.students) {
          // Transform to match UI state structure
          const formatted = data.students.map((s: any) => ({
            id: s.studentId,
            studentName: s.name,
            rollNo: s.email, // Using email as roll no for now
            submission: s.submission ? s.submission.status : "Not Submitted",
            grade: s.submission?.grade || 0,
            feedback: s.submission?.feedback || "",
            content: s.submission?.content
          }))
          setGrades(formatted)
          setAssignmentTotal(data.totalPoints || 100)
        }
      })
      .finally(() => setLoadingGrades(false))
  }, [selectedAssignment])

  const updateGrade = (studentId: string, newGrade: number) => {
    setGrades(grades.map((g) => (g.id === studentId ? { ...g, grade: newGrade } : g)))
  }

  const updateFeedback = (studentId: string, newFeedback: string) => {
    setGrades(grades.map((g) => (g.id === studentId ? { ...g, feedback: newFeedback } : g)))
  }

  const handleSubmitGrades = async () => {
    if (!selectedAssignment) return
    setSubmitted(true)
    
    // Save all grades
    // In a real app, track dirty fields and only save those.
    // For now, save all.
    const promises = grades.map(g => 
      fetch(`/api/teacher/assignments/${selectedAssignment}/grades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: g.id,
          grade: g.grade,
          feedback: g.feedback
        })
      })
    )

    await Promise.all(promises)

    setTimeout(() => setSubmitted(false), 2000)
  }

  const submittedCount = grades.filter((g) => g.submission === "Submitted" || g.submission === "Graded").length
  const gradedCount = grades.filter((g) => g.grade > 0).length
  
  const avgGrade = gradedCount > 0 
    ? Math.round(grades.reduce((sum, g) => sum + g.grade, 0) / gradedCount) 
    : 0

  const filteredGrades = grades.filter((g) =>
    (query === "" || g.studentName.toLowerCase().includes(query.toLowerCase()) || g.rollNo.toLowerCase().includes(query.toLowerCase())) &&
    (statusFilter === "All" || (statusFilter === "Submitted" ? (g.submission === "Submitted" || g.submission === "Graded") : g.submission === statusFilter))
  )

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Grade Submission</h1>
            <p className="text-white/80">Enter and manage student grades with feedback</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/assignments">Assignments</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/attendance">Attendance</Link>
          <Link className="px-4 py-2 rounded-full text-sm bg-amber-500 text-black" href="/teacher/grade-submission">Grade</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/student-management">Students</Link>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Course & Assignment Selector */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Select Course</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {loadingCourses ? <p className="text-sm text-muted-foreground">Loading courses...</p> : courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedCourse === course.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  <p className="font-semibold text-sm">{course.title}</p>
                  <p className="text-xs opacity-75 mt-1">{course.students} students</p>
                </button>
              ))}
              {!loadingCourses && courses.length === 0 && <p className="text-sm text-muted-foreground">No courses found.</p>}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Select Assignment</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {loadingAssignments ? <p className="text-sm text-muted-foreground">Loading assignments...</p> : assignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedAssignment === assignment.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  <p className="font-semibold text-sm">{assignment.title}</p>
                  <p className="text-xs opacity-75 mt-1">Max: {assignment.total} pts</p>
                </button>
              ))}
              {!loadingAssignments && assignments.length === 0 && <p className="text-sm text-muted-foreground">No assignments found.</p>}
            </div>
          </div>
        </div>

        {/* Stats & Grade Entry */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-muted-foreground text-sm font-medium">Submitted</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">{submittedCount}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-muted-foreground text-sm font-medium">Average Grade</p>
              <p className="text-3xl font-bold text-purple-700 mt-2">{avgGrade}</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <p className="text-muted-foreground text-sm font-medium">Max Points</p>
              <p className="text-3xl font-bold text-indigo-700 mt-2">{assignmentTotal}</p>
            </div>
          </div>

          {/* Grade Table */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Grade Entries</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="bg-transparent outline-none text-sm" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
                  {["All","Submitted","Not Submitted"].map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
                <button
                onClick={handleSubmitGrades}
                disabled={!selectedAssignment || loadingGrades}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  submitted ? "bg-green-100 text-green-700" : "bg-primary text-primary-foreground hover:bg-primary/90"
                } ${(!selectedAssignment || loadingGrades) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {submitted ? "✓ Saved" : "Save All Grades"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Student Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Grade</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingGrades && (
                    <tr><td colSpan={5} className="text-center py-4">Loading student data...</td></tr>
                  )}
                  {!loadingGrades && filteredGrades.length === 0 && (
                     <tr><td colSpan={5} className="text-center py-4 text-muted-foreground">No students found.</td></tr>
                  )}
                  {!loadingGrades && filteredGrades.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-4 text-foreground font-medium">
                        <div>{student.studentName}</div>
                        {student.content && (
                           <div className="text-xs text-blue-500 mt-1 truncate max-w-[150px]" title={student.content}>
                             {student.content.includes("Files:") ? "📎 Attached Files" : "📝 Text Submission"}
                           </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground text-sm">{student.rollNo}</td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            student.submission === "Submitted" || student.submission === "Graded"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.submission === "Graded" ? "Graded" : student.submission}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max={assignmentTotal}
                          value={student.grade}
                          onChange={(e) => updateGrade(student.id, Number.parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-border rounded bg-input text-foreground text-center font-semibold"
                        />
                        <span className="text-xs text-muted-foreground ml-2">/ {assignmentTotal}</span>
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          placeholder="Add feedback..."
                          value={student.feedback}
                          onChange={(e) => updateFeedback(student.id, e.target.value)}
                          className="w-full px-2 py-1 border border-border rounded bg-input text-foreground text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
