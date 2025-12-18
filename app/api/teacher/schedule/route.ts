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

  // Fetch all schedules for this teacher
  const schedules = await prisma.schedule.findMany({
    where: { teacherId: session.userId },
    include: { course: { select: { title: true } } },
    orderBy: { startTime: "asc" }
  })

  return NextResponse.json({ schedules })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { title, description, startTime, endTime, type, location, courseId } = body

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
        location,
        courseId: courseId || null,
        teacherId: session.userId
      }
    })

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error("Error creating schedule:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
