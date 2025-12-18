import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "teacher") {
    // Return mock or error? Original was public, but we want secure.
    // Let's return error to enforce security.
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const questions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ questions })
}

export async function POST(req: Request) {
  const session = await getSession((await cookies()).get("session")?.value)
  if (!session || session.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const question = await prisma.question.create({
      data: {
        text: String(body.text || "Untitled Question"),
        type: String(body.type || "MCQ"),
        difficulty: String(body.difficulty || "Easy"),
        marks: Number(body.marks || 1),
        options: body.options ? JSON.stringify(body.options) : undefined,
        // Optional: link to a course if provided in body
        // courseId: body.courseId 
      },
    })
    return NextResponse.json({ question })
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
