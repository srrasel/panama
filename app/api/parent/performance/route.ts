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
  const performance = [
    { subject: "Mathematics", currentGrade: "A-", percentage: 92, trend: "up" },
    { subject: "English", currentGrade: "A", percentage: 95, trend: "up" },
    { subject: "Science", currentGrade: "B+", percentage: 87, trend: "stable" },
    { subject: "History", currentGrade: "A-", percentage: 90, trend: "up" },
  ]
  return Response.json({ childName, performance })
}
