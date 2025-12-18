import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"

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
    // Fallback for counts using raw queries if model access fails (as seen in other files)
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

    // Revenue (Approximate: Sum of Course Price * Enrollment Count)
    // This is complex to do via Prisma aggregate without explicit relation join in aggregate, 
    // so we'll do a simpler query or raw query.
    // For now, let's just count total enrollments and multiply by an average or sum actual prices if possible.
    // Let's try to get all enrollments with course price.
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
            // Raw query for revenue
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
    } else {
        recentStudents = await prisma.$queryRaw`SELECT id, name, email, createdAt, imageUrl FROM User WHERE role='student' ORDER BY createdAt DESC LIMIT 5` as any[]
    }

    // 3. Teachers List (Top 5)
    let teachers: any[] = []
    if ((prisma as any).user) {
        // Fetch teachers with course count
        // Prisma doesn't support relation count sort easily without aggregate, 
        // so we just fetch 5 teachers.
        const allTeachers = await (prisma as any).user.findMany({
            where: { role: 'teacher' },
            take: 5,
            select: {
                id: true,
                name: true,
                courses: {
                    select: { id: true }
                }
            }
        })
        teachers = allTeachers.map((t: any) => ({
            name: t.name,
            qualification: "Teacher", // Placeholder
            fees: "$0", // Placeholder
            performance: "Good", // Placeholder
            courseCount: t.courses.length
        }))
    } else {
        const rawTeachers = await prisma.$queryRaw`SELECT id, name FROM User WHERE role='teacher' LIMIT 5` as any[]
        teachers = rawTeachers.map((t: any) => ({
            name: t.name,
            qualification: "Teacher",
            fees: "$0",
            performance: "Good",
            courseCount: 0
        }))
    }

    // 4. Graph Data (Mocked for now as we need time-series data which might be sparse)
    // In a real app, we would group by createdAt.
    // We will return the static data structure for graphs but maybe inject real totals if possible.
    
    return NextResponse.json({
        stats: [
            { label: "Students", value: studentCount.toString(), icon: "🎓", color: "bg-blue-100 text-blue-600" },
            { label: "Teachers", value: teacherCount.toString(), icon: "👩‍🏫", color: "bg-orange-100 text-orange-600" },
            { label: "Courses", value: courseCount.toString(), icon: "📚", color: "bg-purple-100 text-purple-600" },
            { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: "💰", color: "bg-green-100 text-green-600" },
        ],
        recentStudents: recentStudents.map(s => ({
            name: s.name,
            subtitle: new Date(s.createdAt).toLocaleDateString(),
            initial: s.name.charAt(0)
        })),
        teachers
    })

  } catch (error: any) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
