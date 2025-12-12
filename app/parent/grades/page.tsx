"use client"

import { useEffect, useState } from "react"

export default function ParentGrades() {
  const [selectedTerm, setSelectedTerm] = useState("term1")

  const [gradesData, setGradesData] = useState<Record<string, any[]>>({ term1: [], term2: [] })
  const [childName, setChildName] = useState<string>("")

  useEffect(() => {
    fetch("/api/parent/grades")
      .then((res) => res.json())
      .then((data) => {
        setGradesData(data.gradesData || { term1: [], term2: [] })
        setChildName(data.childName || "")
      })
      .catch(() => {
        setGradesData({ term1: [], term2: [] })
        setChildName("")
      })
  }, [])

  const currentTermGrades = gradesData[selectedTerm as keyof typeof gradesData]
  const avgPercentage = Math.round(
    currentTermGrades.reduce((sum, g) => sum + g.percentage, 0) / currentTermGrades.length,
  )

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-700 border-green-200"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-700 border-blue-200"
    if (grade.startsWith("C")) return "bg-amber-100 text-amber-700 border-amber-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Grades & Reports</h1>
            <p className="text-white/80">Detailed academic performance for {childName || "Student"}</p>
          </div>
        </div>
      </section>

      {/* Term Selection */}
      <div className="flex gap-4">
        {[
          { value: "term1", label: "Term 1 (Apr - Jul 2025)" },
          { value: "term2", label: "Term 2 (Aug - Nov 2025)" },
        ].map((term) => (
          <button
            key={term.value}
            onClick={() => setSelectedTerm(term.value)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedTerm === term.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {term.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Average Score</p>
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">%</div>
          </div>
          <p className="text-xl font-semibold text-foreground">{avgPercentage}%</p>
          <span className="text-xs font-medium text-primary">Across all subjects</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Overall Grade</p>
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">A</div>
          </div>
          <p className="text-xl font-semibold text-foreground">A-</p>
          <span className="text-xs font-medium text-primary">Outstanding performance</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">Subjects</p>
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center">#</div>
          </div>
          <p className="text-xl font-semibold text-foreground">{currentTermGrades.length}</p>
          <span className="text-xs font-medium text-primary">Total enrolled</span>
        </div>
        <div className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-xs text-muted-foreground">GPA</p>
            <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center">G</div>
          </div>
          <p className="text-xl font-semibold text-foreground">3.9</p>
          <span className="text-xs font-medium text-primary">Out of 4.0</span>
        </div>
      </div>

      {/* Detailed Grades Table */}
      <div className="bg-card rounded-lg border border-border p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Grade Report</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Subject</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Grade</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Marks</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Percentage</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Performance</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Teacher Comments</th>
            </tr>
          </thead>
          <tbody>
            {currentTermGrades.map((grade, i) => (
              <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{grade.subject}</td>
                <td className="py-4 px-4">
                  <span className={`px-4 py-2 rounded-full font-bold border ${getGradeColor(grade.grade)}`}>
                    {grade.grade}
                  </span>
                </td>
                <td className="py-4 px-4 text-foreground">
                  {grade.marks}/{grade.outOf}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${grade.percentage}%` }}></div>
                    </div>
                    <span className="font-medium text-foreground">{grade.percentage}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      grade.performance === "Outstanding"
                        ? "bg-green-100 text-green-700"
                        : grade.performance === "Excellent"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {grade.performance}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{grade.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Performance Trend Analysis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Strengths</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>✓ Excellent performance in English and Mathematics</li>
              <li>✓ Strong analytical and writing skills</li>
              <li>✓ Consistent participation in classroom activities</li>
              <li>✓ Outstanding athletic abilities</li>
            </ul>
          </div>
          <div className="p-4 bg-white border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Areas for Improvement</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Strengthen practical laboratory skills in Science</li>
              <li>• Increase focus during complex problem-solving sessions</li>
              <li>• Work on time management during exams</li>
              <li>• Review historical dates and timelines more frequently</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
          📧 Contact Teacher
        </button>
        <button className="px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors">
          📄 Download Report
        </button>
        <button className="px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors">
          📅 Schedule Meeting
        </button>
      </div>
    </div>
  )
}
