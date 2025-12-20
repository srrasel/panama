import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    const session = await getSession(sid)

    if (!session || !session.user) {
      return NextResponse.json({ completedLessonIds: [] })
    }

    const completions = await prisma.lessonCompletion.findMany({
      where: {
        studentId: session.userId,
        lesson: {
          courseId: id
        }
      },
      select: {
        lessonId: true
      }
    })

    return NextResponse.json({ 
      completedLessonIds: completions.map(c => c.lessonId) 
    })
  } catch (error) {
    console.error("[COURSE_PROGRESS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
