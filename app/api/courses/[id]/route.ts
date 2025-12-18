import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        lessons: {
          orderBy: { order: "asc" }
        },
        enrollments: true,
      }
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Map to expected format
    const mappedCourse = {
      id: course.id,
      title: course.title,
      instructor: course.teacher.name,
      rating: 4.8, // Placeholder
      students: course.enrollments.length,
      price: course.isFree ? "Free" : `$${course.price}`,
      description: course.description,
      duration: "6 weeks", // Placeholder or calculated from lessons
      level: "Beginner", // Placeholder
      modules: [
        {
          title: "All Lessons",
          lessons: course.lessons.length,
          duration: "Varies",
          items: course.lessons.map(l => ({
             title: l.title,
             duration: l.duration || "10 min"
          }))
        }
      ],
      about: course.requirements ? JSON.parse(course.requirements) : [],
    }

    return NextResponse.json({ course: mappedCourse })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
