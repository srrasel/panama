import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assignmentId = params.id
  
  const contentType = req.headers.get("content-type") || ""
  let content = ""
  
  if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData()
      const text = fd.get("submissionText")
      const files = fd.getAll("files")
      // Simple simulation of file handling: store file names
      const fileNames = files.map((f: any) => f.name).join(", ")
      content = `Text: ${text || ""}\nFiles: ${fileNames}`
  } else {
      const body = await req.json().catch(() => ({}))
      content = body.content || body.submissionText
  }

  if (!content) {
      return NextResponse.json({ error: "Content required" }, { status: 400 })
  }

  try {
      const assignment = await prisma.assignment.findUnique({
          where: { id: assignmentId }
      })

      if (!assignment) {
          return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
      }

      const enrollment = await prisma.enrollment.findUnique({
          where: {
              studentId_courseId: {
                  studentId: session.userId,
                  courseId: assignment.courseId
              }
          }
      })

      if (!enrollment) {
          return NextResponse.json({ error: "Not enrolled" }, { status: 403 })
      }

      const submission = await prisma.assignmentSubmission.upsert({
          where: {
              studentId_assignmentId: {
                  studentId: session.userId,
                  assignmentId: assignmentId
              }
          },
          update: {
              content,
              status: "Submitted",
              submittedAt: new Date()
          },
          create: {
              studentId: session.userId,
              assignmentId: assignmentId,
              content,
              status: "Submitted"
          }
      })

      return NextResponse.json({ ok: true, submission })

  } catch (error) {
      console.error("Submission error:", error)
      return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
