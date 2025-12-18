import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: session.userId },
    include: {
      course: {
        include: {
          teacher: true,
          lessons: {
            orderBy: { order: "asc" }
          },
          enrollments: true
        }
      }
    }
  })

  const courses = enrollments.map(e => {
    const c = e.course
    const totalLessons = c.lessons.length
    // Estimate completed based on progress % (mock logic)
    const completedLessons = Math.round((e.progress / 100) * totalLessons)
    const nextLesson = c.lessons[completedLessons]?.title || "Completed"
    
    return {
      id: c.id,
      title: c.title,
      instructor: c.teacher.name,
      progress: e.progress,
      students: c.enrollments.length,
      description: c.description,
      status: e.progress >= 100 ? "completed" : e.progress > 0 ? "in_progress" : "not_started",
      completedLessons,
      totalLessons,
      nextLesson,
      estimatedTime: "45 mins", // Placeholder
      image: c.imageUrl,
    }
  })

  return NextResponse.json({ courses })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { courseId } = body

  if (!courseId) {
    return NextResponse.json({ error: "Course ID required" }, { status: 400 })
  }

  try {
    const existing = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.userId,
          courseId
        }
      }
    })

    if (existing) {
      return NextResponse.json({ message: "Already enrolled" }, { status: 200 })
    }

    await prisma.enrollment.create({
      data: {
        studentId: session.userId,
        courseId
      }
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 })
  }
}
