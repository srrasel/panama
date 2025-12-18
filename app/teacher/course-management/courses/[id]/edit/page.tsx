"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Image as ImageIcon, ListOrdered, Video, FileText, Plus, Trash2, Save, ArrowRight, ArrowLeft, Check } from "lucide-react"

type LessonForm = { id?: number; title: string; duration: string; videoFile?: File | null; imageFiles?: File[]; content?: string; videoUrl?: string; imageUrls?: string[] }
type MCQItem = { question: string; options: string[]; answerIndex: number }
type QuizForm = { id?: string; title: string; items: MCQItem[]; status?: string }

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [courseId, setCourseId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState(1)
  
  // Step 1: Basic Info
  const [title, setTitle] = useState("")
  const [isFree, setIsFree] = useState(true)
  const [price, setPrice] = useState<number | "">("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [requirements, setRequirements] = useState<string[]>([])
  const [requirementInput, setRequirementInput] = useState("")
  const [courseDescription, setCourseDescription] = useState<string>("")
  
  // Step 2: Curriculum
  const [lessons, setLessons] = useState<LessonForm[]>([])
  const [openLessons, setOpenLessons] = useState<boolean[]>([])
  const [quizzes, setQuizzes] = useState<QuizForm[]>([])
  const [openQuizzes, setOpenQuizzes] = useState<boolean[]>([])
  
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    params.then(({ id }) => {
      setCourseId(parseInt(id))
      fetch(`/api/teacher/course-management/courses/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.course) {
            const c = data.course
            setTitle(c.title)
            setIsFree(c.isFree)
            setPrice(c.price || "")
            if (c.imageUrl) setImagePreview(c.imageUrl)
            setRequirements(c.requirements || [])
            setCourseDescription(c.description || "")
            
            if (c.lessons) {
              setLessons(c.lessons.map((l: any) => ({
                id: l.id,
                title: l.title,
                duration: l.duration,
                content: l.content,
                videoUrl: l.videoUrl,
                imageUrls: l.imageUrls
              })))
              setOpenLessons(new Array(c.lessons.length).fill(false))
            }

            if (c.quizzes) {
              setQuizzes(c.quizzes.map((q: any) => ({
                id: q.id,
                title: q.title,
                items: q.questions ? JSON.parse(q.questions) : [],
                status: q.status
              })))
              setOpenQuizzes(new Array(c.quizzes.length).fill(false))
            }
          }
        })
        .finally(() => setLoading(false))
    })
  }, [])

  const canProceedStep1 = title.trim().length > 0

  const addLesson = () => {
    setLessons((prev) => [...prev, { title: "", duration: "", videoFile: null, imageFiles: [], content: "" }])
    setOpenLessons((prev) => [...prev, true])
  }

  const deleteLesson = async (idx: number) => {
    const l = lessons[idx]
    if (l.id) {
      if (!confirm("Are you sure you want to delete this lesson?")) return
      try {
        await fetch(`/api/teacher/course-management/lessons/${l.id}`, { method: "DELETE" })
      } catch (e) {
        console.error("Failed to delete lesson", e)
        return
      }
    }
    setLessons(prev => prev.filter((_, i) => i !== idx))
    setOpenLessons(prev => prev.filter((_, i) => i !== idx))
  }

  const addQuiz = () => {
    setQuizzes((prev) => [...prev, { title: "", items: [] }])
    setOpenQuizzes((prev) => [...prev, true])
  }

  const deleteQuiz = async (idx: number) => {
    const q = quizzes[idx]
    if (q.id) {
      if (!confirm("Are you sure you want to delete this quiz?")) return
      try {
        await fetch(`/api/teacher/course-management/quizzes?id=${q.id}`, { method: "DELETE" })
      } catch (e) {
        console.error("Failed to delete quiz", e)
        return
      }
    }
    setQuizzes(prev => prev.filter((_, i) => i !== idx))
    setOpenQuizzes(prev => prev.filter((_, i) => i !== idx))
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

  // Save Course Draft (Update)
  const saveCourseDraft = async (status: "Draft" | "Active" = "Draft") => {
    if (!courseId) return null
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("title", title)
      fd.append("status", status)
      if (imageFile) fd.append("image", imageFile)
      fd.append("isFree", String(isFree))
      if (!isFree && price !== "") fd.append("price", String(price))
      for (const r of requirements) fd.append("requirements", r)
      fd.append("description", courseDescription || "")

      const res = await fetch(`/api/teacher/course-management/courses/${courseId}`, { method: "PUT", body: fd })
      const data = await res.json()
      return data.course
    } catch (err) {
      console.error(err)
      return null
    } finally {
      setSaving(false)
    }
  }

  // Save Lessons
  const saveLessons = async () => {
    if (!courseId) return
    setSaving(true)
    try {
      for (const [idx, l] of lessons.entries()) {
        const lf = new FormData()
        lf.append("courseId", String(courseId))
        lf.append("title", l.title)
        lf.append("duration", l.duration)
        if (l.videoFile) lf.append("video", l.videoFile)
        if (l.imageFiles) {
          l.imageFiles.forEach(f => lf.append("images", f))
        }
        lf.append("content", l.content || "")
        
        let res
        if (l.id) {
             res = await fetch(`/api/teacher/course-management/lessons/${l.id}`, { method: "PUT", body: lf })
        } else {
             res = await fetch("/api/teacher/course-management/lessons", { method: "POST", body: lf })
        }
        
        const data = await res.json()
        if (data.lesson && !l.id) {
           setLessons(prev => {
             const newL = [...prev]
             newL[idx].id = data.lesson.id
             return newL
           })
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const saveQuizzes = async () => {
    if (!courseId) return
    setSaving(true)
    try {
      for (const [idx, q] of quizzes.entries()) {
        const payload = {
          courseId,
          title: q.title,
          items: q.items,
          status: "Active",
          ...(q.id ? { id: q.id } : {})
        }

        let res
        if (q.id) {
           res = await fetch("/api/teacher/course-management/quizzes", { 
             method: "PUT", 
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(payload)
           })
        } else {
           res = await fetch("/api/teacher/course-management/quizzes", { 
             method: "POST", 
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(payload)
           })
        }

        const data = await res.json()
        if (data.quiz && !q.id) {
           setQuizzes(prev => {
             const newQ = [...prev]
             newQ[idx].id = data.quiz.id
             return newQ
           })
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleNext = async () => {
    if (step === 1) {
      if (!canProceedStep1) return
      const savedCourse = await saveCourseDraft("Draft") // Keep as draft or existing status?
      // Ideally we check current status, but "Draft" is safe unless we want to publish
      if (savedCourse) {
        setStep(2)
      }
    } else if (step === 2) {
      await saveLessons()
      await saveQuizzes()
      setStep(3)
    }
  }

  const handlePublish = async () => {
    if (courseId) {
      await saveCourseDraft("Active")
      router.push("/teacher/course-management/courses")
    }
  }

  if (loading) return <div className="p-8 text-center">Loading course...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold">Edit Course</h1>
           <p className="text-muted-foreground">Changes saved automatically on step navigation</p>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => saveCourseDraft()} disabled={saving} className="px-4 py-2 border rounded-lg hover:bg-muted flex items-center gap-2">
             <Save size={16} /> {saving ? "Saving..." : "Save Draft"}
           </button>
           {step === 3 && (
             <button onClick={handlePublish} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
               <Check size={16} /> Update & Publish
             </button>
           )}
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-4 border-b pb-4">
         {[1, 2, 3].map(s => (
           <div key={s} className={`flex items-center gap-2 ${step === s ? "text-primary font-semibold" : "text-muted-foreground"}`}>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step === s ? "border-primary bg-primary/10" : "border-border"}`}>
               {s}
             </div>
             <span>{s === 1 ? "Basic Info" : s === 2 ? "Curriculum" : "Review"}</span>
             {s < 3 && <div className="w-8 h-[1px] bg-border" />}
           </div>
         ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium">Course Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Advanced Web Development" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Description</label>
              <textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Requirements</label>
              <div className="flex gap-2">
                <input value={requirementInput} onChange={(e) => setRequirementInput(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Add requirement..." />
                <button onClick={addRequirement} className="px-4 py-2 bg-secondary rounded-lg"><Plus size={16}/></button>
              </div>
              <ul className="space-y-1 mt-2">
                {requirements.map((r, i) => (
                  <li key={i} className="flex items-center justify-between bg-muted px-3 py-1 rounded text-sm">
                    {r} <button onClick={() => removeRequirement(i)}><Trash2 size={14}/></button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="font-medium">Pricing</label>
                  <select value={String(isFree)} onChange={(e) => setIsFree(e.target.value === "true")} className="w-full px-4 py-2 border rounded-lg">
                    <option value="true">Free</option>
                    <option value="false">Paid</option>
                  </select>
               </div>
               {!isFree && (
                 <div className="space-y-2">
                   <label className="font-medium">Price ($)</label>
                   <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
                 </div>
               )}
            </div>
          </div>

          <div className="space-y-6">
             <div className="border-2 border-dashed border-border rounded-xl p-8 text-center" onDrop={onDropImage} onDragOver={e => e.preventDefault()}>
                {imagePreview ? (
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button onClick={() => { setImageFile(null); setImagePreview("") }} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><Trash2 size={16}/></button>
                  </div>
                ) : (
                  <div className="py-8 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Drag and drop course image here</p>
                    <p className="text-sm mt-2">or</p>
                    <input type="file" id="img-upload" className="hidden" accept="image/*" onChange={(e) => onSelectImage(e.target.files?.[0] || null)} />
                    <label htmlFor="img-upload" className="mt-4 inline-block px-4 py-2 bg-secondary rounded-lg cursor-pointer">Browse Files</label>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* Step 2: Curriculum */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in">
           <div className="flex items-center justify-between">
             <h2 className="text-xl font-semibold">Course Content</h2>
             <div className="flex gap-2">
                <button onClick={addLesson} className="px-4 py-2 bg-secondary rounded-lg flex items-center gap-2"><Plus size={16} /> Add Lesson</button>
                <button onClick={addQuiz} className="px-4 py-2 bg-secondary rounded-lg flex items-center gap-2"><Plus size={16} /> Add Quiz</button>
             </div>
           </div>
           
           <div className="space-y-4">
             {lessons.map((lesson, idx) => (
               <div key={`lesson-${idx}`} className="border rounded-lg p-4 bg-card">
                 <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => setOpenLessons(prev => { const n = [...prev]; n[idx] = !n[idx]; return n })}>
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">L{idx + 1}</span>
                    <span className="font-medium">{lesson.title || "Untitled Lesson"}</span>
                    <ListOrdered size={16} className="text-muted-foreground ml-2" />
                  </div>
                  <button onClick={() => deleteLesson(idx)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 size={16}/></button>
                </div>
                 
                 {openLessons[idx] && (
                   <div className="space-y-4 pt-4 border-t">
                     <div className="grid md:grid-cols-2 gap-4">
                       <input value={lesson.title} onChange={e => {
                         const n = [...lessons]; n[idx].title = e.target.value; setLessons(n)
                       }} placeholder="Lesson Title" className="px-4 py-2 border rounded-lg" />
                       <input value={lesson.duration} onChange={e => {
                         const n = [...lessons]; n[idx].duration = e.target.value; setLessons(n)
                       }} placeholder="Duration (e.g. 10 min)" className="px-4 py-2 border rounded-lg" />
                     </div>
                     <textarea value={lesson.content} onChange={e => {
                         const n = [...lessons]; n[idx].content = e.target.value; setLessons(n)
                       }} placeholder="Lesson Content / Notes" rows={3} className="w-full px-4 py-2 border rounded-lg" />
                   </div>
                 )}
               </div>
             ))}
             
             {quizzes.map((quiz, idx) => (
               <div key={`quiz-${idx}`} className="border rounded-lg p-4 bg-card border-purple-200">
                 <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => setOpenQuizzes(prev => { const n = [...prev]; n[idx] = !n[idx]; return n })}>
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">Q{idx + 1}</span>
                    <span className="font-medium">{quiz.title || "Untitled Quiz"}</span>
                    <FileText size={16} className="text-muted-foreground ml-2" />
                  </div>
                  <button onClick={() => deleteQuiz(idx)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 size={16}/></button>
                </div>
                 
                 {openQuizzes[idx] && (
                   <div className="space-y-4 pt-4 border-t">
                     <input value={quiz.title} onChange={e => {
                       const n = [...quizzes]; n[idx].title = e.target.value; setQuizzes(n)
                     }} placeholder="Quiz Title" className="w-full px-4 py-2 border rounded-lg" />
                     
                     <div className="space-y-4">
                        {quiz.items.map((item, qIdx) => (
                          <div key={qIdx} className="bg-muted/30 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                               <p className="font-medium text-sm">Question {qIdx + 1}</p>
                               <button onClick={() => {
                                 const n = [...quizzes]; n[idx].items = n[idx].items.filter((_, i) => i !== qIdx); setQuizzes(n)
                               }} className="text-red-500 hover:text-red-700"><Trash2 size={14}/></button>
                            </div>
                            <input value={item.question} onChange={e => {
                              const n = [...quizzes]; n[idx].items[qIdx].question = e.target.value; setQuizzes(n)
                            }} placeholder="Question Text" className="w-full px-3 py-2 border rounded mb-2 bg-white" />
                            
                            <div className="grid grid-cols-2 gap-2">
                              {item.options.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-2">
                                  <input type="radio" name={`q-${idx}-${qIdx}`} checked={item.answerIndex === oIdx} onChange={() => {
                                     const n = [...quizzes]; n[idx].items[qIdx].answerIndex = oIdx; setQuizzes(n)
                                  }} />
                                  <input value={opt} onChange={e => {
                                     const n = [...quizzes]; n[idx].items[qIdx].options[oIdx] = e.target.value; setQuizzes(n)
                                  }} placeholder={`Option ${oIdx + 1}`} className="flex-1 px-2 py-1 border rounded text-sm bg-white" />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <button onClick={() => {
                          const n = [...quizzes]; 
                          n[idx].items.push({ question: "", options: ["", "", "", ""], answerIndex: 0 }); 
                          setQuizzes(n)
                        }} className="text-sm text-primary hover:underline flex items-center gap-1"><Plus size={14}/> Add Question</button>
                     </div>
                   </div>
                 )}
               </div>
             ))}

             {lessons.length === 0 && quizzes.length === 0 && <p className="text-center text-muted-foreground py-8">No content added yet.</p>}
           </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-card border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-4">
                 <p className="text-muted-foreground">{courseDescription || "No description provided."}</p>
                 <div>
                   <h3 className="font-semibold mb-2">Requirements</h3>
                   <ul className="list-disc pl-5 space-y-1">
                     {requirements.map((r, i) => <li key={i}>{r}</li>)}
                   </ul>
                 </div>
                 <div>
                   <h3 className="font-semibold mb-2">Curriculum</h3>
                   <p>{lessons.length} Lessons • {quizzes.length} Quizzes</p>
                 </div>
               </div>
               <div>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    {imagePreview && <img src={imagePreview} className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{isFree ? "Free" : `$${price}`}</div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-8 border-t">
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} className="px-6 py-2 border rounded-lg hover:bg-muted flex items-center gap-2">
            <ArrowLeft size={16} /> Previous
          </button>
        ) : <div></div>}
        
        {step < 3 ? (
          <button onClick={handleNext} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={handlePublish} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            Update & Publish <Check size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
