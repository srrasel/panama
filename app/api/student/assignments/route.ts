import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: session.userId },
      include: {
        course: {
          include: {
            assignments: {
                include: {
                    submissions: {
                        where: { studentId: session.userId }
                    }
                }
            }
          }
        }
      }
    })

    const assignments = enrollments.flatMap(e => 
      e.course.assignments.map(a => {
        const submission = a.submissions[0]
        let status = "Pending"
        if (submission) {
            status = submission.status
        } else if (a.dueDate && new Date(a.dueDate) < new Date()) {
            status = "Overdue"
        }

        return {
          id: a.id,
          title: a.title,
          course: e.course.title,
          dueDate: a.dueDate ? a.dueDate.toISOString().split("T")[0] : "",
          status: status,
          description: a.description,
          points: a.totalPoints,
          grade: submission?.grade
        }
      })
    )

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
