import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Stats
  const courses = await prisma.course.findMany({
    where: { teacherId: session.userId },
    include: { enrollments: true }
  })

  const totalCourses = courses.length
  
  // Calculate total unique students
  const studentIds = new Set<string>()
  courses.forEach(c => c.enrollments.forEach(e => studentIds.add(e.studentId)))
  const totalStudents = studentIds.size

  // Calculate earnings (mock price * enrollments, assuming paid)
  // Since we don't have transaction history, we estimate from current enrollments.
  let totalEarnings = 0
  courses.forEach(c => {
    if (!c.isFree) {
       totalEarnings += c.price * c.enrollments.length
    }
  })

  // Earnings chart data (mock for now as we don't have transaction dates easily accessible or aggregated)
  // We could aggregate enrollments by month if `enrolledAt` is available.
  const enrollmentsByMonth = new Map<string, number>()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  courses.forEach(c => {
    c.enrollments.forEach(e => {
       const date = new Date(e.enrolledAt)
       const monthIdx = date.getMonth()
       const month = months[monthIdx]
       const earnings = c.isFree ? 0 : c.price
       enrollmentsByMonth.set(month, (enrollmentsByMonth.get(month) || 0) + earnings)
    })
  })

  // Fill all months
  const earnings = months.map(m => ({
    month: m,
    earnings: enrollmentsByMonth.get(m) || 0
  }))

  const stats = {
    totalStudents,
    totalCourses,
    totalEarnings
  }

  return NextResponse.json({ earnings, stats })
}
