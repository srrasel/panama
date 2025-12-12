"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Star, Users, Clock, Award } from "lucide-react"
import { useEffect, useState } from "react"

export default function CoursePage({ params }: { params: { id: string } }) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data.course))
      .catch(() => setCourse(null))
  }, [params.id])

  return (
    <main>
      <Navigation />

      <section className="px-4 py-20 sm:py-28 bg-[rgb(127,29,29)]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-4 border border-white/20">
                  Featured Course
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">{course?.title || "Course"}</h1>
              <p className="text-lg text-white/80 mb-6 text-balance">{course?.description || "Loading description"}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-white" />
                  <span className="font-semibold text-white">{course?.rating}</span>
                  <span className="text-white/80">({course?.students?.toLocaleString?.()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-white" />
                  <span className="text-white/80">
                    Instructor: <span className="font-semibold text-white">{course?.instructor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-white" />
                  <span className="text-white/80">{course?.duration}</span>
                </div>
              </div>

              <div className="rounded-lg aspect-video flex items-center justify-center bg-white/10 border border-white/20">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white/50">▶</div>
                  <p className="text-white/70 mt-2">Course Preview Video</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-6">{course?.price}</div>

                <button
                  onClick={() => setIsEnrolled(!isEnrolled)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition mb-4 ${
                    isEnrolled
                      ? "bg-primary/20 text-primary border border-primary"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isEnrolled ? "Enrolled ✓" : "Enroll Now"}
                </button>

                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-foreground/60">Duration</p>
                      <p className="font-semibold">{course?.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award size={20} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-foreground/60">Level</p>
                      <p className="font-semibold">{course?.level}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={20} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-foreground/60">Students</p>
                      <p className="font-semibold">{course?.students?.toLocaleString?.()}+</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground/60">
                    💡 <span className="font-semibold">Money-back guarantee</span>
                    <br />
                    Full refund if not satisfied within 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-6">What You'll Learn</h2>
                <ul className="space-y-3">
                  {course?.about?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-foreground/80 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules Section */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Course Content</h2>
                <div className="space-y-3">
                  {course?.modules?.map((module: any, index: number) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-5 hover:border-foreground/30 transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                          <p className="text-sm text-foreground/60">
                            {module.lessons} lessons • {module.duration}
                          </p>
                        </div>
                        <span className="text-2xl text-foreground/30">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">Course Highlights</h3>
                <ul className="space-y-3 text-sm text-foreground/70">
                  <li>✓ Lifetime access to course materials</li>
                  <li>✓ Downloadable resources and projects</li>
                  <li>✓ Completion certificate</li>
                  <li>✓ 24/7 student support</li>
                  <li>✓ Mobile-friendly learning</li>
                  <li>✓ Community forum access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
