import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getUserById, getChildForParent } from "@/lib/db"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = getSession(sid)
  let child = undefined
  if (session?.role === "parent") child = getChildForParent(session.userId)
  else if (session?.role === "student") child = getUserById(session.userId)
  const childName = child?.name || "Student"
  const attendanceStats = { present: 40, absent: 2, leave: 1, total: 43, rate: 95 }
  const attendanceRecords = [
    { date: "2025-12-01", status: "Present", day: "Monday" },
    { date: "2025-11-28", status: "Present", day: "Friday" },
    { date: "2025-11-27", status: "Absent", day: "Thursday" },
    { date: "2025-11-26", status: "Present", day: "Wednesday" },
    { date: "2025-11-25", status: "Leave", day: "Tuesday" },
    { date: "2025-11-24", status: "Present", day: "Monday" },
  ]
  return Response.json({ childName, attendanceStats, attendanceRecords })
}
