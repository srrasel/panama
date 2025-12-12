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
  const gradesData = {
    term1: [
      { subject: "Mathematics", grade: "A-", percentage: 92, marks: 92, outOf: 100, comments: "Excellent grasp of concepts. Keep up the good work!", performance: "Excellent" },
      { subject: "English", grade: "A", percentage: 95, marks: 95, outOf: 100, comments: "Outstanding essay writing skills and comprehension.", performance: "Outstanding" },
      { subject: "Science", grade: "B+", percentage: 87, marks: 87, outOf: 100, comments: "Good understanding of core concepts. Needs improvement in lab work.", performance: "Good" },
      { subject: "History", grade: "A-", percentage: 90, marks: 90, outOf: 100, comments: "Excellent historical knowledge and analysis.", performance: "Excellent" },
      { subject: "Physical Education", grade: "A", percentage: 93, marks: 93, outOf: 100, comments: "Excellent participation and physical fitness.", performance: "Excellent" },
    ],
    term2: [
      { subject: "Mathematics", grade: "A", percentage: 94, marks: 94, outOf: 100, comments: "Improved performance. Excellent problem-solving skills.", performance: "Outstanding" },
      { subject: "English", grade: "A-", percentage: 93, marks: 93, outOf: 100, comments: "Strong writing skills. Minor improvements needed in poetry analysis.", performance: "Excellent" },
      { subject: "Science", grade: "A-", percentage: 91, marks: 91, outOf: 100, comments: "Great improvement in lab work. Excellent practical understanding.", performance: "Excellent" },
      { subject: "History", grade: "A", percentage: 92, marks: 92, outOf: 100, comments: "Consistent performance. Excellent class participation.", performance: "Excellent" },
      { subject: "Physical Education", grade: "A", percentage: 94, marks: 94, outOf: 100, comments: "Outstanding athletic performance and sportsmanship.", performance: "Outstanding" },
    ],
  }
  return Response.json({ childName, gradesData })
}
