"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Image as ImageIcon, ListOrdered, Video, FileText } from "lucide-react"

type LessonForm = { title: string; duration: string; videoFile?: File | null; imageFiles?: File[]; content?: string }
type MCQItem = { question: string; options: string[]; answerIndex: number }
type QuizForm = { title: string; items: MCQItem[] }

export default function AdminEditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const courseId = Number(params.id)

  const [step, setStep] = useState(1)
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("Active")
  const [isFree, setIsFree] = useState(true)
  const [price, setPrice] = useState<number | "">("")
  const [lessonsCount, setLessonsCount] = useState(0)
  const [studentsCount, setStudentsCount] = useState(0)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [teacher, setTeacher] = useState("")
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

  useEffect(() => {
    ;(async () => {
      const cRes = await fetch("/api/teacher/course-management/courses").catch(() => null)
      const cData = await cRes?.json().catch(() => ({}))
      const course = Array.isArray(cData?.courses) ? cData.courses.find((c: any) => Number(c.id) === courseId) : null
      if (course) {
        setTitle(String(course.title || ""))
        setStatus(String(course.status || "Active"))
        setIsFree(Boolean(course.isFree ?? true))
        setPrice(course.isFree ? "" : Number(course.price || 0))
        setLessonsCount(Number(course.lessons || 0))
        setStudentsCount(Number(course.students || 0))
        setImagePreview(String(course.imageUrl || ""))
        setTeacher(String(course.teacher || ""))
        setRequirements(Array.isArray(course.requirements) ? course.requirements.map((r: any) => String(r)) : [])
        setCourseDescription(String(course.description || ""))
      }

      const lRes = await fetch("/api/teacher/course-management/lessons").catch(() => null)
      const lData = await lRes?.json().catch(() => ({}))
      const courseLessons = Array.isArray(lData?.lessons)
        ? lData.lessons.filter((l: any) => Number(l.courseId) === courseId)
        : []
      setLessons(
        courseLessons.map((l: any) => ({ title: String(l.title || ""), duration: String(l.duration || ""), content: String(l.content || ""), videoFile: null, imageFiles: [] }))
      )
      setOpenLessons(courseLessons.map(() => false))

      const qRes = await fetch("/api/teacher/course-management/quizzes").catch(() => null)
      const qData = await qRes?.json().catch(() => ({}))
      const courseQuizzes = Array.isArray(qData?.quizzes)
        ? qData.quizzes.filter((q: any) => String(q.course || "") === String(course?.title || ""))
        : []
      setQuizzes(
        courseQuizzes.map((q: any) => ({ title: String(q.title || ""), items: Array.isArray(q.items) ? q.items : [] }))
      )
      setOpenQuizzes(courseQuizzes.map(() => false))
      setOpenQuestionPanels(courseQuizzes.map((q: any) => (Array.isArray(q.items) ? q.items.map(() => false) : [])))
    })()
  }, [courseId])

  const addRequirement = () => {
    const v = requirementInput.trim()
    if (!v) return
    setRequirements((prev) => [...prev, v])
    setRequirementInput("")
  }

  const removeRequirement = (idx: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSaveChanges = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      const body = {
        id: courseId,
        title,
        status,
        lessons: lessonsCount,
        students: studentsCount,
        isFree,
        price: isFree ? 0 : Number(price || 0),
        requirements,
        description: courseDescription || "",
        teacher,
      }
      await fetch("/api/teacher/course-management/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      router.push("/admin/course-management/courses")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-foreground mb-2">Edit Course</h1>
          <p className="text-muted-foreground">Same modern builder, pre-filled with existing data</p>
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
            {imagePreview && <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg border" />}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {["Active","Draft","Archived"].map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Teacher</label>
              <input value={teacher} onChange={(e) => setTeacher(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Assigned teacher" />
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
              <label className="block text-sm font-medium text-foreground mb-2">Lessons</label>
              <input type="number" value={lessonsCount} onChange={(e) => setLessonsCount(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Students</label>
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
          </div>
          <div className="space-y-3">
            {lessons.map((l, i) => (
              <div key={i} className="border rounded-lg">
                <div className="flex items-center justify-between p-4">
                  <button type="button" className="flex-1 flex items-center justify-between" onClick={() => setOpenLessons((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}>
                    <span className="font-medium">Lesson {i + 1}</span>
                    <span className="text-sm text-muted-foreground">{l.title || "Untitled"}</span>
                  </button>
                </div>
                {openLessons[i] && (
                  <div className="p-4 border-t space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Lesson Title</label>
                      <input value={l.title} disabled className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                      <RichTextEditor value={l.content || ""} onChange={() => {}} minHeight={200} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 inline-flex items-center gap-2"><Video className="h-4 w-4" /> Video</label>
                      <div className="rounded-lg border p-4 text-sm text-muted-foreground">Existing video not editable here</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                      <input value={l.duration} disabled className="w-full px-3 py-2 border rounded-lg" />
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
          </div>
          <div className="space-y-3">
            {quizzes.map((q, qi) => (
              <div key={qi} className="border rounded-lg">
                <div className="flex items-center justify-between p-4">
                  <button type="button" className="flex-1 flex items-center justify-between" onClick={() => setOpenQuizzes((prev) => prev.map((v, idx) => (idx === qi ? !v : v)))}>
                    <span className="font-medium">Quiz {qi + 1}</span>
                    <span className="text-sm text-muted-foreground">{q.title || "Untitled"}</span>
                  </button>
                </div>
                {openQuizzes[qi] && (
                  <div className="p-4 border-t space-y-3">
                    <input value={q.title} disabled className="w-full px-3 py-2 border rounded-lg" />
                    <div className="space-y-3">
                      {q.items.map((item, ii) => (
                        <div key={ii} className="border rounded-lg">
                          <div className="p-3 border-t space-y-3">
                            <input value={item.question} disabled className="w-full px-3 py-2 border rounded-lg" />
                            <div className="grid md:grid-cols-2 gap-3">
                              {item.options.map((opt, oi) => (
                                <div key={oi} className="flex items-center gap-2">
                                  <input type="radio" checked={item.answerIndex === oi} readOnly />
                                  <input value={opt} disabled className="flex-1 px-3 py-2 border rounded-lg" />
                                </div>
                              ))}
                            </div>
                          </div>
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
            <button disabled={!canSave || saving} onClick={handleSaveChanges} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">{saving ? "Saving..." : "Save Changes"}</button>
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

