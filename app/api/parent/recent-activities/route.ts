import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getSelectedChild } from "@/lib/parent-utils"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  const url = new URL(req.url)

  const child = await getSelectedChild(session, url.searchParams)
  if (!child) return Response.json({ recentActivities: [] })

  const childName = child.name

  // Fetch recent assignments
  const submissions = await prisma.assignmentSubmission.findMany({
    where: { studentId: child.id },
    take: 5,
    orderBy: { submittedAt: 'desc' },
    include: { assignment: true }
  })

  // Fetch recent quiz results
  const quizResults = await prisma.quizResult.findMany({
    where: { studentId: child.id },
    take: 5,
    orderBy: { completedAt: 'desc' },
    include: { quiz: true }
  })

  // Combine and sort
  const activities = [
    ...submissions.map(s => ({
      id: `sub-${s.id}`,
      activity: `Submitted Assignment: ${s.assignment.title}`,
      date: s.submittedAt.toISOString().split('T')[0],
      status: "Completed"
    })),
    ...quizResults.map(q => ({
      id: `quiz-${q.id}`,
      activity: `Quiz: ${q.quiz.title}`,
      date: q.completedAt.toISOString().split('T')[0],
      status: q.score >= 50 ? "Passed" : "Failed"
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  return Response.json({ childName, recentActivities: activities })
}
