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
  const recentActivities = [
    { id: 1, activity: "Submitted Assignment: Essay on Climate Change", date: "2025-12-01", status: "Completed" },
    { id: 2, activity: "Quiz: Chapter 5 - Photosynthesis", date: "2025-11-30", status: "Passed" },
    { id: 3, activity: "Joined Study Group: Advanced Math", date: "2025-11-28", status: "Active" },
  ]
  return Response.json({ childName, recentActivities })
}
