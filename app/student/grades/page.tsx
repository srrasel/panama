"use client"
import { useEffect, useState } from "react"
import { Download, Mail, CalendarDays, BarChart3 } from "lucide-react"

import StudentPortalLayout from "@/components/student/student-portal-layout"

export default function StudentGrades() {
  const [selectedTerm, setSelectedTerm] = useState("term1")
  const [gradesData, setGradesData] = useState<Record<string, any[]>>({ term1: [], term2: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/student/grades")
      .then((res) => res.json())
      .then((data) => {
        if (data.gradesData) {
          setGradesData(data.gradesData)
        }
      })
      .catch((err) => console.error("Error fetching grades:", err))
      .finally(() => setLoading(false))
  }, [])

  const currentTermGrades = gradesData[selectedTerm as keyof typeof gradesData] || []
  const avgPercentage = currentTermGrades.length > 0 
    ? Math.round(currentTermGrades.reduce((sum, g) => sum + g.percentage, 0) / currentTermGrades.length)
    : 0

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "border-green-300 text-green-700 bg-green-50"
    if (grade.startsWith("B")) return "border-amber-300 text-amber-700 bg-amber-50"
    return "border-slate-200 text-slate-700 bg-slate-50"
  }

  if (loading) {
    return <div className="p-10 text-center">Loading grades...</div>
  }

  return (
    <StudentPortalLayout
      title="Grades & Reports"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/student/dashboard" },
        { label: "Grades" }
      ]}
    >
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-2">
            <BarChart3 className="h-5 w-5 text-[#007bff]" />
            <h2 className="text-lg font-bold text-slate-700">Grade Report</h2>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-1.5 pr-4 rounded-xl border border-slate-200">
            <span className="bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500">Term</span>
            <select 
              value={selectedTerm} 
              onChange={(e) => setSelectedTerm(e.target.value)} 
              className="bg-transparent border-none text-slate-800 font-bold focus:ring-0 cursor-pointer text-sm outline-none"
            >
              <option value="term1">Term 1 - Fall 2024</option>
              <option value="term2">Term 2 - Spring 2025</option>
            </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <div className="w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Average</p>
          <div>
             <p className="text-4xl font-extrabold text-[#007bff] mt-2">{avgPercentage}%</p>
             <p className="text-xs text-slate-400 mt-1 font-medium">Across all subjects</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <div className="w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Overall Grade</p>
          <div>
            <p className="text-4xl font-extrabold text-emerald-600 mt-2">A-</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Outstanding performance</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <div className="w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Subjects</p>
          <div>
            <p className="text-4xl font-extrabold text-purple-600 mt-2">{currentTermGrades.length}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Total enrolled courses</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <div className="w-24 h-24 bg-amber-500 rounded-full blur-2xl"></div>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">GPA</p>
          <div>
            <p className="text-4xl font-extrabold text-amber-500 mt-2">3.9</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Out of 4.0 Scale</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-800">Detailed Grade Report</h2>
             <button className="text-sm font-bold text-[#007bff] hover:underline">View Full History</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-100">
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Subject</th>
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Grade</th>
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Marks</th>
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Percentage</th>
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Performance</th>
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Trend</th>
                <th className="text-left py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Comments</th>
                </tr>
            </thead>
            <tbody>
                {currentTermGrades.map((grade, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                    <td className="py-5 px-6 font-bold text-slate-800">{grade.subject}</td>
                    <td className="py-5 px-6"><span className={`px-4 py-2 rounded-xl font-bold text-sm border ${getGradeColor(grade.grade)}`}>{grade.grade}</span></td>
                    <td className="py-5 px-6 text-slate-600 font-medium">{grade.marks}/{grade.outOf}</td>
                    <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${grade.percentage >= 80 ? 'bg-green-500' : grade.percentage >= 70 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${grade.percentage}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{grade.percentage}%</span>
                    </div>
                    </td>
                    <td className="py-5 px-6"><span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${grade.performance === "Outstanding" ? "bg-green-100 text-green-700" : grade.performance === "Excellent" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{grade.performance}</span></td>
                    <td className="py-5 px-6"><span className={`text-sm font-bold ${grade.trend.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>{grade.trend}%</span></td>
                    <td className="py-5 px-6 text-sm text-slate-500 font-medium">{grade.comments}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-end">
        <button className="px-8 py-4 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm inline-flex items-center gap-2">
            <Mail className="h-5 w-5 text-slate-400" /> Contact Advisor
        </button>
        <button className="px-8 py-4 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm inline-flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-slate-400" /> Schedule Meeting
        </button>
        <button className="px-8 py-4 bg-[#007bff] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 inline-flex items-center gap-2">
            <Download className="h-5 w-5" /> Download Report
        </button>
      </div>
    </div>
    </StudentPortalLayout>
  )
}
