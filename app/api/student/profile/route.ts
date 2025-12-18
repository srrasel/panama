import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        studentId: true,
        major: true,
        notifications: true,
        imageUrl: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Split name into first and last name for the frontend
    const nameParts = user.name.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    // Parse notifications if they exist
    let notifications = {
      assignments: true,
      grades: true,
      announcements: true,
      messages: true,
    }

    if (user.notifications) {
      try {
        notifications = JSON.parse(user.notifications)
      } catch (e) {
        // use defaults
      }
    }

    return NextResponse.json({
      profile: {
        firstName,
        lastName,
        email: user.email,
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        studentID: user.studentId || user.id, // Fallback to internal ID if studentId not set
        major: user.major || "",
        notifications,
        imageUrl: user.imageUrl,
      }
    })

  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { firstName, lastName, phone, dateOfBirth, major, notifications, imageUrl } = body

    const fullName = `${firstName} ${lastName}`.trim()
    
    const updateData: any = {
      name: fullName,
      phone,
      dateOfBirth,
      major,
      notifications: JSON.stringify(notifications)
    }

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: updateData
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
