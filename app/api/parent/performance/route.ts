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
  if (!child) return Response.json({ childName: "Student", performance: [] })

  const childName = child.name || "Student"

  // Academic Performance (Average from Assignment Submissions)
  const submissions = await prisma.assignmentSubmission.findMany({
    where: { studentId: child.id, grade: { not: null } },
    include: { assignment: { include: { course: true } } }
  })

  // Group by course to calculate average
  const coursePerformance = new Map()
  submissions.forEach(sub => {
    const courseTitle = sub.assignment.course.title
    if (!coursePerformance.has(courseTitle)) {
      coursePerformance.set(courseTitle, { total: 0, count: 0 })
    }
    const current = coursePerformance.get(courseTitle)
    current.total += sub.grade || 0
    current.count += 1
  })

  const performance = Array.from(coursePerformance.entries()).map(([subject, stats]: [string, any]) => {
    const avg = Math.round(stats.total / stats.count)
    let grade = "F"
    if (avg >= 90) grade = "A"
    else if (avg >= 80) grade = "B"
    else if (avg >= 70) grade = "C"
    else if (avg >= 60) grade = "D"

    return {
      subject,
      currentGrade: grade,
      percentage: avg,
      trend: "stable" // Placeholder for trend
    }
  })

  return Response.json({ childName, performance })
}
