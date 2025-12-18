import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: {
        course: true,
        submissions: {
          where: { studentId: session.userId }
        }
      }
    })

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    // Check if enrolled
    const enrollment = await prisma.enrollment.findUnique({
        where: {
            studentId_courseId: {
                studentId: session.userId,
                courseId: assignment.courseId
            }
        }
    })

    if (!enrollment) {
        return NextResponse.json({ error: "Not enrolled in this course" }, { status: 403 })
    }

    const submission = assignment.submissions[0]
    let status = "Pending"
    if (submission) {
        status = submission.status
    } else if (assignment.dueDate && new Date(assignment.dueDate) < new Date()) {
        status = "Overdue"
    }

    return NextResponse.json({ 
        assignment: {
            id: assignment.id,
            title: assignment.title,
            course: assignment.course.title,
            dueDate: assignment.dueDate ? assignment.dueDate.toISOString().split("T")[0] : "",
            status,
            description: assignment.description,
            points: assignment.totalPoints,
            submission: submission ? {
                id: submission.id,
                content: submission.content,
                grade: submission.grade,
                feedback: submission.feedback,
                submittedAt: submission.submittedAt
            } : null
        }
    })
  } catch (error) {
    console.error("Error fetching assignment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
