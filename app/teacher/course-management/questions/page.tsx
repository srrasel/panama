"use client"

import { useState } from "react"
import { HelpCircle, Plus } from "lucide-react"

type Question = { id: number; text: string; type: string; difficulty: string; marks: number }

export default function TeacherQuestions() {
  const [type, setType] = useState("All")
  const [difficulty, setDifficulty] = useState("All")
  const [creating, setCreating] = useState(false)
  const [newQuestion, setNewQuestion] = useState<Question>({ id: 0, text: "", type: "MCQ", difficulty: "Easy", marks: 1 })
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "Explain the box model in CSS.", type: "Short Answer", difficulty: "Medium", marks: 5 },
    { id: 2, text: "Which property enables flexbox?", type: "MCQ", difficulty: "Easy", marks: 2 },
    { id: 3, text: "Write a function to reverse a string in JavaScript.", type: "Coding", difficulty: "Hard", marks: 10 },
    { id: 4, text: "Describe normalization in databases.", type: "Short Answer", difficulty: "Hard", marks: 8 },
  ])
  const filtered = questions
    .filter((q) => (type === "All" ? true : q.type === type))
    .filter((q) => (difficulty === "All" ? true : q.difficulty === difficulty))

  const stat = {
    total: questions.length,
    easy: questions.filter((q) => q.difficulty === "Easy").length,
    medium: questions.filter((q) => q.difficulty === "Medium").length,
    hard: questions.filter((q) => q.difficulty === "Hard").length,
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Questions</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{stat.total}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Easy</p>
          <p className="text-3xl font-bold text-emerald-700 mt-2">{stat.easy}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Medium</p>
          <p className="text-3xl font-bold text-amber-700 mt-2">{stat.medium}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Hard</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{stat.hard}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-2 rounded-lg border text-sm">
          {['All','MCQ','Short Answer','Coding'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="px-4 py-2 rounded-lg border text-sm">
          {['All','Easy','Medium','Hard'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={() => setCreating((v) => !v)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Add Question</button>
      </div>

      {creating && (
        <div className="border border-border rounded-lg p-6 space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Question Text</label>
              <input value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Type</label>
              <select value={newQuestion.type} onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                {['MCQ','Short Answer','Coding'].map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
              <select value={newQuestion.difficulty} onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                {['Easy','Medium','Hard'].map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Marks</label>
              <input type="number" value={newQuestion.marks} onChange={(e) => setNewQuestion({ ...newQuestion, marks: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                const res = await fetch("/api/teacher/course-management/questions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(newQuestion),
                })
                const data = await res.json().catch(() => ({}))
                if (data?.question) {
                  setQuestions((prev) => [data.question, ...prev])
                  setCreating(false)
                  setNewQuestion({ id: 0, text: "", type: "MCQ", difficulty: "Easy", marks: 1 })
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
            >
              Save Question
            </button>
            <button onClick={() => setCreating(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((q) => (
          <div key={q.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center"><HelpCircle className="h-4 w-4" /></div>
              <div>
                <p className="font-semibold text-foreground">{q.text}</p>
                <p className="text-xs text-muted-foreground">{q.type} • {q.marks} marks</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{q.difficulty}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
