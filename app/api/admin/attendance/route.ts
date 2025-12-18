import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get all attendance records
  // Ideally this should be paginated, but for now fetching all (limit 500?)
  const records = await prisma.attendance.findMany({
    take: 500,
    orderBy: { date: "desc" },
    include: {
        student: {
            include: { attendance: true } // to calc percentage
        },
        course: true
    }
  })

  const formatted = records.map(r => {
      // Calc percentage for this student
      const total = r.student.attendance.length
      const present = r.student.attendance.filter(a => a.status === "present").length
      const percentage = total > 0 ? Math.round((present / total) * 100) : 100

      return {
          id: r.id,
          studentName: r.student.name,
          course: r.course.title,
          date: r.date,
          status: r.status,
          percentage
      }
  })

  // Get unique courses for filter
  const courses = Array.from(new Set(records.map(r => r.course.title)))

  return NextResponse.json({ records: formatted, courses })
}
