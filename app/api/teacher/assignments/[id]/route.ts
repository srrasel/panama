import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assignment = await prisma.assignment.findUnique({
    where: { id: params.id },
    include: {
      course: true,
      submissions: {
        include: {
            student: true
        }
      }
    }
  })

  if (!assignment) {
    return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
  }

  if (assignment.course.teacherId !== session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  return NextResponse.json({ assignment })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getSession((await cookies()).get("session")?.value)
    if (!session || session.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const { title, description, dueDate, totalPoints } = body

    const assignment = await prisma.assignment.findUnique({
        where: { id: params.id },
        include: { course: true }
    })

    if (!assignment) {
        return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    if (assignment.course.teacherId !== session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const updated = await prisma.assignment.update({
        where: { id: params.id },
        data: {
            title: title || assignment.title,
            description: description || assignment.description,
            dueDate: dueDate ? new Date(dueDate) : assignment.dueDate,
            totalPoints: totalPoints ? Number(totalPoints) : assignment.totalPoints
        }
    })

    return NextResponse.json({ assignment: updated })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getSession((await cookies()).get("session")?.value)
    if (!session || session.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const assignment = await prisma.assignment.findUnique({
        where: { id: params.id },
        include: { course: true }
    })

    if (!assignment) {
        return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    if (assignment.course.teacherId !== session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await prisma.assignment.delete({
        where: { id: params.id }
    })

    return NextResponse.json({ ok: true })
}
