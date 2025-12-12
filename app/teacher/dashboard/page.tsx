"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function TeacherDashboard() {
  const [earningsData, setEarningsData] = useState<{ month: string; earnings: number }[]>([])
  const [recentCourses, setRecentCourses] = useState<{ id: number; title: string; students: number; status: string }[]>([])
  const [stats, setStats] = useState<{ totalStudents: number; totalCourses: number; totalEarnings: number } | null>(null)

  useEffect(() => {
    ;(async () => {
      const dRes = await fetch("/api/teacher/dashboard").catch(() => null)
      const dData = await dRes?.json().catch(() => null)
      if (dData?.earnings) setEarningsData(dData.earnings)
      if (dData?.stats) setStats(dData.stats)

      const cRes = await fetch("/api/teacher/course-management/courses").catch(() => null)
      const cData = await cRes?.json().catch(() => null)
      if (cData?.courses) setRecentCourses(cData.courses.slice(0, 5))
    })()
  }, [])

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-md">
              EA
            </div>
            <div>
              <h1 className="text-3xl font-bold">Eugene Andre</h1>
              <p className="text-slate-300">Instructor</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/teacher/course-management/courses/create" className="px-6 py-2 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-50 transition-colors">
              Add New Course
            </Link>
            
          </div>
        </div>
      </div>

      

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Students</p>
              <p className="text-4xl font-bold text-foreground mt-2">{stats?.totalStudents ?? 0}</p>
            </div>
            <div className="text-5xl">👥</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Courses</p>
              <p className="text-4xl font-bold text-foreground mt-2">{stats?.totalCourses ?? 0}</p>
            </div>
            <div className="text-5xl">📚</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Earnings</p>
              <p className="text-4xl font-bold text-foreground mt-2">${stats?.totalEarnings ?? 0}</p>
            </div>
            <div className="text-5xl">💰</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Earnings by Year</h2>
          <span className="text-sm text-muted-foreground">📅 12/03/2025 - 12/09/2025</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }} />
            <Bar dataKey="earnings" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Recently Created Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Courses</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Enrolled</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCourses.map((course) => (
                <tr key={course.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">📚</div>
                      <span className="font-medium text-foreground">{course.title}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="font-semibold text-foreground">{course.students}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-medium">
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
