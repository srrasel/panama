"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("")
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 10))
  const [submitted, setSubmitted] = useState(false)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [classes, setClasses] = useState<{ id: string; name: string; students: number; period: string }[]>([])
  const [students, setStudents] = useState<{ id: string; name: string; roll: string; status: string }[]>([])

  useEffect(() => {
    ;(async () => {
      // Build query string
      const params = new URLSearchParams()
      if (selectedClass) params.set("classId", selectedClass)
      params.set("date", attendanceDate)
      
      const res = await fetch(`/api/teacher/attendance?${params.toString()}`).catch(() => null)
      const data = await res?.json().catch(() => null)
      
      if (data?.classes) {
        setClasses(data.classes)
        // If no class selected yet, select the first one
        if (!selectedClass && data.classes.length > 0) {
          setSelectedClass(data.classes[0].id)
        }
      }
      if (data?.students) setStudents(data.students)
    })()
  }, [selectedClass, attendanceDate])

  const currentClass = classes.find((c) => c.id === selectedClass)
  const presentCount = students.filter((s) => s.status === "present").length
  const absentCount = students.filter((s) => s.status === "absent").length
  const lateCount = students.filter((s) => s.status === "late").length

  const toggleAttendance = (studentId: string, newStatus: string) => {
    setStudents(students.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s)))
  }

  const handleSubmit = async () => {
    const payload = { classId: selectedClass, date: attendanceDate, students }
    await fetch("/api/teacher/attendance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => null)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Attendance Management</h1>
            <p className="text-white/80">Mark and manage student attendance</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/assignments">Assignments</Link>
          <Link className="px-4 py-2 rounded-full text-sm bg-amber-500 text-black" href="/teacher/attendance">Attendance</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/grade-submission">Grade</Link>
          <Link className="px-4 py-2 rounded-full text-sm border border-white/20 text-white hover:bg-white/10" href="/teacher/student-management">Students</Link>
        </div>
      </section>
      

      <div className="grid md:grid-cols-3 gap-6">
        {/* Class Selector */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Select Class</h2>
          <div className="space-y-2">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  selectedClass === cls.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted text-foreground"
                }`}
              >
                <p className="font-semibold">{cls.name}</p>
                <p className="text-sm opacity-75">{cls.students} students</p>
                <p className="text-xs opacity-60 mt-1">{cls.period}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex gap-4">
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input text-foreground"
            />
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students" className="bg-transparent outline-none text-sm" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
              {["All","present","late","absent"].map((s) => (<option key={s} value={s}>{s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}</option>))}
            </select>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" onClick={() => setStudents((prev) => prev.map((s) => ({ ...s, status: "present" })))} className="px-3 py-2 rounded-lg border">Mark All Present</button>
              <button type="button" onClick={() => setStudents((prev) => prev.map((s) => ({ ...s, status: "absent" })))} className="px-3 py-2 rounded-lg border">Mark All Absent</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-muted-foreground text-sm font-medium">Present</p>
              <p className="text-3xl font-bold text-green-700 mt-2">{presentCount}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-muted-foreground text-sm font-medium">Late</p>
              <p className="text-3xl font-bold text-amber-700 mt-2">{lateCount}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-muted-foreground text-sm font-medium">Absent</p>
              <p className="text-3xl font-bold text-red-700 mt-2">{absentCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{currentClass?.name}</h2>
          <button
            onClick={handleSubmit}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              submitted ? "bg-green-100 text-green-700" : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {submitted ? "✓ Submitted" : "Submit Attendance"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Roll No.</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((s) => (query === "" || s.name.toLowerCase().includes(query.toLowerCase()) || s.roll.toLowerCase().includes(query.toLowerCase())))
                .filter((s) => (statusFilter === "All" ? true : s.status === statusFilter))
                .map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-4 text-foreground">{student.name}</td>
                  <td className="px-4 py-4 text-muted-foreground">{student.roll}</td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === "present"
                          ? "bg-green-100 text-green-700"
                          : student.status === "late"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => toggleAttendance(student.id, "present")}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          student.status === "present"
                            ? "bg-green-500 text-white"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id, "late")}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          student.status === "late"
                            ? "bg-amber-500 text-white"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        L
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id, "absent")}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          student.status === "absent"
                            ? "bg-red-500 text-white"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        A
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
