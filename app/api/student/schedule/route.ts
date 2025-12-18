import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const studentId = session.userId

    // Fetch enrollments to get access to courses
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            assignments: true,
            quizzes: true,
            teacher: true
          }
        }
      }
    })

    // Fetch schedules
    const schedules = await prisma.schedule.findMany({
      where: { 
        courseId: { in: enrollments.map(e => e.courseId) }
      },
      include: {
        course: { 
          include: { 
            teacher: true 
          } 
        }
      }
    })

    const events = []

    // Add schedules
    for (const s of schedules) {
      events.push({
        id: s.id,
        type: s.type,
        title: s.title,
        course: s.course?.title,
        instructor: s.course?.teacher?.name,
        date: s.startTime,
        endDate: s.endTime,
        location: s.location,
        time: new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })
    }

    for (const enrollment of enrollments) {
      const course = enrollment.course
      
      // Add assignments
      for (const assignment of course.assignments) {
        if (assignment.dueDate && new Date(assignment.dueDate) >= new Date()) {
          events.push({
            id: assignment.id,
            type: "Assignment",
            title: assignment.title,
            course: course.title,
            instructor: course.teacher.name,
            date: assignment.dueDate,
            time: "11:59 PM" // Default due time
          })
        }
      }
    }

      // Add quizzes (assuming they might have dates, or we just list them)
      // Current schema for Quiz doesn't have a due date, maybe created/updated.
      // We'll skip quizzes for schedule unless we add a due date field.
    }

    // Sort by date
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return NextResponse.json({ events })

  } catch (error) {
    console.error("Error fetching schedule:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
