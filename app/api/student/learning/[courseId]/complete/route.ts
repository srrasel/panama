import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { lessonId } = body

  if (!lessonId) {
    return NextResponse.json({ error: "Lesson ID required" }, { status: 400 })
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

    // Toggle completion
    const existing = await prisma.lessonCompletion.findUnique({
      where: {
        studentId_lessonId: {
          studentId: session.userId,
          lessonId
        }
      }
    })

    if (existing) {
      // If exists, remove it (toggle off) - optional, or just keep it?
      // Usually "Mark as Complete" implies setting it to true.
      // But if user wants to unmark, we should support it.
      // Let's assume the UI sends an action or we toggle.
      // For now, I'll make it idempotent (always create) or toggle if UI supports it.
      // Let's implement toggle for flexibility.
      // But wait, the UI usually has a checkbox or button.
      // Let's check the UI code. It says "Mark Complete & Next Lesson" or "Mark as Complete".
      // It doesn't seem to have "Unmark".
      // But for robust API, let's just create if not exists.
      
      // Actually, let's just return success if already completed.
      return NextResponse.json({ completed: true })
    } else {
      await prisma.lessonCompletion.create({
        data: {
          studentId: session.userId,
          lessonId
        }
      })
      
      // Update enrollment progress
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: { lessons: true }
      })
      
      if (course) {
        const totalLessons = course.lessons.length
        const completedCount = await prisma.lessonCompletion.count({
          where: {
            studentId: session.userId,
            lesson: { courseId }
          }
        })
        
        const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0
        
        await prisma.enrollment.update({
          where: { studentId_courseId: { studentId: session.userId, courseId } },
          data: { progress }
        })
      }
      
      return NextResponse.json({ completed: true })
    }

  } catch (error) {
    console.error("Error marking lesson complete:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
