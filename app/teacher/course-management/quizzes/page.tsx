"use client"

import { useState } from "react"
import { FileText, Plus } from "lucide-react"

export default function TeacherQuizzes() {
  const [status, setStatus] = useState("All")
  const [creating, setCreating] = useState(false)
  const [newQuiz, setNewQuiz] = useState({ title: "", course: "Web Development", questions: 10, status: "Draft" })
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "HTML Basics Quiz", course: "Web Development", questions: 15, status: "Published" },
    { id: 2, title: "CSS Layouts Quiz", course: "Web Development", questions: 12, status: "Draft" },
    { id: 3, title: "Data Wrangling Quiz", course: "Data Science", questions: 10, status: "Published" },
  ])
  const filtered = quizzes.filter((q) => (status === "All" ? true : q.status === status))
  const stat = {
    total: quizzes.length,
    published: quizzes.filter((q) => q.status === "Published").length,
    draft: quizzes.filter((q) => q.status === "Draft").length,
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Quizzes</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{stat.total}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Published</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{stat.published}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Draft</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{stat.draft}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 rounded-lg border text-sm">
          {['All','Published','Draft'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={() => setCreating((v) => !v)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Create Quiz</button>
      </div>

      {creating && (
        <div className="border border-border rounded-lg p-6 space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <input value={newQuiz.title} onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Course</label>
              <input value={newQuiz.course} onChange={(e) => setNewQuiz({ ...newQuiz, course: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Questions</label>
              <input type="number" value={newQuiz.questions} onChange={(e) => setNewQuiz({ ...newQuiz, questions: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select value={newQuiz.status} onChange={(e) => setNewQuiz({ ...newQuiz, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                {['Published','Draft'].map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                const res = await fetch("/api/teacher/course-management/quizzes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(newQuiz),
                })
                const data = await res.json().catch(() => ({}))
                if (data?.quiz) {
                  setQuizzes((prev) => [data.quiz, ...prev])
                  setCreating(false)
                  setNewQuiz({ title: "", course: "Web Development", questions: 10, status: "Draft" })
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
            >
              Save Quiz
            </button>
            <button onClick={() => setCreating(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((q) => (
          <div key={q.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center"><FileText className="h-4 w-4" /></div>
              <div>
                <p className="font-semibold text-foreground">{q.title}</p>
                <p className="text-xs text-muted-foreground">{q.course} • {q.questions} questions</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${q.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{q.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
