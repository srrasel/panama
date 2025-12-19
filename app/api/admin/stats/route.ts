import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    
    // Session check
    let session;
    try {
      session = await getSession(sid)
    } catch (e) {
      return NextResponse.json({ error: "Session verification failed" }, { status: 500 })
    }

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 1. Stats Cards
    let studentCount = 0
    let teacherCount = 0
    let courseCount = 0
    let totalRevenue = 0

    // Students & Teachers
    if ((prisma as any).user) {
        studentCount = await (prisma as any).user.count({ where: { role: 'student' } })
        teacherCount = await (prisma as any).user.count({ where: { role: 'teacher' } })
    } else {
        const s: any[] = await prisma.$queryRaw`SELECT COUNT(*) as count FROM User WHERE role='student'`
        studentCount = Number(s[0]?.count || 0)
        const t: any[] = await prisma.$queryRaw`SELECT COUNT(*) as count FROM User WHERE role='teacher'`
        teacherCount = Number(t[0]?.count || 0)
    }

    // Courses
    if ((prisma as any).course) {
        courseCount = await (prisma as any).course.count({ where: { status: 'Active' } })
    } else {
        const c: any[] = await prisma.$queryRaw`SELECT COUNT(*) as count FROM Course WHERE status='Active'`
        courseCount = Number(c[0]?.count || 0)
    }

    // Revenue
    try {
        if ((prisma as any).enrollment) {
            const enrollments = await (prisma as any).enrollment.findMany({
                include: {
                    course: {
                        select: { price: true }
                    }
                }
            })
            totalRevenue = enrollments.reduce((acc: number, curr: any) => acc + (curr.course?.price || 0), 0)
        } else {
            const r: any[] = await prisma.$queryRaw`
                SELECT SUM(c.price) as total 
                FROM Enrollment e 
                JOIN Course c ON e.courseId = c.id
            `
            totalRevenue = Number(r[0]?.total || 0)
        }
    } catch (e) {
        console.error("Revenue calc error:", e)
        totalRevenue = 0
    }

    // 2. Recent Students
    let recentStudents: any[] = []
    if ((prisma as any).user) {
        recentStudents = await (prisma as any).user.findMany({
            where: { role: 'student' },
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                imageUrl: true
            }
        })
    }

    // 3. Teachers List
    let teachers: any[] = []
    if ((prisma as any).user) {
        const t = await (prisma as any).user.findMany({
            where: { role: 'teacher' },
            take: 5,
            include: {
                _count: {
                    select: { courses: true }
                }
            }
        })
        teachers = t.map((teacher: any) => ({
            name: teacher.name,
            qualification: teacher.major || "N/A",
            fees: "N/A",
            performance: teacher._count.courses > 0 ? "Good" : "New"
        }))
    }

    // 4. Messages (Last 5)
    let messages: any[] = []
    try {
        if ((prisma as any).message) {
            messages = await (prisma as any).message.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    sender: { select: { name: true, imageUrl: true } }
                }
            })
        }
    } catch (e) {
        console.error("Messages fetch error:", e)
    }

    // 5. Monthly Stats (Last 12 months)
    const monthlyStats = []
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const now = new Date()
    
    // Performance Data (Last 5 Weeks vs Previous 5 Weeks)
    const performanceData = []
    
    // Get last 12 months data
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1)
    // Get last 10 weeks data for performance
    const tenWeeksAgo = new Date(now.getTime() - 10 * 7 * 24 * 60 * 60 * 1000)

    const users = await (prisma as any).user.findMany({
        where: { createdAt: { gte: oneYearAgo } },
        select: { createdAt: true }
    })
    
    const enrollments = await (prisma as any).enrollment.findMany({
        where: { enrolledAt: { gte: oneYearAgo } },
        include: { course: { select: { price: true } } }
    })

    const courses = await (prisma as any).course.findMany({
        where: { createdAt: { gte: oneYearAgo } },
        select: { createdAt: true }
    })

    // Calculate Monthly Stats
    for (let i = 0; i < 12; i++) {
        // ... (existing logic)
        const d = new Date(now.getFullYear(), i, 1) // This loop logic needs to be relative to "now" properly to show trailing 12 months correctly
        // But the previous implementation was iterating Jan-Dec of current year or mixed?
        // Let's fix to be Last 12 Months relative to NOW
        
        const targetDate = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
        const monthIndex = targetDate.getMonth()
        const year = targetDate.getFullYear()
        const monthName = months[monthIndex]

        const activeUsers = users.filter((u: any) => 
            u.createdAt.getMonth() === monthIndex && u.createdAt.getFullYear() === year
        ).length

        const newCourses = courses.filter((c: any) => 
            c.createdAt.getMonth() === monthIndex && c.createdAt.getFullYear() === year
        ).length

        const revenue = enrollments
            .filter((e: any) => 
                e.enrolledAt.getMonth() === monthIndex && e.enrolledAt.getFullYear() === year
            )
            .reduce((acc: number, curr: any) => acc + (curr.course?.price || 0), 0)

        monthlyStats.push({
            month: monthName,
            projects: newCourses, 
            revenue: revenue,
            active: activeUsers
        })
    }

    // Calculate Weekly Performance (Enrollments)
    // Week 05 = Current Week
    // Week 01 = 4 weeks ago
    for (let i = 0; i < 5; i++) {
        // "This" period: i weeks ago (from end). i=4 is current week? No, let's say i=0 is 4 weeks ago.
        // Let's align with chart: Week 01 (oldest) -> Week 05 (newest)
        
        const weekOffset = 4 - i // 4, 3, 2, 1, 0 weeks ago
        const startOfWeek = new Date(now.getTime() - weekOffset * 7 * 24 * 60 * 60 * 1000)
        const endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
        
        // "Last" period: 5 weeks before that? Or same week last year? 
        // Let's do "Previous Period" (5 weeks prior to this week)
        const startOfPrevWeek = new Date(startOfWeek.getTime() - 5 * 7 * 24 * 60 * 60 * 1000)
        const endOfPrevWeek = new Date(startOfPrevWeek.getTime() + 7 * 24 * 60 * 60 * 1000)

        const thisVal = enrollments.filter((e: any) => 
            e.enrolledAt >= startOfWeek && e.enrolledAt < endOfWeek
        ).length

        const lastVal = enrollments.filter((e: any) => 
            e.enrolledAt >= startOfPrevWeek && e.enrolledAt < endOfPrevWeek
        ).length

        performanceData.push({
            name: `Week 0${i + 1}`,
            this: thisVal * 10, // Scale up for chart visibility if low
            last: lastVal * 10
        })
    }

    return NextResponse.json({
        stats: [
            { label: "Students", value: studentCount.toString(), icon: "🎓", color: "bg-blue-100 text-blue-600" },
            { label: "Teachers", value: teacherCount.toString(), icon: "👩‍🏫", color: "bg-orange-100 text-orange-600" },
            { label: "Courses", value: courseCount.toString(), icon: "📚", color: "bg-purple-100 text-purple-600" },
            { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: "💰", color: "bg-green-100 text-green-600" },
        ],
        recentStudents: recentStudents.map((s: any) => ({
            name: s.name,
            subtitle: `Joined ${new Date(s.createdAt).toLocaleDateString()}`,
            imageUrl: s.imageUrl
        })),
        teachers,
        messages: messages.map((m: any) => ({
            name: m.sender.name,
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: m.content
        })),
        monthlyStats,
        performanceData
    })

  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
