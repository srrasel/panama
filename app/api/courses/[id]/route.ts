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

    let reviewCount = 0
    try {
      // @ts-ignore
      if (prisma.review) {
        // @ts-ignore
        reviewCount = await prisma.review.count({
          where: { courseId: id }
        })
      }
    } catch (e) {
      console.warn("Failed to fetch review count (stale client?)", e)
    }

    const averageRating = 4.5 // Calculate real rating if needed, or fetch aggregation

    const mappedCourse = {
      id: course.id,
      title: course.title,
      instructor: course.teacher.name,
      rating: parseFloat(averageRating as any),
      reviewCount: reviewCount,
      students: course.enrollments.length,
      price: course.isFree ? "Free" : `$${course.price}`,
      description: course.description,
      image: course.imageUrl,
      duration: "6 weeks", // Placeholder or calculated
      level: "Beginner", // Placeholder
      modules: [
        {
          title: "Course Content",
          lessons: course.lessons.length,
          duration: "Varies",
          items: course.lessons.map(l => ({
             id: l.id,
             title: l.title,
             duration: l.duration || "10 min",
             videoUrl: l.videoUrl
          }))
        }
      ],
      about: course.requirements ? JSON.parse(course.requirements) : [],
    }

    return NextResponse.json({ course: mappedCourse })
  } catch (error: any) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}
