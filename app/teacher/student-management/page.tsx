"use client"

import { useState } from "react"
import Link from "next/link"

export default function StudentManagement() {
  const [selectedCourse, setSelectedCourse] = useState("all")

  const courses = ["all", "Advanced Mathematics 101", "Physics Lab", "Computer Science"]

  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john@demo.com",
      course: "Advanced Mathematics 101",
      attendance: 95,
      avgGrade: 88,
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma@demo.com",
      course: "Advanced Mathematics 101",
      attendance: 92,
      avgGrade: 92,
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@demo.com",
      course: "Physics Lab",
      attendance: 85,
      avgGrade: 78,
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@demo.com",
      course: "Computer Science",
      attendance: 98,
      avgGrade: 95,
      status: "Active",
    },
    {
      id: 5,
      name: "James Brown",
      email: "james@demo.com",
      course: "Physics Lab",
      attendance: 88,
      avgGrade: 85,
      status: "Active",
    },
  ]

  const filteredStudents = selectedCourse === "all" ? students : students.filter((s) => s.course === selectedCourse)

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Student Management</h1>
            <p className="text-white/80">View student progress, attendance, and personal information</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/assignments">Assignments</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/attendance">Attendance</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/grade-submission">Grade</Link>
          <Link className="px-4 py-2 rounded-full text-sm bg-amber-500 text-black" href="/teacher/student-management">Students</Link>
        </div>
      </section>
    

      {/* Filter by Course */}
      <div className="bg-card rounded-lg border border-border p-6">
        <label className="block text-sm font-medium text-foreground mb-3">Filter by Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-border bg-input text-foreground"
        >
          {courses.map((course) => (
            <option key={course} value={course}>
              {course === "all" ? "All Courses" : course}
            </option>
          ))}
        </select>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">{student.course}</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {student.status}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold text-foreground mt-2">{student.attendance}%</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${student.attendance}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Grade</p>
                <p className="text-2xl font-bold text-primary mt-2">{student.avgGrade}%</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${student.avgGrade}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Performance</p>
                <p className="text-lg font-bold text-foreground mt-2">
                  {student.avgGrade >= 90 ? "Excellent" : student.avgGrade >= 80 ? "Good" : "Average"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors">
                View Profile
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors">
                Send Message
              </button>
              <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium transition-colors">
                View Grades
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
