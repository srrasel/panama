import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    const session = await getSession(sid)

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 1. Fetch Data
    // We need courses with enrollments (for grades/students) and attendance
    // We also need global counts for performance

    // Helper to safely get counts
    const getCount = async (model: any, where: any = {}) => {
      if (!model) return 0
      return await model.count({ where })
    }
    
    // Helper to get count before date
    const getCountBefore = async (model: any, date: Date, where: any = {}) => {
        if (!model) return 0
        return await model.count({ 
            where: { 
                ...where,
                createdAt: { lt: date }
            } 
        })
    }

    const now = new Date()
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

    // --- Performance Metrics ---
    let studentCount = 0
    let studentGrowth = 0
    let teacherCount = 0
    let teacherGrowth = 0
    let courseCount = 0
    let courseGrowth = 0
    let completionRate = 0
    let satisfaction = 0
    
    // Students
    if ((prisma as any).user) {
        studentCount = await getCount((prisma as any).user, { role: 'student' })
        const prevStudents = await getCountBefore((prisma as any).user, thirtyDaysAgo, { role: 'student' })
        studentGrowth = prevStudents > 0 ? ((studentCount - prevStudents) / prevStudents) * 100 : 0
    }

    // Teachers
    if ((prisma as any).user) {
        teacherCount = await getCount((prisma as any).user, { role: 'teacher' })
        const prevTeachers = await getCountBefore((prisma as any).user, thirtyDaysAgo, { role: 'teacher' })
        teacherGrowth = prevTeachers > 0 ? ((teacherCount - prevTeachers) / prevTeachers) * 100 : 0
    }

    // Courses
    if ((prisma as any).course) {
        courseCount = await getCount((prisma as any).course)
        const prevCourses = await getCountBefore((prisma as any).course, thirtyDaysAgo)
        courseGrowth = prevCourses > 0 ? ((courseCount - prevCourses) / prevCourses) * 100 : 0
    }

    // Completion & Satisfaction
    if ((prisma as any).enrollment) {
        const aggs = await (prisma as any).enrollment.aggregate({
            _avg: { progress: true }
        })
        completionRate = aggs._avg.progress || 0
    }

    if ((prisma as any).review) {
        const aggs = await (prisma as any).review.aggregate({
            _avg: { rating: true }
        })
        satisfaction = aggs._avg.rating || 0
    }

    const performanceReports = [
        { metric: "Active Students", value: studentCount, growth: `+${studentGrowth.toFixed(1)}%` },
        { metric: "Active Teachers", value: teacherCount, growth: `+${teacherGrowth.toFixed(1)}%` },
        { metric: "Total Courses", value: courseCount, growth: `+${courseGrowth.toFixed(1)}%` },
        { metric: "Course Completion Rate", value: `${completionRate.toFixed(1)}%`, growth: "+0%" }, // Hard to calc growth without history
        { metric: "Student Satisfaction", value: `${satisfaction.toFixed(1)}/5`, growth: "+0%" },
        { metric: "System Uptime", value: "99.9%", growth: "+0%" },
    ]

    // --- Course Reports (Grades & Attendance) ---
    let courses: any[] = []
    if ((prisma as any).course) {
        courses = await (prisma as any).course.findMany({
            include: {
                enrollments: true,
                attendance: true
            }
        })
    }

    const gradeReports = courses.map(course => {
        const students = course.enrollments.length
        // Use progress as proxy for grade if no real grades
        // In a real app, we'd average AssignmentSubmission grades
        const totalProgress = course.enrollments.reduce((acc: number, curr: any) => acc + (curr.progress || 0), 0)
        const avgGrade = students > 0 ? (totalProgress / students) : 0
        
        // Pass rate: % of students with > 60% progress (proxy)
        const passedCount = course.enrollments.filter((e: any) => e.progress >= 60).length
        const passRate = students > 0 ? (passedCount / students) * 100 : 0

        return {
            course: course.title,
            avgGrade: Number((avgGrade / 10).toFixed(1)), // Scale 0-100 to 0-10 roughly, or just keep as %? UI shows 8.5, so 0-10 scale.
            students,
            passRate: Math.round(passRate)
        }
    })

    const attendanceReports = courses.map(course => {
        const totalRecords = course.attendance.length
        // If no attendance records, we can't really say.
        // But for the UI, we'll try to aggregate.
        
        // Get unique dates
        const uniqueDates = new Set(course.attendance.map((a: any) => a.date)).size
        
        const absences = course.attendance.filter((a: any) => a.status === 'absent').length
        const present = course.attendance.filter((a: any) => a.status === 'present').length
        
        const avgAttendance = totalRecords > 0 ? (present / totalRecords) * 100 : 0

        return {
            course: course.title,
            avgAttendance: Math.round(avgAttendance),
            totalDays: uniqueDates || 0,
            absences
        }
    })

    return NextResponse.json({
        gradeReports,
        attendanceReports,
        performanceReports
    })

  } catch (error: any) {
    console.error("Analytics API Error:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}
