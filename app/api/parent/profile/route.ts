import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "parent") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      bio: true,
      imageUrl: true,
      role: true,
      notifications: true,
      createdAt: true
    }
  })

  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "parent") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await req.json()
    
    // Validate fields if necessary
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.phone !== undefined) updateData.phone = data.phone
    if (data.bio !== undefined) updateData.bio = data.bio
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl
    if (data.notifications !== undefined) updateData.notifications = JSON.stringify(data.notifications)

    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: updateData
    })
    
    return NextResponse.json(updated)
  } catch (e) {
    console.error("Profile update error:", e)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
