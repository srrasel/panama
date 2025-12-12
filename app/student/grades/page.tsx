"use client"
import { useEffect, useState } from "react"
import { Download, Mail, CalendarDays } from "lucide-react"

export default function StudentGrades() {
  const [selectedTerm, setSelectedTerm] = useState("term1")
  const [gradesData, setGradesData] = useState<Record<string, any[]>>({ term1: [], term2: [] })

  useEffect(() => {
    fetch("/api/student/grades")
      .then((res) => res.json())
      .then((data) => {
        setGradesData(data.gradesData || { term1: [], term2: [] })
      })
      .catch(() => {
        setGradesData({
          term1: [
            { subject: "Mathematics", grade: "A-", percentage: 92, marks: 92, outOf: 100, performance: "Excellent", comments: "Excellent grasp of concepts. Keep up the good work!", trend: "+5" },
            { subject: "English", grade: "A", percentage: 95, marks: 95, outOf: 100, performance: "Outstanding", comments: "Outstanding essay writing skills and comprehension.", trend: "+2" },
            { subject: "Science", grade: "B+", percentage: 87, marks: 87, outOf: 100, performance: "Good", comments: "Good understanding of core concepts. Improve lab work.", trend: "-1" },
            { subject: "History", grade: "A-", percentage: 90, marks: 90, outOf: 100, performance: "Excellent", comments: "Excellent historical knowledge and analysis.", trend: "+3" },
            { subject: "Physical Education", grade: "A", percentage: 94, marks: 94, outOf: 100, performance: "Excellent", comments: "Excellent participation and physical fitness.", trend: "+4" },
          ],
          term2: [
            { subject: "Mathematics", grade: "A", percentage: 94, marks: 94, outOf: 100, performance: "Outstanding", comments: "Improved performance. Excellent problem-solving skills.", trend: "+2" },
            { subject: "English", grade: "A-", percentage: 93, marks: 93, outOf: 100, performance: "Excellent", comments: "Strong writing skills. Minor improvements needed in poetry analysis.", trend: "-2" },
            { subject: "Science", grade: "A-", percentage: 91, marks: 91, outOf: 100, performance: "Excellent", comments: "Great improvement in lab work. Excellent practical understanding.", trend: "+4" },
            { subject: "History", grade: "A", percentage: 92, marks: 92, outOf: 100, performance: "Excellent", comments: "Consistent performance. Excellent class participation.", trend: "+1" },
            { subject: "Physical Education", grade: "A", percentage: 94, marks: 94, outOf: 100, performance: "Outstanding", comments: "Outstanding athletic performance and sportsmanship.", trend: "+3" },
          ],
        })
      })
  }, [])

  const currentTermGrades = gradesData[selectedTerm as keyof typeof gradesData]
  const avgPercentage = Math.round(currentTermGrades.reduce((sum, g) => sum + g.percentage, 0) / currentTermGrades.length)

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "border-green-300 text-green-700 bg-green-50"
    if (grade.startsWith("B")) return "border-amber-300 text-amber-700 bg-amber-50"
    return "border-slate-200 text-slate-700 bg-slate-50"
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Grades & Reports</h1>
            <p className="text-white/80">View your academic performance and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-white/80">Term</label>
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white">
              <option value="term1">Term 1</option>
              <option value="term2">Term 2</option>
            </select>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Average</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{avgPercentage}%</p>
          <p className="text-xs text-muted-foreground mt-2">Across subjects</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Overall Grade</p>
          <p className="text-3xl font-bold text-green-700 mt-2">A-</p>
          <p className="text-xs text-muted-foreground mt-2">Outstanding performance</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Subjects</p>
          <p className="text-3xl font-bold text-purple-700 mt-2">{currentTermGrades.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Total enrolled</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">GPA</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">3.9</p>
          <p className="text-xs text-muted-foreground mt-2">Out of 4.0</p>
        </div>
      </div>

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
              <th className="text-left py-3 px-4 font-semibold text-foreground">Trend</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Comments</th>
            </tr>
          </thead>
          <tbody>
            {currentTermGrades.map((grade, i) => (
              <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{grade.subject}</td>
                <td className="py-4 px-4"><span className={`px-4 py-2 rounded-full font-bold border ${getGradeColor(grade.grade)}`}>{grade.grade}</span></td>
                <td className="py-4 px-4 text-foreground">{grade.marks}/{grade.outOf}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${grade.percentage}%` }}></div></div>
                    <span className="font-medium text-foreground">{grade.percentage}%</span>
                  </div>
                </td>
                <td className="py-4 px-4"><span className={`px-3 py-1 rounded text-xs font-semibold ${grade.performance === "Outstanding" ? "bg-green-100 text-green-700" : grade.performance === "Excellent" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{grade.performance}</span></td>
                <td className="py-4 px-4"><span className={`text-sm font-medium ${grade.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{grade.trend}% vs last term</span></td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{grade.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Contact Advisor</button>
        <button className="px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors inline-flex items-center gap-2"><Download className="h-4 w-4" /> Download Report</button>
        <button className="px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Schedule Meeting</button>
      </div>
    </div>
  )
}
