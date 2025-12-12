"use client"

import { useState } from "react"
import Link from "next/link"

export default function GradeSubmission() {
  const [selectedCourse, setSelectedCourse] = useState("course1")
  const [selectedAssignment, setSelectedAssignment] = useState("assignment1")
  const [submitted, setSubmitted] = useState(false)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const courses = [
    { id: "course1", name: "Advanced Mathematics 101", assignments: 5 },
    { id: "course2", name: "Physics Lab", assignments: 4 },
    { id: "course3", name: "Computer Science", assignments: 6 },
  ]

  const assignments = [
    { id: "assignment1", name: "Calculus Problem Set #5", dueDate: "2025-12-05", total: 100 },
    { id: "assignment2", name: "Quiz 3", dueDate: "2025-12-08", total: 50 },
    { id: "assignment3", name: "Project Phase 1", dueDate: "2025-12-10", total: 150 },
  ]

  const [grades, setGrades] = useState([
    { id: 1, studentName: "John Adams", rollNo: "MA101", submission: "Submitted", grade: 85, feedback: "" },
    { id: 2, studentName: "Sarah Mitchell", rollNo: "MA102", submission: "Submitted", grade: 92, feedback: "" },
    { id: 3, studentName: "James Wilson", rollNo: "MA103", submission: "Submitted", grade: 78, feedback: "" },
    { id: 4, studentName: "Emily Davis", rollNo: "MA104", submission: "Submitted", grade: 88, feedback: "" },
    { id: 5, studentName: "Michael Brown", rollNo: "MA105", submission: "Submitted", grade: 95, feedback: "" },
    { id: 6, studentName: "Jessica Taylor", rollNo: "MA106", submission: "Submitted", grade: 82, feedback: "" },
    { id: 7, studentName: "David Anderson", rollNo: "MA107", submission: "Not Submitted", grade: 0, feedback: "" },
  ])

  const updateGrade = (studentId: number, newGrade: number) => {
    setGrades(grades.map((g) => (g.id === studentId ? { ...g, grade: newGrade } : g)))
  }

  const updateFeedback = (studentId: number, newFeedback: string) => {
    setGrades(grades.map((g) => (g.id === studentId ? { ...g, feedback: newFeedback } : g)))
  }

  const handleSubmitGrades = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  const currentAssignment = assignments.find((a) => a.id === selectedAssignment)
  const submittedCount = grades.filter((g) => g.submission === "Submitted").length
  const avgGrade = Math.round(
    grades.filter((g) => g.grade > 0).reduce((sum, g) => sum + g.grade, 0) / grades.filter((g) => g.grade > 0).length,
  )

  const filteredGrades = grades.filter((g) =>
    (query === "" || g.studentName.toLowerCase().includes(query.toLowerCase()) || g.rollNo.toLowerCase().includes(query.toLowerCase())) &&
    (statusFilter === "All" || g.submission === statusFilter)
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
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Grade Submission</h1>
        <p className="text-muted-foreground">Enter and manage student grades with feedback</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Course & Assignment Selector */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Select Course</h3>
            <div className="space-y-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedCourse === course.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  <p className="font-semibold text-sm">{course.name}</p>
                  <p className="text-xs opacity-75 mt-1">{course.assignments} assignments</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Select Assignment</h3>
            <div className="space-y-2">
              {assignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedAssignment === assignment.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  <p className="font-semibold text-sm">{assignment.name}</p>
                  <p className="text-xs opacity-75 mt-1">Max: {assignment.total} pts</p>
                </button>
              ))}
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
              <p className="text-3xl font-bold text-indigo-700 mt-2">{currentAssignment?.total}</p>
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
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  submitted ? "bg-green-100 text-green-700" : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                >
                  {submitted ? "✓ Submitted" : "Submit All Grades"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Student Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Roll No.</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Grade</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-4 text-foreground font-medium">{student.studentName}</td>
                      <td className="px-4 py-4 text-muted-foreground">{student.rollNo}</td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            student.submission === "Submitted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.submission}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max={currentAssignment?.total}
                          value={student.grade}
                          onChange={(e) => updateGrade(student.id, Number.parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-border rounded bg-input text-foreground text-center font-semibold"
                        />
                        <span className="text-xs text-muted-foreground ml-2">/ {currentAssignment?.total}</span>
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
