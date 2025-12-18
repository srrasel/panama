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
     return Response.json({ error: "Student not found" }, { status: 404 })
  }

  const childName = child.name || "Student"

  // Fetch real attendance records
  const records = await prisma.attendance.findMany({
    where: { studentId: child.id },
    orderBy: { date: "desc" },
    include: { course: true }
  })

  // Calculate stats
  const total = records.length
  const present = records.filter(r => r.status === "present").length
  const absent = records.filter(r => r.status === "absent").length
  const leave = records.filter(r => r.status === "late").length 

  const attendanceStats = {
    totalClasses: total,
    present,
    absent,
    leave,
    attendancePercentage: total > 0 ? Math.round((present / total) * 100) : 0
  }

  const attendanceRecords = records.map(r => ({
    id: r.id,
    date: r.date.toISOString().split("T")[0],
    status: r.status === "late" ? "Leave" : r.status.charAt(0).toUpperCase() + r.status.slice(1), // Map late -> Leave for UI consistency if needed
    subject: r.course.title,
    remarks: r.remarks || "-"
  }))

  return Response.json({ childName, attendanceRecords, attendanceStats })
}
