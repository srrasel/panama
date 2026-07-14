import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, position, experience, coverLetter } = body

    if (!fullName?.trim() || !email?.trim() || !position?.trim() || !coverLetter?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailOk) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    const application = await prisma.employmentApplication.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        position: position.trim(),
        experience: experience?.trim() || null,
        coverLetter: coverLetter.trim(),
      },
    })

    return NextResponse.json({ ok: true, id: application.id })
  } catch (error) {
    console.error("Error submitting employment application:", error)
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 })
  }
}
