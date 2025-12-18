import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const studentId = session.userId

    // Fetch Quiz Results
    const quizResults = await prisma.quizResult.findMany({
      where: { studentId },
      include: { quiz: true }
    })

    // Fetch Assignment Submissions
    const assignmentSubmissions = await prisma.assignmentSubmission.findMany({
      where: { studentId, grade: { not: null } },
      include: { assignment: true }
    })

    // Combine into a unified structure
    const grades = [
      ...quizResults.map(q => {
        const percentage = q.total > 0 ? (q.score / q.total) * 100 : 0
        return {
          subject: q.quiz.title,
          grade: percentage >= 90 ? "A" : percentage >= 80 ? "B" : percentage >= 70 ? "C" : percentage >= 60 ? "D" : "F",
          percentage: Math.round(percentage),
          marks: q.score,
          outOf: q.total,
          performance: percentage >= 90 ? "Outstanding" : percentage >= 80 ? "Excellent" : percentage >= 70 ? "Good" : "Needs Improvement",
          comments: "Automated grading",
          trend: "+0", // Placeholder
          date: q.completedAt
        }
      }),
      ...assignmentSubmissions.map(a => {
        const gradeVal = a.grade || 0
        const total = a.assignment.totalPoints || 100
        const percentage = total > 0 ? (gradeVal / total) * 100 : 0
        
        return {
          subject: a.assignment.title,
          grade: percentage >= 90 ? "A" : percentage >= 80 ? "B" : percentage >= 70 ? "C" : percentage >= 60 ? "D" : "F",
          percentage: Math.round(percentage),
          marks: gradeVal,
          outOf: total,
          performance: percentage >= 90 ? "Outstanding" : percentage >= 80 ? "Excellent" : percentage >= 70 ? "Good" : "Needs Improvement",
          comments: a.feedback || "Graded assignment",
          trend: "+0",
          date: a.submittedAt
        }
      })
    ]

    return NextResponse.json({
      gradesData: {
        term1: grades
      }
    })

  } catch (error) {
    console.error("Error fetching grades:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
