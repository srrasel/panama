import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const classId = url.searchParams.get("classId") // This is courseId
  const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10)

  // 1. Get all courses for this teacher (for the dropdown)
  const courses = await prisma.course.findMany({
    where: { teacherId: session.userId },
    orderBy: { title: "asc" },
    include: {
      enrollments: true
    }
  })

  // Format classes for frontend
  const classes = courses.map(c => ({
    id: c.id,
    name: c.title,
    students: c.enrollments.length,
    period: "09:00 - 10:30" // Placeholder as we don't have periods in DB yet
  }))

  let students: any[] = []

  // 2. If a class is selected (or default to first one), get students and attendance
  const targetCourseId = classId || (courses[0]?.id)

  if (targetCourseId) {
    // Verify ownership
    const course = courses.find(c => c.id === targetCourseId)
    if (course) {
        // Get enrolled students
        const enrollments = await prisma.enrollment.findMany({
            where: { courseId: targetCourseId },
            include: { student: true }
        })

        // Get attendance records for this date
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                courseId: targetCourseId,
                date: date
            }
        })

        // Merge
        students = enrollments.map(e => {
            const record = attendanceRecords.find(a => a.studentId === e.studentId)
            return {
                id: e.studentId, // Use string ID from DB
                name: e.student.name,
                roll: e.student.email.split("@")[0], // Placeholder for roll number
                status: record?.status || "present" 
            }
        })
    }
  }

  return NextResponse.json({ classes, date, students })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
      const body = await req.json()
      const classId = String(body.classId)
      const date = String(body.date || new Date().toISOString().slice(0, 10))
      const students = Array.isArray(body.students) ? body.students : []

      if (!classId) {
          return NextResponse.json({ error: "Class ID required" }, { status: 400 })
      }

      // Verify course ownership
      const course = await prisma.course.findUnique({
          where: { id: classId }
      })

      if (!course || course.teacherId !== session.userId) {
          return NextResponse.json({ error: "Invalid course" }, { status: 400 })
      }

      // Process updates in transaction
      await prisma.$transaction(
          students.map((s: any) => 
            prisma.attendance.upsert({
                where: {
                    studentId_courseId_date: {
                        studentId: String(s.id),
                        courseId: classId,
                        date: date
                    }
                },
                update: {
                    status: s.status
                },
                create: {
                    studentId: String(s.id),
                    courseId: classId,
                    date: date,
                    status: s.status
                }
            })
          )
      )

      return NextResponse.json({ ok: true })
  } catch (error) {
      console.error("Attendance update error:", error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
