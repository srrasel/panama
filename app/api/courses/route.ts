import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { status: "Active" },
      include: {
        teacher: {
          select: { name: true }
        },
        _count: {
          select: { enrollments: true, lessons: true }
        }
      }
    })

    const formatted = courses.map(c => ({
      id: c.id,
      title: c.title,
      instructor: c.teacher.name,
      progress: 0, // Not relevant for public listing
      students: c._count.enrollments,
      description: c.description,
      status: "not_started",
      completedLessons: 0,
      totalLessons: c._count.lessons,
      nextLesson: "Start Course",
      estimatedTime: "Varies",
      image: c.image || undefined, // Use image if available
      price: c.isFree ? "Free" : `$${c.price}`
    }))

    return NextResponse.json({ courses: formatted })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
