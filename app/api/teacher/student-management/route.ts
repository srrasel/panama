import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createUser, getUserByEmail, updateUser } from "@/lib/db"
import { saveFile } from "@/lib/upload"
import { z } from "zod"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentType = req.headers.get("content-type") || ""
  let firstName, lastName, email, password, confirmPassword, courseId, bio, image

  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    firstName = String(fd.get("firstName") || "").trim()
    lastName = String(fd.get("lastName") || "").trim()
    email = String(fd.get("email") || "").trim().toLowerCase()
    password = String(fd.get("password") || "")
    confirmPassword = String(fd.get("confirmPassword") || "")
    courseId = String(fd.get("courseId") || "")
    bio = String(fd.get("bio") || "")
    image = fd.get("profileImage") as File | null
  } else {
    const body = await req.json().catch(() => ({}))
    firstName = body.firstName
    lastName = body.lastName
    email = body.email
    password = body.password
    confirmPassword = body.confirmPassword // Expecting this field or just validate password
    courseId = body.courseId
    bio = body.bio
  }

  if (!firstName || !lastName || !email || !password || password.length < 6) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }
  
  if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
  }

  if (await getUserByEmail(email)) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }

  // Create user
  const user = await createUser({ 
    name: `${firstName} ${lastName}`.trim(), 
    email, 
    role: "student", 
    password 
  })

  // Handle optional fields
  const updateData: any = {}
  if (bio) updateData.bio = bio
  
  if (image && typeof image === "object" && image.size > 0) {
      updateData.imageUrl = await saveFile(image, "uploads/profiles")
  }
  
  if (Object.keys(updateData).length > 0) {
      await updateUser(user.id, updateData)
  }

  // Enroll in course if selected
  if (courseId) {
    // Verify course belongs to teacher
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (course && course.teacherId === session.userId) {
      await prisma.enrollment.create({
        data: {
          studentId: user.id,
          courseId: courseId
        }
      }).catch(() => null)
    } else if (course) {
        // Course exists but doesn't belong to teacher
        return NextResponse.json({ error: "Invalid course selection" }, { status: 403 })
    }
  }

  return NextResponse.json({ 
    id: user.id, 
    name: user.name, 
    email: user.email, 
    role: user.role 
  })
}

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
