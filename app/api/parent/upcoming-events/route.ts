import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getSelectedChild } from "@/lib/parent-utils"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  const url = new URL(req.url)

  const child = await getSelectedChild(session, url.searchParams)
  if (!child) return Response.json({ childName: "Student", upcomingEvents: [] })

  const childName = child.name || "Student"
  const today = new Date()
  
  const limitParam = url.searchParams.get("limit")
  const limit = limitParam ? parseInt(limitParam) : 5

  // 1. Fetch pending assignments
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: child.id },
    select: { courseId: true }
  })
  const enrolledCourseIds = enrollments.map(e => e.courseId)

  const pendingAssignments = await prisma.assignment.findMany({
    where: {
      courseId: { in: enrolledCourseIds },
      dueDate: { gt: today },
      submissions: {
        none: { studentId: child.id }
      }
    },
    take: limit > 0 ? limit : undefined,
    orderBy: { dueDate: 'asc' }
  })

  // 2. Fetch schedule events (Exams, Events, Deadlines)
  // We need to fetch schedules for courses the student is enrolled in OR global schedules
  const schedules = await prisma.schedule.findMany({
    where: {
      OR: [
        { courseId: { in: enrolledCourseIds } },
        { courseId: null }
      ],
      startTime: { gt: today },
      type: { in: ["Exam", "Event", "Deadline", "Meeting"] }
    },
    take: limit > 0 ? limit : undefined,
    orderBy: { startTime: 'asc' }
  })

  // Combine and sort
  const combinedEvents = [
    ...pendingAssignments.map(a => ({
      id: `assign-${a.id}`,
      title: a.title,
      date: a.dueDate ? a.dueDate.toISOString().split("T")[0] : "TBD",
      type: "Assignment",
      description: `Due date for ${a.title}`,
      courseId: a.courseId
    })),
    ...schedules.map(s => ({
      id: `sched-${s.id}`,
      title: s.title,
      date: s.startTime.toISOString().split("T")[0],
      type: s.type,
      description: s.description || s.title,
      courseId: s.courseId
    }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const finalEvents = limit > 0 ? combinedEvents.slice(0, limit) : combinedEvents

  return Response.json({ childName, upcomingEvents: finalEvents })
}
