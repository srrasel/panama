"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Image as ImageIcon, ListOrdered, FileText, Plus, Trash2, Save, ArrowRight, ArrowLeft, Check, AlertCircle, Upload, Video } from "lucide-react"
import RichTextEditor from "@/components/ui/RichTextEditor"

type LessonForm = { id?: string; title: string; duration: string; videoFile?: File | null; imageFiles?: File[]; content?: string; videoUrl?: string; imageUrls?: string[] }
type MCQItem = { question: string; options: string[]; answerIndex: number }
type QuizForm = { id?: string; title: string; items: MCQItem[]; status?: string }

export default function AdminEditCoursePage() {
  const router = useRouter()
  const params = useParams()
  
  // Slug extraction
  const slug = params?.slug as string | undefined

  const [step, setStep] = useState(1)
  const [courseId, setCourseId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
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
  
  // Step 3: Quizzes
  const [quizzes, setQuizzes] = useState<QuizForm[]>([])
  const [openQuizzes, setOpenQuizzes] = useState<boolean[]>([])
  
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchCourseData(slug)
    } else {
      setLoading(false)
      setError("Invalid Course Slug")
    }
  }, [slug])

  const fetchCourseData = async (slugVal: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/teacher/course-management/courses/${slugVal}`)
      
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("Unauthorized to edit this course")
        if (res.status === 404) throw new Error("Course not found")
        throw new Error("Failed to fetch course data")
      }
      
      const data = await res.json()
      
      if (data.course) {
        const c = data.course
        setCourseId(c.id)
        setTitle(c.title || "")
        setIsFree(c.isFree)
        setPrice(c.price || "")
        setCourseDescription(c.description || "")
        setRequirements(c.requirements || [])
        setImagePreview(c.imageUrl || "")
        
        // Lessons
        if (c.lessons && Array.isArray(c.lessons)) {
          setLessons(c.lessons.map((l: any) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            content: l.content,
            videoUrl: l.videoUrl,
            imageUrls: l.imageUrls ? JSON.parse(l.imageUrls) : [],
            videoFile: null,
            imageFiles: []
          })))
          setOpenLessons(new Array(c.lessons.length).fill(false))
        }

        // Quizzes
        if (c.quizzes && Array.isArray(c.quizzes)) {
           setQuizzes(c.quizzes.map((q: any) => ({
             id: q.id,
             title: q.title,
             status: q.status,
             items: q.questions ? JSON.parse(q.questions) : []
           })))
           setOpenQuizzes(new Array(c.quizzes.length).fill(false))
        }
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

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

  // Auto-save Course Draft
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
  const saveLessons = async (cId: string) => {
    setSaving(true)
    try {
      for (const [idx, l] of lessons.entries()) {
        const lf = new FormData()
        lf.append("courseId", cId)
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

  const saveQuizzes = async (cId: string) => {
    setSaving(true)
    try {
      for (const [idx, q] of quizzes.entries()) {
        const payload = {
          courseId: cId,
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

  const handleNext = async () => {
    if (step === 1) {
      if (!canProceedStep1) return
      const savedCourse = await saveCourseDraft("Draft")
      if (savedCourse) {
        setStep(2)
      }
    } else if (step === 2) {
      if (courseId) {
        await saveLessons(courseId)
        await saveQuizzes(courseId)
      }
      setStep(3)
    }
  }

  const handlePublish = async () => {
    if (courseId) {
      await saveCourseDraft("Active")
      router.push("/admin/course-management/courses")
    }
  }

  if (loading) {
      return (
        <div className="flex h-[50vh] items-center justify-center flex-col gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading course data...</p>
        </div>
      )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center flex-col gap-4 text-red-500">
        <AlertCircle size={48} />
        <p className="font-medium text-lg">{error}</p>
        <Link href="/admin/course-management/courses" className="text-primary hover:underline">
          Return to Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/admin/course-management/courses" className="p-2 hover:bg-muted rounded-full">
             <ArrowLeft size={20} />
           </Link>
           <div>
             <h1 className="text-2xl font-bold">Edit Course (Admin)</h1>
             <p className="text-muted-foreground">Editing: {title || "Untitled Course"}</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => saveCourseDraft("Draft")} disabled={saving} className="px-4 py-2 border rounded-lg hover:bg-muted flex items-center gap-2">
             <Save size={16} /> {saving ? "Saving..." : "Save Draft"}
           </button>
           {step === 3 && (
             <button onClick={handlePublish} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
               <Check size={16} /> Publish Course
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
        <div className="space-y-8 animate-in fade-in">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium">Course Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Advanced Web Development" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Description</label>
              <RichTextEditor 
                value={courseDescription} 
                onChange={setCourseDescription} 
                placeholder="Detailed course description..."
              />
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
        <div className="flex justify-end mt-8">
           <button onClick={handleNext} disabled={!canProceedStep1 || saving} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
             Next Step <ArrowRight size={16} />
           </button>
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
                   <div className="space-y-6 pt-6 border-t">
                     <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-sm font-medium">Lesson Title</label>
                          <input value={lesson.title} onChange={e => {
                            const n = [...lessons]; n[idx].title = e.target.value; setLessons(n)
                          }} placeholder="Lesson Title" className="w-full px-4 py-2 border rounded-lg" />
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-sm font-medium">Duration</label>
                          <input value={lesson.duration} onChange={e => {
                            const n = [...lessons]; n[idx].duration = e.target.value; setLessons(n)
                          }} placeholder="Duration (e.g. 10 min)" className="w-full px-4 py-2 border rounded-lg" />
                       </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-medium">Lesson Content</label>
                        <RichTextEditor 
                          value={lesson.content || ""} 
                          onChange={val => {
                             const n = [...lessons]; n[idx].content = val; setLessons(n)
                          }} 
                          placeholder="Lesson content, notes, or transcript..."
                        />
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-medium flex items-center gap-2"><Video size={16}/> Video Source</label>
                           <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                              {lesson.videoFile ? (
                                <div className="flex items-center justify-between bg-muted p-2 rounded">
                                  <span className="text-sm truncate max-w-[200px]">{lesson.videoFile.name}</span>
                                  <button onClick={() => {
                                    const n = [...lessons]; n[idx].videoFile = null; setLessons(n)
                                  }} className="text-red-500"><Trash2 size={14}/></button>
                                </div>
                              ) : lesson.videoUrl ? (
                                 <div className="flex items-center justify-between bg-muted p-2 rounded">
                                  <span className="text-sm truncate max-w-[200px]">Current Video</span>
                                  <button onClick={() => {
                                    const n = [...lessons]; n[idx].videoUrl = undefined; setLessons(n)
                                  }} className="text-red-500"><Trash2 size={14}/></button>
                                </div>
                              ) : (
                                <label className="cursor-pointer block">
                                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                  <span className="text-sm text-muted-foreground">Upload Video</span>
                                  <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                                     const file = e.target.files?.[0]
                                     if (file) {
                                       const n = [...lessons]; n[idx].videoFile = file; setLessons(n)
                                     }
                                  }} />
                                </label>
                              )}
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-medium flex items-center gap-2"><ImageIcon size={16}/> Lesson Images</label>
                           <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                              <label className="cursor-pointer block">
                                <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <span className="text-sm text-muted-foreground">Upload Images</span>
                                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                                   const files = Array.from(e.target.files || [])
                                   if (files.length) {
                                     const n = [...lessons]; 
                                     n[idx].imageFiles = [...(n[idx].imageFiles || []), ...files]; 
                                     setLessons(n)
                                   }
                                }} />
                              </label>
                              {((lesson.imageFiles?.length || 0) > 0 || (lesson.imageUrls?.length || 0) > 0) && (
                                <div className="mt-4 space-y-1">
                                   {lesson.imageFiles?.map((f, i) => (
                                     <div key={`new-${i}`} className="flex items-center justify-between text-xs bg-muted p-1 rounded">
                                       <span className="truncate max-w-[150px]">{f.name}</span>
                                       <button onClick={() => {
                                          const n = [...lessons]; 
                                          n[idx].imageFiles = n[idx].imageFiles?.filter((_, fi) => fi !== i);
                                          setLessons(n)
                                       }} className="text-red-500"><Trash2 size={12}/></button>
                                     </div>
                                   ))}
                                   {lesson.imageUrls?.map((url, i) => (
                                     <div key={`url-${i}`} className="flex items-center justify-between text-xs bg-muted p-1 rounded">
                                       <span className="truncate max-w-[150px]">Image {i+1}</span>
                                       <button onClick={() => {
                                          const n = [...lessons]; 
                                          n[idx].imageUrls = n[idx].imageUrls?.filter((_, fi) => fi !== i);
                                          setLessons(n)
                                       }} className="text-red-500"><Trash2 size={12}/></button>
                                     </div>
                                   ))}
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
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
           
           <div className="flex justify-between pt-6 border-t">
             <button onClick={() => setStep(1)} className="px-6 py-2 border rounded-lg hover:bg-muted flex items-center gap-2">
               <ArrowLeft size={16} /> Back
             </button>
             <button onClick={handleNext} disabled={saving} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
               Next Step <ArrowRight size={16} />
             </button>
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
                 <p className="text-muted-foreground whitespace-pre-wrap">{courseDescription || "No description provided."}</p>
                 <div>
                   <h3 className="font-semibold mb-2">Requirements</h3>
                   <ul className="list-disc pl-5 space-y-1">
                     {requirements.length > 0 ? requirements.map((r, i) => <li key={i}>{r}</li>) : <li className="text-muted-foreground">No requirements listed</li>}
                   </ul>
                 </div>
                 <div>
                   <h3 className="font-semibold mb-2">Curriculum</h3>
                   <p>{lessons.length} Lessons • {quizzes.length} Quizzes</p>
                 </div>
               </div>
               <div className="space-y-6">
                 <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
                   {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>}
                 </div>
                 <div className="border p-4 rounded-lg">
                   <p className="text-sm text-muted-foreground">Price</p>
                   <p className="text-2xl font-bold">{isFree ? "Free" : `$${price}`}</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
             <button onClick={() => setStep(2)} className="px-6 py-2 border rounded-lg hover:bg-muted flex items-center gap-2">
               <ArrowLeft size={16} /> Back
             </button>
             <button onClick={handlePublish} disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
               <Check size={16} /> Publish Course
             </button>
          </div>
        </div>
      )}
    </div>
  )
}
