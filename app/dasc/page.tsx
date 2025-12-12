"use client"

import Link from "next/link"
import { useState } from "react"
import { BookOpen, Users, Timer, CheckCircle2, X } from "lucide-react"

export default function DascPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const stats = [
    { label: "All Courses", value: 35, icon: BookOpen },
    { label: "Enrolled Courses", value: 15, icon: Users },
    { label: "Active Courses", value: 11, icon: Timer },
    { label: "Completed Courses", value: 4, icon: CheckCircle2 },
  ]

  const courses = [
    { category: "Business", title: "POSICIAAL DESIC", image: "/placeholder.svg", lessons: 25, students: "2.6K", progress: 85, instructor: "Eleanor Pena" },
    { category: "Finance", title: "How To Do Extra Activity", image: "/placeholder.svg", lessons: 25, students: "2.6K", progress: 72, instructor: "Annette Black" },
    { category: "Data & Tech", title: "IIT Madras BS Degree", image: "/placeholder.svg", lessons: 25, students: "2.6K", progress: 64, instructor: "Courtney Henry" },
    { category: "Creative", title: "The Most Attractive Thumbnail", image: "/placeholder.svg", lessons: 25, students: "2.6K", progress: 58, instructor: "Savannah Nguyen" },
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Student Dashboard</h1>
              <div className="mt-3 text-sm">
                <Link href="/" className="text-white/80 hover:text-amber-400">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/student/dashboard" className="text-white/80 hover:text-amber-400">Dashboard</Link>
                <span className="mx-2">›</span>
                <span className="text-amber-400">Student Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="px-4 py-2 rounded-full border border-white/10 bg-white/10 text-white text-sm lg:hidden">Menu</button>
              <Link href="#" className="px-4 py-2 rounded-full border border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-black transition text-sm">Become an Instructor</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            <aside className="hidden lg:block lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 ring-4 ring-slate-100 flex items-center justify-center text-2xl">S</div>
                <h3 className="text-slate-900 font-semibold mt-4 text-center">Wade Warren</h3>
                <p className="text-slate-500 text-sm text-center">info@example.com</p>
                <div className="text-sm text-slate-600 mt-4">Welcome, Warren,</div>
                <nav className="mt-3 space-y-1">
                  {["Dashboard", "My Profile", "Message", "Enrolled Courses", "Wishlist", "Reviews", "My Quiz Attempts", "Assignment", "Settings"].map((label, i) => (
                    <Link
                      key={label}
                      href={i === 0 ? "/student/dashboard" : "#"}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${i === 0 ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}
                    >
                      <span className="w-5">•</span>
                      <span>{label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-8">
              <div>
                <h4 className="text-slate-900 font-semibold mb-4">Dashboard</h4>
                <div className="grid md:grid-cols-4 gap-6">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white px-5 py-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                          <p className="text-xl font-semibold text-slate-900">{s.value}</p>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center">
                          {(() => { const Icon = s.icon as any; return <Icon size={18} /> })()}
                        </div>
                      </div>
                      <Link href="#" className="text-xs font-medium text-blue-600 underline">View all</Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-slate-500">In progress Courses</h5>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
                  {courses.map((c, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="rounded-xl overflow-hidden">
                        <img src={c.image} alt={c.title} className="w-full h-40 object-cover" />
                      </div>
                      <div className="p-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md mb-3">{c.category}</span>
                        <div className="flex items-center justify-between mb-3 text-sm">
                          <div className="flex items-center gap-2 text-slate-900"><span>🎥</span><span>{c.lessons} Lessons</span></div>
                          <div className="flex items-center gap-2 text-slate-900"><span>👤</span><span>{c.students} Students</span></div>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-4">{c.title}</h4>
                        <div className="mb-4">
                          <p className="text-slate-900">Complete</p>
                          <div className="w-full bg-blue-100 rounded-full h-3 relative">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${c.progress}%` }}></div>
                            <span className="absolute -top-6" style={{ left: `${c.progress}%` }}>
                              <span className="inline-flex items-center justify-center w-12 h-6 text-xs bg-white text-blue-600 border border-slate-200 rounded">{c.progress}%</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400">★★★★★</span>
                            <span className="text-xs text-slate-500">4.8/5 (1.5K Reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-200" />
                            <span className="text-xs text-slate-500">{c.instructor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl border-r border-slate-200">
            <div className="p-6 h-full flex flex-col">
              <button onClick={() => setSidebarOpen(false)} className="self-end p-2 rounded-md border border-slate-200 mb-4">
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 ring-4 ring-slate-100 flex items-center justify-center text-2xl">S</div>
              <h3 className="text-slate-900 font-semibold mt-4 text-center">Wade Warren</h3>
              <p className="text-slate-500 text-sm text-center">info@example.com</p>
              <div className="text-sm text-slate-600 mt-4">Welcome, Warren,</div>
              <nav className="mt-3 space-y-1">
                {["Dashboard", "My Profile", "Message", "Enrolled Courses", "Wishlist", "Reviews", "My Quiz Attempts", "Assignment", "Settings"].map((label, i) => (
                  <Link
                    key={label}
                    href={i === 0 ? "/student/dashboard" : "#"}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg ${i === 0 ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="w-5">•</span>
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
              <button onClick={() => setSidebarOpen(false)} className="mt-auto px-4 py-2 rounded-lg border border-slate-200">Close</button>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
