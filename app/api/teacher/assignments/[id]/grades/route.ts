import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assignmentId = params.id

  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: { course: true }
  })

  if (!assignment || assignment.course.teacherId !== session.userId) {
    return NextResponse.json({ error: "Assignment not found or unauthorized" }, { status: 404 })
  }

  // Get all students enrolled in the course
  const enrollments = await prisma.enrollment.findMany({
    where: { courseId: assignment.courseId },
    include: { student: true }
  })

  // Get all submissions for this assignment
  const submissions = await prisma.assignmentSubmission.findMany({
    where: { assignmentId: assignmentId }
  })

  // Map students to their submissions
  const students = enrollments.map(e => {
    const sub = submissions.find(s => s.studentId === e.studentId)
    return {
      studentId: e.studentId,
      name: e.student.name,
      email: e.student.email,
      submission: sub ? {
        id: sub.id,
        content: sub.content,
        status: sub.status,
        submittedAt: sub.submittedAt,
        grade: sub.grade,
        feedback: sub.feedback
      } : null
    }
  })

  return NextResponse.json({ students, assignmentTitle: assignment.title, totalPoints: assignment.totalPoints })
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assignmentId = params.id
  const body = await req.json().catch(() => ({}))
  const { studentId, grade, feedback } = body

  if (!studentId) {
    return NextResponse.json({ error: "Student ID required" }, { status: 400 })
  }

  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: { course: true }
  })

  if (!assignment || assignment.course.teacherId !== session.userId) {
    return NextResponse.json({ error: "Assignment not found or unauthorized" }, { status: 404 })
  }

  // Upsert submission (create if not exists, e.g. teacher grading a student who hasn't submitted yet)
  const submission = await prisma.assignmentSubmission.upsert({
    where: {
      studentId_assignmentId: {
        studentId,
        assignmentId
      }
    },
    update: {
      grade: Number(grade),
      feedback: String(feedback || ""),
      status: "Graded",
      gradedAt: new Date()
    },
    create: {
      studentId,
      assignmentId,
      grade: Number(grade),
      feedback: String(feedback || ""),
      status: "Graded",
      gradedAt: new Date(),
      submittedAt: new Date(), // Assume submitted now if teacher is grading
      content: "" // Empty content if teacher creates it
    }
  })

  // Update assignment status to "Graded" if all graded? 
  // For now just keep assignment status as is or maybe update it separately.
  // But we can check if there are any ungraded submissions.
  
  return NextResponse.json({ success: true, submission })
}
