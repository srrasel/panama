import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const courseId = url.searchParams.get("courseId")

  const assignments = await prisma.assignment.findMany({
    where: {
      course: {
        teacherId: session.userId,
        ...(courseId ? { id: courseId } : {})
      }
    },
    include: { 
      course: true,
      submissions: {
        select: { status: true, grade: true }
      }
    }
  })

  const formatted = assignments.map(a => {
    const submissionsCount = a.submissions.length
    const gradedCount = a.submissions.filter(s => s.status === "Graded" || (s.grade !== null && s.grade !== undefined)).length
    const gradedSum = a.submissions.reduce((sum, s) => sum + (s.grade || 0), 0)
    const avgScore = gradedCount > 0 ? Math.round(gradedSum / gradedCount) : 0

    return {
      id: a.id,
      title: a.title,
      course: a.course.title,
      courseId: a.courseId,
      dueDate: a.dueDate ? a.dueDate.toISOString().split("T")[0] : "",
      total: a.totalPoints,
      status: a.status,
      submissions: submissionsCount,
      graded: gradedCount,
      avgScore: avgScore,
      description: a.description
    }
  })

  return NextResponse.json({ assignments: formatted })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const courseId = body.courseId
  if (!courseId) {
    return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course || course.teacherId !== session.userId) {
    return NextResponse.json({ error: "Invalid course" }, { status: 400 })
  }

  const assignment = await prisma.assignment.create({
    data: {
      title: String(body.title || "Untitled Assignment"),
      courseId,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      totalPoints: Number(body.total || 100),
      status: "Pending",
      description: String(body.description || ""),
    },
    include: { course: true }
  })

  return NextResponse.json({ 
    assignment: {
      id: assignment.id,
      title: assignment.title,
      course: assignment.course.title,
      courseId: assignment.courseId,
      dueDate: assignment.dueDate ? assignment.dueDate.toISOString().split("T")[0] : "",
      total: assignment.totalPoints,
      status: assignment.status,
      submissions: 0,
      description: assignment.description
    } 
  })
}

export async function PUT(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const id = body.id

  if (!id) {
    return NextResponse.json({ error: "Assignment ID required" }, { status: 400 })
  }

  const existingAssignment = await prisma.assignment.findUnique({
      where: { id },
      include: { course: true }
  })

  if (!existingAssignment || existingAssignment.course.teacherId !== session.userId) {
      return NextResponse.json({ error: "Assignment not found or unauthorized" }, { status: 404 })
  }

  const assignment = await prisma.assignment.update({
    where: { id },
    data: {
      title: body.title,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      totalPoints: body.total ? Number(body.total) : undefined,
      status: body.status,
      description: body.description,
    },
    include: { course: true }
  })

  return NextResponse.json({ 
    assignment: {
      id: assignment.id,
      title: assignment.title,
      course: assignment.course.title,
      courseId: assignment.courseId,
      dueDate: assignment.dueDate ? assignment.dueDate.toISOString().split("T")[0] : "",
      total: assignment.totalPoints,
      status: assignment.status,
      submissions: 0,
      description: assignment.description
    } 
  })
}

export async function DELETE(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  if (!id) {
      return NextResponse.json({ error: "Assignment ID required" }, { status: 400 })
  }

  const existingAssignment = await prisma.assignment.findUnique({
      where: { id },
      include: { course: true }
  })

  if (!existingAssignment || existingAssignment.course.teacherId !== session.userId) {
      return NextResponse.json({ error: "Assignment not found or unauthorized" }, { status: 404 })
  }

  await prisma.assignment.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
