import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { courseId } = await req.json()

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    const studentId = session.userId

    // Check if course exists and is active
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!course || course.status !== "Active") {
      return NextResponse.json({ error: "Course not found or not active" }, { status: 404 })
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId
      }
    })

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 400 })
    }

    // Create enrollment
    await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        enrolledAt: new Date(),
        progress: 0
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
