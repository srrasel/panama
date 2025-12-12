import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getUserById, getChildForParent } from "@/lib/db"

export async function GET() {
  const sid = cookies().get("session")?.value
  const session = getSession(sid)
  let child = undefined
  if (session?.role === "parent") {
    child = getChildForParent(session.userId)
  } else if (session?.role === "student") {
    child = getUserById(session.userId)
  }
  const childName = child?.name || "Student"
  const childInfo = { name: childName, grade: "10th Grade", school: "Central High School", avatar: childName.slice(0, 1).toUpperCase() }
  const childPerformance = [
    { subject: "Mathematics", currentGrade: "A-", percentage: 92, trend: "up" },
    { subject: "English", currentGrade: "A", percentage: 95, trend: "up" },
    { subject: "Science", currentGrade: "B+", percentage: 87, trend: "stable" },
    { subject: "History", currentGrade: "A-", percentage: 90, trend: "up" },
  ]
  const attendance = { presentDays: 42, absentDays: 2, leaveDays: 1, presentagePercentage: 95 }
  const upcomingEvents = [
    { id: 1, title: "Mid-Term Exams Begin", date: "2025-12-15", type: "Exam", description: "Mathematics and English exams scheduled" },
    { id: 2, title: "School Assembly", date: "2025-12-10", type: "Event", description: "Annual school assembly - Attendance mandatory" },
    { id: 3, title: "Project Submission Deadline", date: "2025-12-12", type: "Deadline", description: "Science project final submission" },
    { id: 4, title: "Parent-Teacher Conference", date: "2025-12-18", type: "Meeting", description: "One-on-one meetings with teachers" },
  ]
  const recentActivities = [
    { id: 1, activity: "Submitted Assignment: Essay on Climate Change", date: "2025-12-01", status: "Completed" },
    { id: 2, activity: "Quiz: Chapter 5 - Photosynthesis", date: "2025-11-30", status: "Passed" },
    { id: 3, activity: "Joined Study Group: Advanced Math", date: "2025-11-28", status: "Active" },
  ]
  return Response.json({ childInfo, childPerformance, attendance, upcomingEvents, recentActivities })
}
