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
  
  if (!child) {
     return Response.json({ 
       childInfo: null, 
       childPerformance: [], 
       attendance: {}, 
       upcomingEvents: [], 
       recentActivities: [] 
     })
  }
  
  const childName = child.name || "Student"
  const childInfo = { 
    name: childName, 
    grade: child.grade || "10th Grade", // Assuming grade field might exist or default
    school: "Central High School", 
    avatar: childName.slice(0, 1).toUpperCase() 
  }

  // Attendance Stats
  const attendanceRecords = await prisma.attendance.findMany({
    where: { studentId: child.id }
  })
  const totalAtt = attendanceRecords.length
  const present = attendanceRecords.filter(r => r.status === "present").length
  const absent = attendanceRecords.filter(r => r.status === "absent").length
  const leave = attendanceRecords.filter(r => r.status === "late").length
  const attendanceStats = { 
    presentDays: present, 
    absentDays: absent, 
    leaveDays: leave, 
    presentagePercentage: totalAtt > 0 ? Math.round((present / totalAtt) * 100) : 0 
  }

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

  const childPerformance = Array.from(coursePerformance.entries()).map(([subject, stats]: [string, any]) => {
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

  // Pending Tasks
  const today = new Date()
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
    take: 5,
    orderBy: { dueDate: 'asc' }
  })

  // Upcoming Events (Pending Assignments + Exams if any)
  const upcomingEvents = pendingAssignments.map(a => ({
    id: a.id,
    title: a.title,
    date: a.dueDate ? a.dueDate.toISOString().split("T")[0] : "TBD",
    type: "Assignment",
    description: `Due date for ${a.title}`
  }))

  // Recent Activities
  const recentSubmissions = await prisma.assignmentSubmission.findMany({
    where: { studentId: child.id },
    take: 3,
    orderBy: { submittedAt: 'desc' },
    include: { assignment: true }
  })

  const recentActivities = recentSubmissions.map(s => ({
    id: s.id,
    activity: `Submitted: ${s.assignment.title}`,
    date: s.submittedAt.toISOString().split("T")[0],
    status: s.grade ? "Graded" : "Submitted"
  }))

  return Response.json({ 
    childInfo, 
    childPerformance, 
    attendance: attendanceStats, 
    upcomingEvents, 
    recentActivities 
  })
}
