"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("week")
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("Overview")
  const [courses, setCourses] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [recentStudents, setRecentStudents] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [cRes, sRes] = await Promise.all([
        fetch("/api/teacher/course-management/courses").catch(() => null),
        fetch("/api/admin/stats").catch(() => null)
      ])
      
      const cData = await cRes?.json().catch(() => null)
      const sData = await sRes?.json().catch(() => null)
      
      if (cData?.courses) setCourses(cData.courses)
      if (sData) {
        if (sData.stats) setStats(sData.stats)
        if (sData.recentStudents) setRecentStudents(sData.recentStudents)
        if (sData.teachers) setTeachers(sData.teachers)
      }
      setLoading(false)
    })()
  }, [])

  const filteredCourses = courses.filter(
    (c) => query === "" || String(c.title).toLowerCase().includes(query.toLowerCase())
  )

  const statCards = stats.length > 0 ? stats : [
    { label: "Students", value: "0", icon: "🎓", color: "bg-blue-100 text-blue-600" },
    { label: "Teachers", value: "0", icon: "👩‍🏫", color: "bg-orange-100 text-orange-600" },
    { label: "Courses", value: "0", icon: "📚", color: "bg-purple-100 text-purple-600" },
    { label: "Revenue", value: "$0", icon: "💰", color: "bg-green-100 text-green-600" },
  ]

  const performanceData = [
    { name: "Week 01", this: 420, last: 320 },
    { name: "Week 02", this: 380, last: 360 },
    { name: "Week 03", this: 460, last: 410 },
    { name: "Week 04", this: 430, last: 480 },
    { name: "Week 05", this: 520, last: 450 },
  ]

  const overviewData = [
    { month: "Jan", projects: 12, revenue: 40, active: 8 },
    { month: "Feb", projects: 10, revenue: 42, active: 9 },
    { month: "Mar", projects: 14, revenue: 45, active: 11 },
    { month: "Apr", projects: 9, revenue: 38, active: 7 },
    { month: "May", projects: 13, revenue: 48, active: 10 },
    { month: "Jun", projects: 11, revenue: 44, active: 9 },
    { month: "Jul", projects: 15, revenue: 52, active: 12 },
    { month: "Aug", projects: 12, revenue: 49, active: 10 },
    { month: "Sep", projects: 16, revenue: 55, active: 12 },
    { month: "Oct", projects: 7, revenue: 28, active: 5 },
    { month: "Nov", projects: 14, revenue: 50, active: 11 },
    { month: "Dec", projects: 18, revenue: 60, active: 14 },
  ]

  const messages = [
    { name: "Samantha William", time: "12:45 PM" },
    { name: "Tony Soop", time: "12:45 PM" },
    { name: "Karen Hope", time: "12:45 PM" },
    { name: "Jordan Nico", time: "12:45 PM" },
  ]

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)
  const eventDays = new Set([10, 11])

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Admin Dashboard</h1>
            <p className="text-white/80">Monitor system, manage courses and users</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 border-white/20">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses" className="bg-transparent outline-none text-sm text-white placeholder:text-white/70" />
            </div>
            <Link href="/admin/course-management/courses" className="px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold">Manage Courses</Link>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Overview","Courses","Users","Reports"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm ${tab === t ? "bg-amber-500 text-black" : "border border-white/20 text-white hover:bg-white/10"}`}>{t}</button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.color}`}>{s.icon}</div>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
              </div>
            ))}
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">School Performance</h2>
              <div className="text-xs text-muted-foreground">{timeframe === "week" ? "This Week vs Last Week" : "Monthly"}</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="this" stroke="#6366f1" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="last" stroke="#f43f5e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">School Overview</h2>
              <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="px-3 py-2 rounded-md border border-border bg-input text-foreground text-sm">
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overviewData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="active" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">School Calendar</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">December 2025</div>
              <div className="flex items-center gap-2 text-sm">
                <button className="px-2 py-1 rounded border border-border">‹</button>
                <button className="px-2 py-1 rounded border border-border">›</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
                <div key={d} className="text-xs text-muted-foreground">{d}</div>
              ))}
              {Array.from({ length: 1 }, (_, i) => i).map(() => (
                <div key="empty-1" />
              ))}
              {calendarDays.map((day) => (
                <div key={day} className={`h-10 flex items-center justify-center rounded ${eventDays.has(day) ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{day}</div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Teacher Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Qualification</th>
                    <th className="py-2 pr-4">Fees</th>
                    <th className="py-2">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length > 0 ? teachers.map((r, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="py-3 pr-4 text-foreground">{r.name}</td>
                      <td className="py-3 pr-4 text-foreground">{r.qualification}</td>
                      <td className="py-3 pr-4 text-foreground">{r.fees}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${r.performance === 'Good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.performance}</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-muted-foreground">No teachers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">Recent Students</h2>
              <p className="text-xs text-muted-foreground">Total {stats.find(s => s.label === "Students")?.value || 0} Students</p>
            </div>
            <Link href="/admin/user-management/create" className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">+</Link>
          </div>
          <div className="space-y-4">
            {recentStudents.length > 0 ? recentStudents.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">{s.name ? s.name.charAt(0) : "S"}</div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.subtitle}</div>
                  </div>
                </div>
                <Link href="/admin/user-management" className="text-xs text-primary">View</Link>
              </div>
            )) : (
                <div className="text-sm text-muted-foreground text-center py-4">No recent students</div>
            )}
            <Link href="/admin/user-management" className="block text-center mt-2 w-full px-4 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80">View More</Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Messages</h2>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">{m.name.charAt(0)}</div>
                  <div className="text-sm text-foreground">{m.name}</div>
                </div>
                <div className="text-xs text-muted-foreground">{m.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Recommended Courses</h2>
          <Link href="/admin/course-management" className="px-4 py-2 rounded-lg border text-sm">Manage</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.slice(0, 8).map((c) => (
            <div key={c.id} className="rounded-lg border border-border bg-muted p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">{c.status}</span>
                <div className="text-xl">📚</div>
              </div>
              <div className="font-semibold text-foreground mb-1">{c.title}</div>
              <div className="text-sm text-muted-foreground">{c.students} students</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{c.lessons} lessons</span>
          <Link href="/admin/course-management/courses" className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
