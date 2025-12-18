"use client"

import { useState, useEffect } from "react"

export default function AttendanceManagement() {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [attendanceData, setAttendanceData] = useState<any[]>([])
  const [courses, setCourses] = useState<string[]>(["all"])

  useEffect(() => {
    fetch("/api/admin/attendance")
      .then((res) => res.json())
      .then((data) => {
        if (data.records) setAttendanceData(data.records)
        if (data.courses) setCourses(["all", ...data.courses])
      })
      .catch((err) => console.error(err))
  }, [])

  const filteredData =
    selectedCourse === "all" ? attendanceData : attendanceData.filter((d) => d.course === selectedCourse)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "absent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Management</h1>
        <p className="text-muted-foreground">Track and manage student attendance across courses</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {courses.map((course) => (
          <button
            key={course}
            onClick={() => setSelectedCourse(course)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCourse === course
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            }`}
          >
            {course.charAt(0).toUpperCase() + course.slice(1)}
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">
            {filteredData.filter((d) => d.status === "present").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Late Today</h3>
          <p className="text-3xl font-bold text-yellow-600">{filteredData.filter((d) => d.status === "late").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">{filteredData.filter((d) => d.status === "absent").length}</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Course</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr key={record.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{record.studentName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{record.course}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{record.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">{record.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
