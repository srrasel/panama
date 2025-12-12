"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, FileText, Code, Download, CheckCircle, Circle } from "lucide-react"

export default function CourseLearning({ params }: { params: { courseId: string } }) {
  const [activeLesson, setActiveLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([0, 1, 3])

  // Demo course data based on course ID
  const courses: Record<string, any> = {
    "1": {
      title: "Advanced JavaScript & ES6+",
      instructor: "Sarah Johnson",
      progress: 65,
      rating: 4.9,
      reviews: 1230,
      description: "Master modern JavaScript with ES6+ features, async programming, and advanced patterns.",
      modules: [
        {
          id: 1,
          title: "Module 1: ES6 Fundamentals",
          lessons: [
            {
              id: 1,
              title: "Introduction to ES6",
              duration: "15 mins",
              content: "Learn the basics of ES6 and why it changed JavaScript forever.",
              videoUrl: "/javascript-course.jpg",
            },
            {
              id: 2,
              title: "Arrow Functions & This Binding",
              duration: "20 mins",
              content: "Understand arrow functions and how they handle the 'this' keyword differently.",
              videoUrl: "/arrow-functions.jpg",
            },
            {
              id: 3,
              title: "Destructuring Assignment",
              duration: "18 mins",
              content: "Master destructuring patterns for arrays and objects.",
              videoUrl: "/destructuring.jpg",
            },
          ],
        },
        {
          id: 2,
          title: "Module 2: Async Programming",
          lessons: [
            {
              id: 4,
              title: "Promises Deep Dive",
              duration: "22 mins",
              content: "Understanding promises and promise chaining.",
              videoUrl: "/promises.jpg",
            },
            {
              id: 5,
              title: "Async/Await Patterns",
              duration: "25 mins",
              content: "Master async/await syntax and error handling.",
              videoUrl: "/async-await.jpg",
            },
          ],
        },
      ],
    },
    "2": {
      title: "Web Development Fundamentals",
      instructor: "Mike Chen",
      progress: 48,
      rating: 4.8,
      reviews: 950,
      description: "Complete guide to web development covering HTML, CSS, JavaScript, and responsive design.",
      modules: [
        {
          id: 1,
          title: "Module 1: HTML Essentials",
          lessons: [
            {
              id: 1,
              title: "HTML5 Structure",
              duration: "20 mins",
              content: "Learn semantic HTML5 elements and document structure.",
              videoUrl: "/html5.jpg",
            },
            {
              id: 2,
              title: "Forms & Validation",
              duration: "18 mins",
              content: "Master HTML forms and built-in validation.",
              videoUrl: "/forms.jpg",
            },
          ],
        },
        {
          id: 2,
          title: "Module 2: CSS & Layout",
          lessons: [
            {
              id: 3,
              title: "CSS Grid & Flexbox",
              duration: "30 mins",
              content: "Advanced layout techniques with Grid and Flexbox.",
              videoUrl: "/css-layout.jpg",
            },
          ],
        },
      ],
    },
    "3": {
      title: "React Mastery",
      instructor: "Emily Davis",
      progress: 82,
      rating: 4.9,
      reviews: 2100,
      description: "Become a React expert with hooks, state management, and performance optimization.",
      modules: [
        {
          id: 1,
          title: "Module 1: React Fundamentals",
          lessons: [
            {
              id: 1,
              title: "JSX & Components",
              duration: "25 mins",
              content: "Understanding JSX syntax and functional components.",
              videoUrl: "/react-jsx.jpg",
            },
            {
              id: 2,
              title: "Hooks Introduction",
              duration: "28 mins",
              content: "Master useState, useEffect, and custom hooks.",
              videoUrl: "/react-hooks.jpg",
            },
          ],
        },
        {
          id: 2,
          title: "Module 2: Advanced React",
          lessons: [
            {
              id: 3,
              title: "State Management",
              duration: "32 mins",
              content: "Context API and state management patterns.",
              videoUrl: "/state-management-concept.png",
            },
            {
              id: 4,
              title: "Performance Optimization",
              duration: "35 mins",
              content: "Code splitting, lazy loading, and memoization.",
              videoUrl: "/react-performance.jpg",
            },
          ],
        },
      ],
    },
  }

  const course = courses[params.courseId] || courses["1"]
  const allLessons = course.modules.flatMap((m: any) => m.lessons)
  const currentLesson = allLessons[activeLesson]
  const isLessonCompleted = completedLessons.includes(activeLesson)

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(activeLesson)) {
      setCompletedLessons([...completedLessons, activeLesson])
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
            <Link href="/student/continue-learning">
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
                  style={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
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
                src={currentLesson.videoUrl || "/placeholder.svg"}
                alt="Video"
                className="w-full aspect-video object-cover"
              />
            </div>

            {/* Lesson Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{currentLesson.title}</h2>
                    <p className="text-muted-foreground mt-2">{currentLesson.duration}</p>
                  </div>
                  {isLessonCompleted && (
                    <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                      <CheckCircle size={18} />
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-foreground leading-relaxed">{currentLesson.content}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleCompleteLesson}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isLessonCompleted ? "Mark Complete & Next Lesson" : "Mark as Complete"}
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
                  <div key={module.id}>
                    <h4 className="font-semibold text-foreground text-sm mb-3">{module.title}</h4>
                    <div className="space-y-2">
                      {module.lessons.map((lesson: any, lIdx: number) => {
                        const globalLessonIdx =
                          course.modules.slice(0, mIdx).reduce((acc: number, m: any) => acc + m.lessons.length, 0) +
                          lIdx
                        const isActive = activeLesson === globalLessonIdx
                        const isCompleted = completedLessons.includes(globalLessonIdx)

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
                  <p className="font-semibold text-foreground">⭐ {course.rating}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-muted-foreground">Reviews</p>
                  <p className="font-semibold text-foreground">{course.reviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
