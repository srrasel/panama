"use client"

import { useRouter, useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import { 
  Play, 
  Settings, 
  Maximize, 
  Star, 
  StarHalf, 
  ThumbsUp, 
  MessageCircle, 
  ExternalLink, 
  ChevronDown, 
  Video, 
  Lock, 
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { useEffect, useState } from "react"

export default function CoursePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [course, setCourse] = useState<any>(null)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "", name: "", email: "" })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    setIsLoading(true)
    setError(null)

    fetch(`/api/courses/${id}`)
      .then(async (res) => {
        if (!res.ok) {
           if (res.status === 404) throw new Error("Course not found")
           const errData = await res.json().catch(() => ({}))
           throw new Error(errData.details || "Failed to load course")
        }
        return res.json()
      })
      .then((data) => {
        if (!data.course) throw new Error("Course data is missing")
        setCourse(data.course)
      })
      .catch((err) => {
        console.error("Error fetching course:", err)
        setError(err.message)
        setCourse(null)
      })
      .finally(() => setIsLoading(false))

    // Fetch reviews
    fetch(`/api/courses/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {})

    // Check enrollment status and progress
    fetch("/api/student/courses")
      .then((res) => {
        if (res.ok) return res.json()
        return { courses: [] }
      })
      .then((data) => {
        if (data.courses && data.courses.find((c: any) => c.id === id)) {
          setIsEnrolled(true)
          // Fetch progress if enrolled
          fetch(`/api/courses/${id}/progress`)
            .then(res => res.json())
            .then(data => {
              if (data.completedLessonIds) {
                setCompletedLessons(data.completedLessonIds)
              }
            })
            .catch(() => {})
        }
      })
      .catch(() => {})
  }, [id])

  const handleEnroll = async () => {
    if (isEnrolled || !id) return

    const res = await fetch("/api/student/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: id })
    })

    if (res.ok) {
      setIsEnrolled(true)
    } else {
      if (res.status === 401) {
        router.push("/login")
      } else {
        alert("Enrollment failed. Please try again.")
      }
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEnrolled) {
      alert("You must be enrolled to submit a review.")
      return
    }
    setIsSubmittingReview(true)
    try {
      const res = await fetch(`/api/courses/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          rating: reviewForm.rating, 
          comment: reviewForm.comment 
        })
      })
      if (res.ok) {
        const newReview = await res.json()
        // Refresh reviews
        const reviewsRes = await fetch(`/api/courses/${id}/reviews`)
        const reviewsData = await reviewsRes.json()
        setReviews(Array.isArray(reviewsData) ? reviewsData : [])
        setReviewForm({ rating: 5, comment: "", name: "", email: "" })
        alert("Review submitted successfully!")
      } else {
        alert("Failed to submit review.")
      }
    } catch (error) {
      console.error(error)
      alert("An error occurred.")
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const toggleLessonCompletion = async (lessonId: string) => {
    if (!isEnrolled) return

    // Optimistic update
    const isCompleted = completedLessons.includes(lessonId)
    const newCompleted = isCompleted 
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId]
    
    setCompletedLessons(newCompleted)

    try {
      await fetch(`/api/courses/${id}/lessons/${lessonId}/complete`, {
        method: "POST"
      })
    } catch (error) {
      // Revert on error
      setCompletedLessons(completedLessons)
      console.error(error)
    }
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-slate-400">Loading course...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !course) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="text-red-500 font-bold text-xl">{error || "Course not found"}</div>
          <button 
            onClick={() => router.push("/courses")}
            className="text-blue-600 hover:underline"
          >
            Back to Courses
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <Navigation />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Video Section */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group cursor-pointer">
                <Image
                  src={course.image || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200"}
                  alt={course.title}
                  fill
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="ml-1 w-8 h-8 fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between text-white text-sm">
                  <span>05:32 / {course.duration || "12:45"}</span>
                  <div className="flex gap-4">
                    <Settings className="w-5 h-5" />
                    <Maximize className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Article Section */}
              <article className="bg-white p-4 sm:p-8">
                <h2 className="text-3xl sm:text-[40px] font-bold text-slate-800 my-6 leading-tight">
                  {course.title}
                </h2>
                <div 
                  className="text-slate-600 leading-relaxed pb-6 mb-6 border-b border-blue-100"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />

                <div className="border-b border-blue-100 pb-6 px-2">
                  <h2 className="text-2xl sm:text-[28px] font-bold text-slate-800 my-6">
                    What You Will Learn:
                  </h2>

                  <ul className="">
                    {course.about?.map((item: string, index: number) => (
                      <li key={index} className="flex mb-6 gap-3 text-slate-600">
                        <span className="w-1.5 h-1.5 bg-gray-500 mt-2.5 rounded-full flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    )) || (
                      <li className="flex mb-6 gap-3 text-slate-600">
                        <span className="w-1.5 h-1.5 bg-gray-500 mt-2.5 rounded-full flex-shrink-0"></span>
                        <span>Comprehensive understanding of the subject matter through hands-on projects and real-world examples.</span>
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            </div>

            {/* Student Review Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold border-b border-dashed border-slate-200 text-[#1e293b] pb-6 mb-6">
                Average Reviews
              </h3>

              <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-dashed border-slate-200">
                <div className="bg-blue-600 text-white px-10 py-8 rounded-2xl flex flex-col items-center justify-center min-w-[160px]">
                  <span className="text-5xl font-black mb-2">{course.rating || "0.0"}</span>
                  <div className="flex text-amber-300 text-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.round(course.rating || 0) ? "fill-current text-amber-300" : "text-blue-400 fill-blue-400/30"}`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm font-bold opacity-90">{course.reviewCount || reviews.length} Ratings</p>
                </div>

                <div className="flex-1 w-full space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r: any) => r.rating === star).length
                    const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
                    return (
                    <div key={star} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 min-w-[30px]">
                        <span className="text-sm font-bold text-slate-600">{star}</span>
                        <Star className="w-[10px] h-[10px] text-orange-400 fill-orange-400" />
                      </div>
                      <div className="flex-1 h-2 bg-[#f3f9ff] rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-400 min-w-[35px]">{pct}%</span>
                    </div>
                  )})}
                </div>
              </div>

              <div className="flex justify-between items-center mt-10 mb-6">
                <h4 className="font-bold text-[#1e293b]">All Reviews ({reviews.length})</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Sort By :</span>
                  <button className="bg-[#f3f9ff] border border-slate-200 px-4 py-1.5 rounded-full font-bold text-slate-700 flex items-center gap-2 text-sm">
                    Newest <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review: any) => (
                    <div key={review.id} className="bg-[#f3f9ff] rounded-3xl p-8 border border-slate-50">
                      <div className="mb-6">
                        <div className="flex text-orange-400 text-sm mb-4 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? "fill-current text-orange-400" : "text-slate-300 fill-slate-300"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 leading-relaxed border-b border-dashed border-slate-200 pb-6">
                          "{review.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pb-6 mb-6 border-b border-dashed border-slate-200">
                        <Image
                          src={review.student?.imageUrl || `https://ui-avatars.com/api/?name=${review.student?.name || "User"}&background=8b5cf6&color=fff`}
                          alt="User"
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h5 className="font-bold text-[#1e293b] pb-1 text-lg">{review.student?.name || "Student"}</h5>
                          <p className="text-blue-600 text-sm font-medium">Student</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500">No reviews yet. Be the first to review!</div>
                )}
              </div>
              
              <div className="pt-4">
                <button type="submit" className="bg-[#007bff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm">
                  See All Reviews
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </section>

            {/* Write a Review Section */}
            {isEnrolled ? (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8">
                <h3 className="text-xl font-bold text-[#1e293b] mb-4">Write a Review</h3>
                <div className="border-b border-dashed border-slate-200 mb-8"></div>

                <form className="space-y-6" onSubmit={handleReviewSubmit}>
                  {/* Name and Email are usually handled by auth, but user requested form fields. 
                      I'll disable them if we can get from session, or just leave them as decorative/optional if auth is strict.
                      Actually, let's bind them to state but maybe they aren't used in API since we use session.
                      I'll just keep them for UI but rely on session for identity.
                   */}

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">Star Reviews</label>
                    <div className="flex gap-1 text-xl">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 cursor-pointer ${i <= reviewForm.rating ? "text-orange-400 fill-orange-400" : "text-slate-200 fill-slate-200"}`} 
                          onClick={() => setReviewForm({...reviewForm, rating: i})}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#1e293b]">Your Review</label>
                    <textarea
                      placeholder="Write your review..."
                      rows={5}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      required
                      className="w-full bg-[#f3f9ff] border border-slate-100 rounded-3xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmittingReview}
                      className="bg-[#007bff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm disabled:opacity-50"
                    >
                      {isSubmittingReview ? "Submitting..." : "Submit Review"}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              </section>
            ) : (
              <div className="mt-8 p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center">
                <p className="text-blue-800 font-medium">Enroll in this course to write a review.</p>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:w-1/3 space-y-4">
             {/* Enroll Card */}
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-slate-800">{course.price || "$49.00"}</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">50% Off</span>
                </div>
                
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolled}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 mb-4 flex items-center justify-center gap-2 ${
                    isEnrolled 
                    ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" /> Enrolled
                    </>
                  ) : (
                    <>
                      Enroll Now <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-slate-400 text-xs mb-6">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Video className="w-4 h-4 text-slate-400" />
                    <span>{course.totalLessons || 24} Lessons</span>
                  </div>
                   <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Video className="w-4 h-4 text-slate-400" />
                    <span>{course.duration || "12h 30m"} Total Length</span>
                  </div>
                   <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Video className="w-4 h-4 text-slate-400" />
                    <span>Lifetime Access</span>
                  </div>
                </div>
             </div>

            {/* Accordion Content */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-1 border-slate-100">
              <div className="space-y-3">
                {/* Accordion Items - Mapping from course.modules or using dummy data if empty */}
                {(course.modules && course.modules.length > 0 ? course.modules : [
                  { title: "Introduction to Python", lessons: ["What is Python?", "Setting up your Environment", "Writing your first program"] },
                  { title: "Variables and Data Types", lessons: ["Variables", "Strings", "Numbers"] },
                  { title: "Control Flow", lessons: ["If Statements", "Loops", "Functions"] }
                ]).map((module: any, index: number) => (
                  <div key={index} className="accordion-item">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`w-full flex justify-between items-center p-5 mb-1 rounded-xl group transition-colors ${
                        activeAccordion === index ? "bg-blue-50 border-blue-100 text-blue-700" : "bg-[#f4faff] border border-transparent hover:border-slate-200"
                      }`}
                    >
                      <span className="font-bold text-lg text-left">{module.title}</span>
                      <ChevronDown 
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${activeAccordion === index ? "rotate-180 text-blue-600" : ""}`} 
                      />
                    </button>

                    <div
                      className={`accordion-content border-x border-b border-slate-50 rounded-b-2xl overflow-hidden transition-all duration-300 ${
                        activeAccordion === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 hidden"
                      }`}
                    >
                      <div className="bg-white">
                        {/* Adapt to API structure (items) or dummy structure (lessons array) */}
                        {(Array.isArray(module.lessons) ? module.lessons : module.items || []).map((lesson: any, lIndex: number) => {
                          const lessonId = typeof lesson === 'object' ? lesson.id : null
                          const isCompleted = lessonId && completedLessons.includes(lessonId)

                          return (
                          <div
                            key={lIndex}
                            className="p-4 border-b border-dashed border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {isEnrolled ? (
                                  <button 
                                    onClick={() => lessonId && toggleLessonCompletion(lessonId)}
                                    className="mt-1 hover:scale-110 transition-transform"
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                                    ) : (
                                      <Play className="w-4 h-4 text-blue-500" />
                                    )}
                                  </button>
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400 mt-1" />
                                )}
                                
                                <div className="space-y-1">
                                  <h5 className={`text-[#1e293b] pb-1 text-base leading-tight font-medium ${isCompleted ? "text-slate-400 line-through decoration-slate-400/50" : ""}`}>
                                    {typeof lesson === 'string' ? lesson : lesson.title}
                                  </h5>

                                  {isEnrolled && lessonId && (
                                    <button 
                                      onClick={() => lessonId && toggleLessonCompletion(lessonId)}
                                      className={`text-xs font-bold flex items-center gap-1 hover:underline ${isCompleted ? "text-slate-400" : "text-blue-600"}`}
                                    >
                                      {isCompleted ? "Completed" : "Mark as Complete"}
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <span>{typeof lesson === 'string' ? "10:00" : (lesson.duration || "10:00")}</span>
                                {!isEnrolled && <Lock className="w-3 h-3 text-slate-300" />}
                              </div>
                            </div>
                          </div>
                        )})}
                         {/* Fallback if no items/lessons available */}
                         {(!module.items && !Array.isArray(module.lessons)) && (
                             <div className="p-4 text-sm text-slate-500 italic">
                                 Content details not available in preview.
                             </div>
                         )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

