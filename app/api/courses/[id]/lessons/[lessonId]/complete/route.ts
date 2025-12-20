import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    const session = await getSession(sid)

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id: courseId, lessonId } = await params

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.userId,
          courseId: courseId,
        },
      },
    })

    if (!enrollment) {
      return new NextResponse("Not enrolled", { status: 403 })
    }

    // Check if lesson belongs to course
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    })

    if (!lesson || lesson.courseId !== courseId) {
      return new NextResponse("Lesson not found in this course", { status: 404 })
    }

    // Toggle completion (if exists, remove it; if not, create it) - OR just mark complete?
    // User said "complete courses lesson". Usually means mark as done. 
    // But often users want to unmark. I'll implement toggle logic if needed, or just upsert.
    // Let's implement TOGGLE for better UX.

    const existingCompletion = await prisma.lessonCompletion.findUnique({
      where: {
        studentId_lessonId: {
          studentId: session.userId,
          lessonId: lessonId,
        },
      },
    })

    if (existingCompletion) {
      await prisma.lessonCompletion.delete({
        where: {
          id: existingCompletion.id,
        },
      })
      return NextResponse.json({ completed: false })
    } else {
      await prisma.lessonCompletion.create({
        data: {
          studentId: session.userId,
          lessonId: lessonId,
        },
      })
      return NextResponse.json({ completed: true })
    }
  } catch (error) {
    console.error("[LESSON_COMPLETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
