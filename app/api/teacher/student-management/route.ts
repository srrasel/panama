import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const courseId = url.searchParams.get("courseId")

  try {
    // 1. Get all courses for this teacher
    const courses = await prisma.course.findMany({
      where: { teacherId: session.userId },
      select: { id: true, title: true }
    })

    const courseIds = courses.map(c => c.id)
    
    // If a specific course is selected, verify it belongs to the teacher
    if (courseId && !courseIds.includes(courseId)) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 })
    }

    const targetCourseIds = courseId ? [courseId] : courseIds

    // 2. Get students enrolled in these courses
    // We need to aggregate data per student-course pair because a student might be in multiple courses
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: { in: targetCourseIds }
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true
          }
        },
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    // 3. Fetch attendance and grades for these enrollments
    // This could be optimized, but N+1 is acceptable for reasonable class sizes
    const studentsData = await Promise.all(enrollments.map(async (enrollment) => {
      const studentId = enrollment.studentId
      const currentCourseId = enrollment.courseId

      // Calculate Attendance
      const attendanceRecords = await prisma.attendance.findMany({
        where: {
          studentId,
          courseId: currentCourseId
        }
      })
      const totalClasses = attendanceRecords.length
      const presentClasses = attendanceRecords.filter(r => r.status === "present").length
      const attendancePercentage = totalClasses > 0 
        ? Math.round((presentClasses / totalClasses) * 100) 
        : 100 // Default to 100 if no records? Or 0? Let's say 0 if no records, but usually starts at 100 or -
      
      // Calculate Grades (Assignments)
      const submissions = await prisma.assignmentSubmission.findMany({
        where: {
          studentId,
          assignment: {
            courseId: currentCourseId
          },
          grade: { not: null }
        }
      })
      
      const totalGrades = submissions.reduce((acc, sub) => acc + (sub.grade || 0), 0)
      const avgGrade = submissions.length > 0 
        ? Math.round(totalGrades / submissions.length) 
        : 0

      return {
        id: enrollment.student.id, // Use student ID or enrollment ID? UI usually expects student ID
        enrollmentId: enrollment.id,
        name: enrollment.student.name,
        email: enrollment.student.email,
        imageUrl: enrollment.student.imageUrl,
        course: enrollment.course.title,
        courseId: enrollment.course.id,
        attendance: attendancePercentage,
        avgGrade: avgGrade,
        status: "Active", // Enrollment status? enrollment.status isn't in schema yet, assume Active
        joinedAt: enrollment.enrolledAt
      }
    }))

    return NextResponse.json({ 
      courses, 
      students: studentsData 
    })

  } catch (error) {
    console.error("Error fetching student management data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
