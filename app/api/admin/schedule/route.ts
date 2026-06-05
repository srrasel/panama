import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const schedules = await prisma.schedule.findMany({
    include: {
      teacher: { select: { name: true } },
      course: { select: { title: true } }
    },
    orderBy: { startTime: "asc" }
  })

  const events = schedules.map((schedule) => ({
    id: schedule.id,
    title: schedule.title,
    description: schedule.description,
    type: schedule.type,
    category: schedule.category,
    location: schedule.location,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    teacher: schedule.teacher?.name || null,
    course: schedule.course?.title || null
  }))

  return NextResponse.json({ schedules: events })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { title, description, startTime, endTime, type, category, location, courseId, teacherId } = body

  if (!title || !startTime || !endTime || !type) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const schedule = await prisma.schedule.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        type,
        category: category || null,
        location,
        courseId: courseId || null,
        teacherId: teacherId || session.userId
      }
    })

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error("Error creating admin schedule event:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
