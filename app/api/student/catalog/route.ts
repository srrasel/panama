import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  // Allow authenticated users to view catalog, even if not students (e.g. for testing)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const studentId = session.userId
    let enrolledCourseIds: string[] = []

    // Only fetch enrollments if the user is a student
    if (session.role === "student") {
      const enrollments = await prisma.enrollment.findMany({
        where: { studentId },
        select: { courseId: true }
      })
      enrolledCourseIds = enrollments.map(e => e.courseId)
    }

    // Find all active courses
    const allCourses = await prisma.course.findMany({
      where: {
        status: "Active"
      },
      include: {
        teacher: {
          select: { name: true }
        },
        _count: {
          select: { 
            enrollments: true,
            lessons: true 
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    console.log(`[Catalog API] Found ${allCourses.length} active courses`)

    const courses = allCourses.map(course => ({
      id: course.id,
      title: course.title,
      instructor: course.teacher?.name || "Unknown Instructor",
      description: course.description,
      price: course.price,
      isFree: course.isFree,
      imageUrl: course.imageUrl,
      lessonsCount: course._count?.lessons || 0,
      studentsCount: course._count?.enrollments || 0,
      isEnrolled: enrolledCourseIds.includes(course.id)
    }))

    return NextResponse.json({ courses })

  } catch (error) {
    console.error("Error fetching catalog:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
