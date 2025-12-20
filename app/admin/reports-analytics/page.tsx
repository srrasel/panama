"use client"

import { useState, useEffect } from "react"

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState("grades")
  const [dateRange, setDateRange] = useState("month")
  const [gradeReports, setGradeReports] = useState<any[]>([])
  const [attendanceReports, setAttendanceReports] = useState<any[]>([])
  const [performanceReports, setPerformanceReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then(res => res.json())
      .then(data => {
        if (data.gradeReports) setGradeReports(data.gradeReports)
        if (data.attendanceReports) setAttendanceReports(data.attendanceReports)
        if (data.performanceReports) setPerformanceReports(data.performanceReports)
      })
      .catch(err => console.error("Failed to fetch analytics:", err))
      .finally(() => setLoading(false))
  }, [])


  const handleDownload = () => {
    let headers = []
    let data = []
    let filename = `report-${reportType}-${new Date().toISOString().split('T')[0]}.csv`

    if (reportType === "grades") {
      headers = ["Course", "Average Grade", "Students Enrolled", "Pass Rate (%)"]
      data = gradeReports.map(r => [r.course, r.avgGrade, r.students, r.passRate])
    } else if (reportType === "attendance") {
      headers = ["Course", "Average Attendance (%)", "Total Days", "Total Absences"]
      data = attendanceReports.map(r => [r.course, r.avgAttendance, r.totalDays, r.absences])
    } else if (reportType === "performance") {
      headers = ["Metric", "Value", "Growth"]
      data = performanceReports.map(r => [r.metric, r.value, r.growth])
    }

    if (data.length === 0) {
      alert("No data available to download.")
      return
    }

    const csvContent = [
      headers.join(","),
      ...data.map(row => row.map(item => `"${item}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading analytics...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate reports on grades, attendance, and performance</p>
        </div>
        <button 
          onClick={handleDownload}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
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
