import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getUserById, getChildForParent } from "@/lib/db"

export async function GET() {
  const sid = cookies().get("session")?.value
  const session = getSession(sid)
  let child = undefined
  if (session?.role === "parent") child = getChildForParent(session.userId)
  else if (session?.role === "student") child = getUserById(session.userId)
  const childName = child?.name || "Student"
  const upcomingEvents = [
    { id: 1, title: "Mid-Term Exams Begin", date: "2025-12-15", type: "Exam", description: "Mathematics and English exams scheduled" },
    { id: 2, title: "School Assembly", date: "2025-12-10", type: "Event", description: "Annual school assembly - Attendance mandatory" },
    { id: 3, title: "Project Submission Deadline", date: "2025-12-12", type: "Deadline", description: "Science project final submission" },
    { id: 4, title: "Parent-Teacher Conference", date: "2025-12-18", type: "Meeting", description: "One-on-one meetings with teachers" },
  ]
  return Response.json({ childName, upcomingEvents })
}
