import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || !["admin", "teacher"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if resource exists and user has permission
    // Admin can delete all, Teacher can delete their own (or all? let's say all for simplicity for now, or own)
    
    let resource;
    if ((prisma as any).libraryResource) {
        resource = await (prisma as any).libraryResource.findUnique({
            where: { id }
        })
    }

    if (!resource) {
        return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    // Optional: Restrict teachers to delete only their own files
    if (session.role === "teacher" && resource.uploaderId !== session.userId) {
        return NextResponse.json({ error: "You can only delete your own files" }, { status: 403 })
    }

    if ((prisma as any).libraryResource) {
        await (prisma as any).libraryResource.delete({
            where: { id }
        })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Library delete error:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}
