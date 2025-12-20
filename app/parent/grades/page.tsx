"use client"

import { useEffect, useState } from "react"
import { useParent } from "../ParentContext"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Download, 
  Mail, 
  Calendar 
} from "lucide-react"

export default function ParentGrades() {
  const { selectedChild } = useParent()
  const [selectedTerm, setSelectedTerm] = useState("term1")

  const [gradesData, setGradesData] = useState<Record<string, any[]>>({ term1: [], term2: [] })
  const [childName, setChildName] = useState<string>("")

  useEffect(() => {
    if (!selectedChild) return
    fetch(`/api/parent/grades?childId=${selectedChild.id}`)
      .then((res) => res.json())
      .then((data) => {
        setGradesData(data.gradesData || { term1: [], term2: [] })
        setChildName(data.childName || "")
      })
      .catch(() => {
        setGradesData({ term1: [], term2: [] })
        setChildName("")
      })
  }, [selectedChild])

  const currentTermGrades = gradesData[selectedTerm as keyof typeof gradesData] || []
  const avgPercentage = currentTermGrades.length > 0 
    ? Math.round(currentTermGrades.reduce((sum, g) => sum + g.percentage, 0) / currentTermGrades.length) 
    : 0

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-emerald-100 text-emerald-700 border-emerald-200"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-700 border-blue-200"
    if (grade.startsWith("C")) return "bg-amber-100 text-amber-700 border-amber-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  return (
    <ParentPortalLayout
      title="Grades & Reports"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: "Grades" },
      ]}
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Academic Performance</h1>
            <p className="text-slate-500 mt-2 text-lg">
              Detailed academic performance for {childName || "Student"}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>

        {/* Term Selection */}
        <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
          {[
            { value: "term1", label: "Term 1 (Apr - Jul 2025)" },
            { value: "term2", label: "Term 2 (Aug - Nov 2025)" },
          ].map((term) => (
            <button
              key={term.value}
              onClick={() => setSelectedTerm(term.value)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedTerm === term.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {term.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-24 h-24 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-slate-500 font-medium">Average Score</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{avgPercentage}%</h3>
              <p className="text-emerald-600 text-sm font-medium mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-lg">
                Across all subjects
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award className="w-24 h-24 text-blue-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-500 font-medium">Overall Grade</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">A-</h3>
              <p className="text-blue-600 text-sm font-medium mt-2 bg-blue-50 inline-block px-2 py-1 rounded-lg">
                Outstanding performance
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-24 h-24 text-purple-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-slate-500 font-medium">Subjects</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{currentTermGrades.length}</h3>
              <p className="text-purple-600 text-sm font-medium mt-2 bg-purple-50 inline-block px-2 py-1 rounded-lg">
                Total enrolled
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap className="w-24 h-24 text-amber-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-slate-500 font-medium">GPA</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">3.9</h3>
              <p className="text-amber-600 text-sm font-medium mt-2 bg-amber-50 inline-block px-2 py-1 rounded-lg">
                Out of 4.0
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Grades Table */}
        <div className="bg-white rounded-[1.8rem] border border-slate-100 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Grade Report</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Subject</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Grade</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Marks</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Percentage</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Performance</th>
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Teacher Comments</th>
                </tr>
              </thead>
              <tbody>
                {currentTermGrades.map((grade, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">{grade.subject}</td>
                    <td className="py-4 px-4">
                      <span className={`px-4 py-2 rounded-xl font-bold border ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {grade.marks}/{grade.outOf}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-slate-900 h-full rounded-full" style={{ width: `${grade.percentage}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-900">{grade.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          grade.performance === "Outstanding"
                            ? "bg-emerald-100 text-emerald-700"
                            : grade.performance === "Excellent"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {grade.performance}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 font-medium">{grade.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-[1.8rem] border border-slate-100 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Trend Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
              <h3 className="font-bold text-emerald-900 mb-4 text-lg">Strengths</h3>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  Excellent performance in English and Mathematics
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  Strong analytical and writing skills
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  Consistent participation in classroom activities
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  Outstanding athletic abilities
                </li>
              </ul>
            </div>
            <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-2xl">
              <h3 className="font-bold text-amber-900 mb-4 text-lg">Areas for Improvement</h3>
              <ul className="space-y-3 text-amber-800">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                  </div>
                  Strengthen practical laboratory skills in Science
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                  </div>
                  Increase focus during complex problem-solving sessions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                  </div>
                  Work on time management during exams
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                  </div>
                  Review historical dates and timelines more frequently
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Teacher
          </button>
          <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Meeting
          </button>
        </div>
      </div>
    </ParentPortalLayout>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
