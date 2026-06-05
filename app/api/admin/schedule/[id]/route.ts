import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { title, description, startTime, endTime, type, category, location, courseId, teacherId } = body

  const schedule = await prisma.schedule.findUnique({ where: { id } })
  if (!schedule) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  try {
    const updated = await prisma.schedule.update({
      where: { id },
      data: {
        title: title || schedule.title,
        description: description !== undefined ? description : schedule.description,
        startTime: startTime ? new Date(startTime) : schedule.startTime,
        endTime: endTime ? new Date(endTime) : schedule.endTime,
        type: type || schedule.type,
        category: category !== undefined ? category || null : schedule.category,
        location: location !== undefined ? location : schedule.location,
        courseId: courseId === undefined ? schedule.courseId : courseId || null,
        teacherId: teacherId || schedule.teacherId
      }
    })

    return NextResponse.json({ schedule: updated })
  } catch (error) {
    console.error("Error updating admin schedule event:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const schedule = await prisma.schedule.findUnique({ where: { id } })
  if (!schedule) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  try {
    await prisma.schedule.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error deleting admin schedule event:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
