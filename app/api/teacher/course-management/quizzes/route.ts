import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const courseId = url.searchParams.get("courseId")

  const where: any = {
    course: {
      ...(courseId ? { id: courseId } : {})
    }
  }

  if (session.role !== "admin") {
    where.course.teacherId = session.userId
  }

  const quizzes = await prisma.quiz.findMany({
    where,
    include: { course: true }
  })

  const formatted = quizzes.map(q => {
    const items = q.questions ? JSON.parse(q.questions) : []
    return {
      id: q.id,
      title: q.title,
      course: q.course.title,
      courseId: q.courseId,
      questions: items.length,
      status: q.status,
      items
    }
  })

  return NextResponse.json({ quizzes: formatted })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  
  const courseId = body.courseId
  if (!courseId) {
    return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course || (course.teacherId !== session.userId && session.role !== "admin")) {
    return NextResponse.json({ error: "Invalid course" }, { status: 400 })
  }

  const items = Array.isArray(body.items) ? body.items : []
  
  const quiz = await prisma.quiz.create({
    data: {
      title: String(body.title || "Untitled Quiz"),
      courseId,
      status: String(body.status || "Draft"),
      questions: JSON.stringify(items)
    },
    include: { course: true }
  })

  return NextResponse.json({ 
    quiz: {
      id: quiz.id,
      title: quiz.title,
      course: quiz.course.title,
      courseId: quiz.courseId,
      questions: items.length,
      status: quiz.status,
      items
    } 
  })
}

export async function PUT(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const id = body.id

  if (!id) {
    return NextResponse.json({ error: "Quiz ID required" }, { status: 400 })
  }

  const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
      include: { course: true }
  })

  if (!existingQuiz || (existingQuiz.course.teacherId !== session.userId && session.role !== "admin")) {
      return NextResponse.json({ error: "Quiz not found or unauthorized" }, { status: 404 })
  }

  const items = body.items ? JSON.stringify(body.items) : undefined
  
  const quiz = await prisma.quiz.update({
    where: { id },
    data: {
      title: body.title,
      status: body.status,
      questions: items,
      // prevent changing courseId generally
    },
    include: { course: true }
  })

  return NextResponse.json({ 
    quiz: {
      id: quiz.id,
      title: quiz.title,
      course: quiz.course.title,
      courseId: quiz.courseId,
      questions: quiz.questions ? JSON.parse(quiz.questions).length : 0,
      status: quiz.status,
      items: quiz.questions ? JSON.parse(quiz.questions) : []
    } 
  })
}

export async function DELETE(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  if (!id) {
      return NextResponse.json({ error: "Quiz ID required" }, { status: 400 })
  }

  const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
      include: { course: true }
  })

  if (!existingQuiz || (existingQuiz.course.teacherId !== session.userId && session.role !== "admin")) {
      return NextResponse.json({ error: "Quiz not found or unauthorized" }, { status: 404 })
  }

  await prisma.quiz.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
