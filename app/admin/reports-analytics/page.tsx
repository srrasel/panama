"use client"

import { useState } from "react"

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState("grades")
  const [dateRange, setDateRange] = useState("month")

  const gradeReports = [
    { course: "Web Development", avgGrade: 8.5, students: 245, passRate: 94 },
    { course: "Data Science", avgGrade: 7.8, students: 198, passRate: 88 },
    { course: "Mobile Apps", avgGrade: 8.2, students: 156, passRate: 91 },
    { course: "AI & Machine Learning", avgGrade: 7.5, students: 134, passRate: 85 },
  ]

  const attendanceReports = [
    { course: "Web Development", avgAttendance: 92, totalDays: 45, absences: 18 },
    { course: "Data Science", avgAttendance: 88, totalDays: 40, absences: 24 },
    { course: "Mobile Apps", avgAttendance: 95, totalDays: 38, absences: 8 },
    { course: "AI & Machine Learning", avgAttendance: 86, totalDays: 42, absences: 32 },
  ]

  const performanceReports = [
    { metric: "Active Students", value: 2450, growth: "+12%" },
    { metric: "Active Teachers", value: 185, growth: "+5%" },
    { metric: "Total Courses", value: 64, growth: "+8%" },
    { metric: "Course Completion Rate", value: "78%", growth: "+3%" },
    { metric: "Student Satisfaction", value: "4.5/5", growth: "+0.2" },
    { metric: "System Uptime", value: "99.8%", growth: "-0.1%" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate reports on grades, attendance, and performance</p>
        </div>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          Download Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground"
          >
            <option value="grades">Grade Reports</option>
            <option value="attendance">Attendance Reports</option>
            <option value="performance">Performance Reports</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Grade Reports */}
      {reportType === "grades" && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Grade Reports by Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gradeReports.map((report, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{report.course}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Grade</span>
                    <span className="text-lg font-bold text-foreground">{report.avgGrade}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Students Enrolled</span>
                    <span className="text-lg font-bold text-foreground">{report.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pass Rate</span>
                    <span className="text-lg font-bold text-green-600">{report.passRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Reports */}
      {reportType === "attendance" && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Attendance Reports by Course</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Avg Attendance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Days</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Absences</th>
                </tr>
              </thead>
              <tbody>
                {attendanceReports.map((report, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{report.course}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-green-500 rounded-full h-2"
                            style={{ width: `${report.avgAttendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{report.avgAttendance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{report.totalDays}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">{report.absences}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Performance Reports */}
      {reportType === "performance" && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">System Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceReports.map((report, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{report.metric}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">{report.value}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      report.growth.includes("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {report.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
