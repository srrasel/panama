import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { title, description, startTime, endTime, type, location, courseId } = body

  const schedule = await prisma.schedule.findUnique({ where: { id: params.id } })
  if (!schedule || schedule.teacherId !== session.userId) {
     return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 })
  }

  try {
    const updated = await prisma.schedule.update({
      where: { id: params.id },
      data: {
        title: title || schedule.title,
        description: description !== undefined ? description : schedule.description,
        startTime: startTime ? new Date(startTime) : schedule.startTime,
        endTime: endTime ? new Date(endTime) : schedule.endTime,
        type: type || schedule.type,
        location: location !== undefined ? location : schedule.location,
        courseId: courseId === undefined ? schedule.courseId : (courseId || null)
      }
    })

    return NextResponse.json({ schedule: updated })
  } catch (error) {
    console.error("Error updating schedule:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const schedule = await prisma.schedule.findUnique({ where: { id: params.id } })
  if (!schedule || schedule.teacherId !== session.userId) {
     return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 })
  }

  try {
    await prisma.schedule.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error deleting schedule:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
