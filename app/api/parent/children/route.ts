import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getChildrenForParent, getUserByEmail } from "@/lib/db"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  
  if (!session || session.role !== "parent") {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const children = await getChildrenForParent(session.userId)
  return Response.json({ children })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "parent") {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const email = body.email?.trim()

    if (!email) {
      return Response.json({ error: "Student email is required" }, { status: 400 })
    }

    const student = await getUserByEmail(email)
    if (!student) {
      return Response.json({ error: "No student found with this email address" }, { status: 404 })
    }

    if (student.role !== "student") {
      return Response.json({ error: "The user with this email is not a student" }, { status: 400 })
    }

    // Check if already linked
    const existing = await prisma.parentChild.findUnique({
      where: {
        parentId_childId: {
          parentId: session.userId,
          childId: student.id
        }
      }
    })

    if (existing) {
      return Response.json({ error: "Student already linked" }, { status: 409 })
    }

    await prisma.parentChild.create({
      data: {
        parentId: session.userId,
        childId: student.id
      }
    })

    const children = await getChildrenForParent(session.userId)
    return Response.json({ success: true, children })

  } catch (error) {
    console.error("Link student error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
