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
  if (!child) return Response.json({ gradesData: { term1: [], term2: [] } })

  const childName = child.name || "Student"

  // Fetch all graded assignments
  const submissions = await prisma.assignmentSubmission.findMany({
    where: { studentId: child.id, grade: { not: null } },
    include: { assignment: { include: { course: true } } },
    orderBy: { submittedAt: 'desc' }
  })

  // Fetch all quiz results
  const quizResults = await prisma.quizResult.findMany({
    where: { studentId: child.id },
    include: { quiz: { include: { course: true } } },
    orderBy: { completedAt: 'desc' }
  })

  const gradesList = [
    ...submissions.map(s => {
      const percentage = s.grade ? Math.round((s.grade / s.assignment.totalPoints) * 100) : 0
      return {
        subject: s.assignment.course.title,
        title: s.assignment.title,
        grade: getGradeLetter(percentage),
        percentage,
        marks: s.grade,
        outOf: s.assignment.totalPoints,
        comments: s.feedback || "No feedback",
        performance: getPerformanceLabel(percentage),
        date: s.submittedAt
      }
    }),
    ...quizResults.map(q => {
      const percentage = Math.round((q.score / q.total) * 100)
      return {
        subject: q.quiz.course.title,
        title: q.quiz.title,
        grade: getGradeLetter(percentage),
        percentage,
        marks: q.score,
        outOf: q.total,
        comments: "Quiz Completed",
        performance: getPerformanceLabel(percentage),
        date: q.completedAt
      }
    })
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  // For now, put everything in term1 as we don't have terms logic
  const gradesData = {
    term1: gradesList,
    term2: [] 
  }

  return Response.json({ childName, gradesData })
}

function getGradeLetter(percentage: number) {
  if (percentage >= 90) return "A"
  if (percentage >= 85) return "A-"
  if (percentage >= 80) return "B+"
  if (percentage >= 75) return "B"
  if (percentage >= 70) return "B-"
  if (percentage >= 65) return "C+"
  if (percentage >= 60) return "C"
  if (percentage >= 50) return "D"
  return "F"
}

function getPerformanceLabel(percentage: number) {
  if (percentage >= 90) return "Outstanding"
  if (percentage >= 80) return "Excellent"
  if (percentage >= 70) return "Good"
  if (percentage >= 60) return "Average"
  return "Needs Improvement"
}
