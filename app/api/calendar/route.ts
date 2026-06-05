import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const PUBLIC_TYPES = ["Event", "Exam", "Deadline"]

export async function GET() {
  const schedules = await prisma.schedule.findMany({
    where: { type: { in: PUBLIC_TYPES } },
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

  return NextResponse.json({ events })
}
