"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Image as ImageIcon, ListOrdered, Video, FileText, Plus, Trash2 } from "lucide-react"

type LessonForm = { title: string; duration: string; videoFile?: File | null; imageFiles?: File[]; content?: string }
type MCQItem = { question: string; options: string[]; answerIndex: number }
type QuizForm = { title: string; items: MCQItem[] }

export default function AdminCreateCoursePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState("")
  const [isFree, setIsFree] = useState(true)
  const [price, setPrice] = useState<number | "">("")
  const [lessonsCount, setLessonsCount] = useState(0)
  const [studentsCount, setStudentsCount] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [requirements, setRequirements] = useState<string[]>([])
  const [requirementInput, setRequirementInput] = useState("")
  const [courseDescription, setCourseDescription] = useState<string>("")
  const [openLessons, setOpenLessons] = useState<boolean[]>([])
  const [openQuizzes, setOpenQuizzes] = useState<boolean[]>([])
  const [openQuestionPanels, setOpenQuestionPanels] = useState<boolean[][]>([])

  const [lessons, setLessons] = useState<LessonForm[]>([])
  const [quizzes, setQuizzes] = useState<QuizForm[]>([])
  const [saving, setSaving] = useState(false)

  const canSave = title.trim().length > 0

  const addLesson = () => {
    setLessons((prev) => [...prev, { title: "", duration: "", videoFile: null, imageFiles: [], content: "" }])
    setOpenLessons((prev) => [...prev, true])
  }
  const addQuiz = () => {
    setQuizzes((prev) => [...prev, { title: "", items: [] }])
    setOpenQuizzes((prev) => [...prev, true])
    setOpenQuestionPanels((prev) => [...prev, []])
  }

  const onDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const onSelectImage = (file: File | null) => {
    setImageFile(file)
    setImagePreview(file ? URL.createObjectURL(file) : "")
  }

  const addRequirement = () => {
    const v = requirementInput.trim()
    if (!v) return
    setRequirements((prev) => [...prev, v])
    setRequirementInput("")
  }
  const removeRequirement = (idx: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSaveAll = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("title", title)
      fd.append("status", "Active")
      fd.append("lessons", String(lessonsCount))
      fd.append("students", String(studentsCount))
      if (imageFile) fd.append("image", imageFile)
      fd.append("isFree", String(isFree))
      if (!isFree && price !== "") fd.append("price", String(price))
      for (const r of requirements) fd.append("requirements", r)
      fd.append("description", courseDescription || "")
      const cRes = await fetch("/api/teacher/course-management/courses", { method: "POST", body: fd })
      const cData = await cRes.json().catch(() => ({}))
      const courseId = cData?.course?.id || 1

      for (const l of lessons) {
        const lf = new FormData()
        lf.append("courseId", String(courseId))
        lf.append("title", l.title)
        lf.append("duration", l.duration)
        lf.append("content", l.content || "")
        if (l.videoFile) lf.append("video", l.videoFile)
        for (const img of l.imageFiles || []) lf.append("images", img)
        await fetch("/api/teacher/course-management/lessons", { method: "POST", body: lf })
      }

      for (const q of quizzes) {
        const items = q.items
        await fetch("/api/teacher/course-management/quizzes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: q.title, course: title, questions: items.length, items }),
        })
      }

      router.push("/admin/course-management/courses")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-foreground mb-2">Create New Course</h1>
          <p className="text-muted-foreground">Multistep creation with modern uploads and quiz builder</p>
        </div>
        <Link href="/admin/course-management/courses" className="px-4 py-2 rounded-lg border">Back to Courses</Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[{ i: 1, label: "Course" }, { i: 2, label: "Lessons" }, { i: 3, label: "Quizzes" }, { i: 4, label: "Review" }].map((s) => (
          <div key={s.i} className={`p-4 border rounded-lg ${step === s.i ? "border-primary" : "border-border"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${step >= s.i ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"} flex items-center justify-center font-bold`}>{s.i}</div>
              <p className="font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {step === 1 && (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-3 border rounded-lg" placeholder="Course title" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <RichTextEditor value={courseDescription} onChange={setCourseDescription} minHeight={350} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 inline-flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Feature Image</label>
          <div
            className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground flex flex-col items-center justify-center gap-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropImage}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg" />
            ) : (
              <div className="text-center">
                <p>Drag & drop or browse to upload</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => onSelectImage(e.target.files?.[0] || null)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Pricing</label>
            <select value={isFree ? "Free" : "Paid"} onChange={(e) => setIsFree(e.target.value === "Free")} className="w-full px-3 py-2 border rounded-lg">
              {["Free","Paid"].map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Price</label>
            <input type="number" value={isFree ? "" : String(price)} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} disabled={isFree} className="w-full px-3 py-2 border rounded-lg" placeholder="0" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Planned Lessons</label>
            <input type="number" value={lessonsCount} onChange={(e) => setLessonsCount(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Estimated Students</label>
            <input type="number" value={studentsCount} onChange={(e) => setStudentsCount(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Requirements</label>
          <div className="flex gap-2">
            <input value={requirementInput} onChange={(e) => setRequirementInput(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg" placeholder="Add a requirement" />
            <button type="button" onClick={addRequirement} className="px-4 py-2 rounded-lg border">Add</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {requirements.map((r, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-muted text-foreground inline-flex items-center gap-2">
                {r}
                <button type="button" onClick={() => removeRequirement(i)} className="text-red-600">×</button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button disabled={!canSave} onClick={() => setStep(2)} className={`px-6 py-3 rounded-lg font-semibold ${canSave ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Next: Lessons</button>
        </div>
      </div>
      )}

      {step === 2 && (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center"><ListOrdered className="h-5 w-5" /></div>
            <p className="font-semibold">Lessons</p>
          </div>
          <button onClick={addLesson} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Add Lesson</button>
        </div>
        <div className="space-y-3">
          {lessons.map((l, i) => (
            <div key={i} className="border rounded-lg">
              <div className="flex items-center justify-between p-4">
                <button type="button" className="flex-1 flex items-center justify-between" onClick={() => setOpenLessons((prev) => prev.map((v, idx) => idx === i ? !v : v))}>
                  <span className="font-medium">Lesson {i + 1}</span>
                  <span className="text-sm text-muted-foreground">{l.title || "Untitled"}</span>
                </button>
                <button
                  type="button"
                  className="ml-2 text-red-600 px-2 py-1 rounded border"
                  onClick={() => {
                    setLessons((prev) => prev.filter((_, idx) => idx !== i))
                    setOpenLessons((prev) => prev.filter((_, idx) => idx !== i))
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {openLessons[i] && (
                <div className="p-4 border-t space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Lesson Title</label>
                    <input value={l.title} onChange={(e) => setLessons((prev) => prev.map((p, idx) => idx === i ? { ...p, title: e.target.value } : p))} placeholder="Enter lesson title" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <RichTextEditor
                      value={l.content || ""}
                      onChange={(html) => setLessons((prev) => prev.map((p, idx) => idx === i ? { ...p, content: html } : p))}
                      minHeight={350}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 inline-flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Images</label>
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                      <input type="file" accept="image/*" multiple onChange={(e) => setLessons((prev) => prev.map((p, idx) => idx === i ? { ...p, imageFiles: Array.from(e.target.files || []) } : p))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 inline-flex items-center gap-2"><Video className="h-4 w-4" /> Video</label>
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground flex flex-col items-center justify-center gap-3">
                      {l.videoFile ? (
                        <video src={URL.createObjectURL(l.videoFile)} controls className="w-full rounded" />
                      ) : (
                        <p>Browse to upload lesson video</p>
                      )}
                      <input type="file" accept="video/*" onChange={(e) => setLessons((prev) => prev.map((p, idx) => idx === i ? { ...p, videoFile: e.target.files?.[0] || null } : p))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                    <input value={l.duration} onChange={(e) => setLessons((prev) => prev.map((p, idx) => idx === i ? { ...p, duration: e.target.value } : p))} placeholder="e.g. 45 min" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border">Back</button>
          <button onClick={() => setStep(3)} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">Next: Quizzes</button>
        </div>
      </div>
      )}

      {step === 3 && (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center"><FileText className="h-5 w-5" /></div>
            <p className="font-semibold">Quizzes</p>
          </div>
          <button onClick={addQuiz} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Add Quiz</button>
        </div>
        <div className="space-y-3">
          {quizzes.map((q, qi) => (
            <div key={qi} className="border rounded-lg">
              <div className="flex items-center justify-between p-4">
                <button type="button" className="flex-1 flex items-center justify-between" onClick={() => setOpenQuizzes((prev) => prev.map((v, idx) => idx === qi ? !v : v))}>
                  <span className="font-medium">Quiz {qi + 1}</span>
                  <span className="text-sm text-muted-foreground">{q.title || "Untitled"}</span>
                </button>
                <button
                  type="button"
                  className="ml-2 text-red-600 px-2 py-1 rounded border"
                  onClick={() => {
                    setQuizzes((prev) => prev.filter((_, i) => i !== qi))
                    setOpenQuizzes((prev) => prev.filter((_, i) => i !== qi))
                    setOpenQuestionPanels((prev) => prev.filter((_, i) => i !== qi))
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {openQuizzes[qi] && (
                <div className="p-4 border-t space-y-3">
                  <input value={q.title} onChange={(e) => setQuizzes((prev) => prev.map((p, idx) => idx === qi ? { ...p, title: e.target.value } : p))} placeholder="Quiz title" className="w-full px-3 py-2 border rounded-lg" />
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Questions</p>
                    <button
                      onClick={() => {
                        setQuizzes((prev) => prev.map((p, idx) => idx === qi ? { ...p, items: [...p.items, { question: "Enter the question", options: ["Option 1","Option 2","Option 3","Option 4"], answerIndex: 0 }] } : p))
                        setOpenQuestionPanels((prev) => prev.map((arr, idx) => idx === qi ? [...arr, true] : arr))
                      }}
                      className="px-3 py-2 rounded-lg border"
                    >
                      Add Question
                    </button>
                  </div>
                  <div className="space-y-3">
                    {q.items.map((item, ii) => (
                      <div key={ii} className="border rounded-lg">
                        <div className="flex items-center justify-between p-3">
                          <button
                            type="button"
                            className="flex-1 flex items-center justify-between"
                            onClick={() => {
                              setOpenQuestionPanels((prev) => {
                                const next = prev.map((arr) => arr.slice())
                                if (!next[qi]) next[qi] = []
                                next[qi][ii] = !next[qi][ii]
                                return next
                              })
                            }}
                          >
                            <span className="font-medium">Question {ii + 1}</span>
                            <span className="text-sm text-muted-foreground">{item.question || "Enter the question"}</span>
                          </button>
                          <button
                            type="button"
                            className="ml-2 text-red-600 px-2 py-1 rounded border"
                            onClick={() => {
                              setQuizzes((prev) => prev.map((p, idx) => idx === qi ? { ...p, items: p.items.filter((_, j) => j !== ii) } : p))
                              setOpenQuestionPanels((prev) => prev.map((arr, idx) => idx === qi ? arr.filter((_, j) => j !== ii) : arr))
                            }}
                          >
                            ×
                          </button>
                        </div>
                        {(openQuestionPanels[qi]?.[ii] ?? true) && (
                          <div className="p-3 border-t space-y-3">
                            <input value={item.question} onChange={(e) => setQuizzes((prev) => prev.map((p, idx) => idx === qi ? { ...p, items: p.items.map((it, j) => j === ii ? { ...it, question: e.target.value } : it) } : p))} placeholder="Enter the question" className="w-full px-3 py-2 border rounded-lg" />
                            <div className="grid md:grid-cols-2 gap-3">
                              {item.options.map((opt, oi) => (
                                <div key={oi} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    checked={item.answerIndex === oi}
                                    onChange={() => setQuizzes((prev) => prev.map((p, idx) => idx === qi ? { ...p, items: p.items.map((it, j) => j === ii ? { ...it, answerIndex: oi } : it) } : p))}
                                  />
                                  <input
                                    value={opt}
                                    onChange={(e) => setQuizzes((prev) => prev.map((p, idx) => idx === qi ? { ...p, items: p.items.map((it, j) => j === ii ? { ...it, options: it.options.map((o, k) => k === oi ? e.target.value : o) } : it) } : p))}
                                    className="flex-1 px-3 py-2 border rounded-lg"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg border">Back</button>
          <button disabled={!canSave || saving} onClick={handleSaveAll} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">{saving ? "Saving..." : "Save All"}</button>
        </div>
      </div>
      )}
    </div>
  )
}

function RichTextEditor({ value, onChange, minHeight }: { value: string; onChange: (html: string) => void; minHeight?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const exec = (cmd: string, value?: string) => {
    if (ref.current) ref.current.focus()
    document.execCommand(cmd, false, value)
    if (ref.current) onChange(ref.current.innerHTML)
  }
  const insertImage = (file: File | null) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    if (ref.current) {
      ref.current.focus()
      document.execCommand("insertImage", false, url)
      onChange(ref.current.innerHTML)
    }
  }
  useEffect(() => {
    if (ref.current && typeof value === "string" && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value
    }
  }, [value])
  return (
    <div className="border rounded-lg">
      <div className="flex flex-wrap items-center gap-2 p-2 border-b">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")} className="px-3 py-1 rounded border">B</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")} className="px-3 py-1 rounded border">I</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "P")} className="px-3 py-1 rounded border">P</button>
        <select onChange={(e) => exec("formatBlock", e.target.value)} className="px-3 py-1 rounded border bg-transparent">
          <option value="P">Heading</option>
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")} className="px-3 py-1 rounded border">• List</button>
        <label className="px-3 py-1 rounded border inline-flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <input type="file" accept="image/*" onChange={(e) => insertImage(e.target.files?.[0] || null)} className="hidden" />
        </label>
      </div>
      <div
        ref={ref}
        contentEditable
        className="p-3 text-left"
        dir="ltr"
        style={{ minHeight: minHeight ? `${minHeight}px` : undefined, direction: "ltr", textAlign: "left" }}
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
      />
    </div>
  )
}
