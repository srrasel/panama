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

    // Fetch enrollments
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            lessons: true,
            assignments: {
              include: {
                submissions: {
                  where: { studentId }
                }
              }
            },
            quizzes: true,
          }
        }
      }
    })

    // Calculate stats
    const totalEnrolled = enrollments.length
    const completedCourses = enrollments.filter(e => e.progress === 100).length
    const activeCourses = totalEnrolled - completedCourses
    
    // For "All Courses", we might want to show total courses available in the system
    const allCoursesCount = await prisma.course.count({
        where: { status: "Active" }
    })

    const stats = [
      { label: "All Courses", value: allCoursesCount, color: "bg-indigo-600", iconBg: "bg-indigo-600" },
      { label: "Enrolled Courses", value: totalEnrolled, color: "bg-emerald-600", iconBg: "bg-emerald-600" },
      { label: "Active Courses", value: activeCourses, color: "bg-amber-600", iconBg: "bg-amber-600" },
      { label: "Completed Courses", value: completedCourses, color: "bg-neutral-900", iconBg: "bg-neutral-900" },
    ]

    // Fetch upcoming assignments
    // Get all assignments from enrolled courses that haven't been submitted
    const allAssignments = enrollments.flatMap(e => 
      e.course.assignments.map(a => ({
        ...a,
        courseTitle: e.course.title,
        isSubmitted: a.submissions.length > 0 && a.submissions[0].status === "Submitted"
      }))
    )

    // Filter for upcoming (due date > now) and not submitted
    const now = new Date()
    const upcomingAssignments = allAssignments
      .filter(a => a.dueDate && new Date(a.dueDate) > now && !a.isSubmitted)
      .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        title: a.title,
        course: a.courseTitle,
        dueDate: a.dueDate!.toISOString().split('T')[0],
        priority: new Date(a.dueDate!).getTime() - now.getTime() < 3 * 24 * 60 * 60 * 1000 ? "High" : "Medium"
      }))

    // Fetch recent grades (Quiz Results + Assignment Submissions)
    const quizResults = await prisma.quizResult.findMany({
      where: { studentId },
      include: { quiz: true },
      orderBy: { completedAt: 'desc' },
      take: 3
    })

    const assignmentSubmissions = await prisma.assignmentSubmission.findMany({
      where: { studentId, grade: { not: null } },
      include: { assignment: true },
      orderBy: { gradedAt: 'desc' }, // Use gradedAt if available, else submittedAt
      take: 3
    })

    // Combine and sort
    const recentGrades = [
      ...quizResults.map(q => {
        const percentage = q.total > 0 ? (q.score / q.total) * 100 : 0
        return {
          subject: q.quiz.title,
          grade: percentage >= 90 ? "A" : percentage >= 80 ? "B" : percentage >= 70 ? "C" : percentage >= 60 ? "D" : "F",
          percentage: Math.round(percentage),
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
          date: a.gradedAt || a.submittedAt
        }
      })
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3)

    return NextResponse.json({
      stats,
      upcomingAssignments,
      recentGrades
    })

  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
