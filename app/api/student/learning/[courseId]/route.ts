import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.userId,
          courseId
        }
      }
    })

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 })
    }

    // Fetch course with lessons and completions
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        teacher: true,
        lessons: {
          orderBy: { order: "asc" },
          include: {
            completions: {
              where: { studentId: session.userId }
            }
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Format for frontend
    // Group lessons into a single module for now since we don't have modules in schema
    const completedLessonIds = course.lessons
      .filter(l => l.completions.length > 0)
      .map(l => l.id)

    const modules = [
      {
        id: "default",
        title: "Course Content",
        lessons: course.lessons.map(l => ({
          id: l.id,
          title: l.title,
          duration: l.duration || "10 min",
          content: l.content || "",
          videoUrl: l.videoUrl || "/placeholder.svg",
        }))
      }
    ]

    const responseData = {
      title: course.title,
      instructor: course.teacher.name,
      description: course.description,
      modules,
      completedLessonIds
    }

    return NextResponse.json({ course: responseData })

  } catch (error) {
    console.error("Error fetching course content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
