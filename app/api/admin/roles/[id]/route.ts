import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, permissions, description } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Check if name is taken by another role
    let existing;
    if ((prisma as any).role) {
      existing = await (prisma as any).role.findFirst({
        where: { 
          name,
          id: { not: id }
        }
      })
    } else {
      const rows = await prisma.$queryRaw`SELECT * FROM Role WHERE name = ${name} AND id != ${id}`
      existing = Array.isArray(rows) ? rows[0] : null
    }

    if (existing) {
      return NextResponse.json({ error: "Role name already exists" }, { status: 409 })
    }

    let role;
    if ((prisma as any).role) {
      role = await (prisma as any).role.update({
        where: { id },
        data: {
          name,
          permissions: JSON.stringify(permissions || []),
          description
        }
      })
    } else {
      await prisma.$executeRaw`UPDATE Role SET name=${name}, permissions=${JSON.stringify(permissions || [])}, description=${description} WHERE id=${id}`
      const rows = await prisma.$queryRaw`SELECT * FROM Role WHERE id=${id}`
      role = (rows as any[])[0]
    }

    return NextResponse.json({
      ...role,
      permissions: typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions
    })
  } catch (error) {
    console.error("Failed to update role:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Prevent deleting system roles if needed, or check usage
    // For now, allow deleting but maybe warn?
    // Let's check if it's a critical role?
    // We won't block it for now as per "user configuration" request.
    
    if ((prisma as any).role) {
      await (prisma as any).role.delete({
        where: { id }
      })
    } else {
      await prisma.$executeRaw`DELETE FROM Role WHERE id=${id}`
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete role:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
