"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, FileText, Code, Download, CheckCircle, Circle } from "lucide-react"

export default function CourseLearning({ params }: { params: { courseId: string } }) {
  const [activeLesson, setActiveLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/student/learning/${params.courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.course) {
          setCourse(data.course)
          setCompletedLessons(data.course.completedLessonIds || [])
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [params.courseId])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!course) return <div className="p-8 text-center">Course not found</div>

  const allLessons = course.modules.flatMap((m: any) => m.lessons)
  const currentLesson = allLessons[activeLesson]
  const isLessonCompleted = currentLesson ? completedLessons.includes(currentLesson.id) : false

  const handleCompleteLesson = async () => {
    if (!currentLesson) return

    if (!isLessonCompleted) {
      // Optimistic update
      setCompletedLessons([...completedLessons, currentLesson.id])
      
      try {
        await fetch(`/api/student/learning/${params.courseId}/complete`, {
            method: "POST",
            body: JSON.stringify({ lessonId: currentLesson.id })
        })
      } catch (error) {
        console.error("Error marking complete:", error)
      }
    }
    
    if (activeLesson < allLessons.length - 1) {
      setActiveLesson(activeLesson + 1)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/student/courses">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft size={20} />
                Back to Courses
              </button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{course.title}</h1>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">
                {completedLessons.length} of {allLessons.length} lessons
              </p>
              <div className="w-32 bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${allLessons.length > 0 ? (completedLessons.length / allLessons.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden mb-8">
              <img
                src={currentLesson?.videoUrl || "/placeholder.svg"}
                alt="Video"
                className="w-full aspect-video object-cover"
              />
            </div>

            {/* Lesson Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{currentLesson?.title}</h2>
                    <p className="text-muted-foreground mt-2">{currentLesson?.duration}</p>
                  </div>
                  {isLessonCompleted && (
                    <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                      <CheckCircle size={18} />
                      Completed
                    </span>
                  )}
                </div>
                <div 
                  className="text-foreground leading-relaxed [&_p]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_img]:max-w-full [&_img]:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: currentLesson?.content || "" }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleCompleteLesson}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isLessonCompleted ? "Next Lesson" : "Mark as Complete"}
                </button>
                <button className="flex-1 border border-border text-foreground font-semibold py-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Resources
                </button>
              </div>

              {/* Lesson Description */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Lesson Materials</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors">
                    <FileText size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Lesson Notes</p>
                      <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors">
                    <Code size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Code Examples</p>
                      <p className="text-xs text-muted-foreground">ZIP • 1.8 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Outline */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-6">Course Outline</h3>
              <div className="space-y-6">
                {course.modules.map((module: any, mIdx: number) => (
                  <div key={module.id || mIdx}>
                    <h4 className="font-semibold text-foreground text-sm mb-3">{module.title}</h4>
                    <div className="space-y-2">
                      {module.lessons.map((lesson: any, lIdx: number) => {
                        const globalLessonIdx =
                          course.modules.slice(0, mIdx).reduce((acc: number, m: any) => acc + m.lessons.length, 0) +
                          lIdx
                        const isActive = activeLesson === globalLessonIdx
                        const isCompleted = completedLessons.includes(lesson.id)

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(globalLessonIdx)}
                            className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
                              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted/50 text-foreground"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle size={18} className="mt-0.5 flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-sm">{lesson.title}</p>
                              <p
                                className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                              >
                                {lesson.duration}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Stats */}
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-muted-foreground">Instructor Rating</p>
                  <p className="font-semibold text-foreground">⭐ 4.9</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-muted-foreground">Reviews</p>
                  <p className="font-semibold text-foreground">120</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
