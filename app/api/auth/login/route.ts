import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { verifyPassword, createSession, Role } from "@/lib/auth"

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }
    
    console.log("Login attempt for:", parsed.data.email)
    
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email }
    })
    
    if (!user) {
      console.log("User not found:", parsed.data.email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    
    const ok = await verifyPassword(parsed.data.password, user.passwordSalt, user.passwordHash)
    if (!ok) {
      console.log("Invalid password for:", parsed.data.email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    
    const token = await createSession(user.id, user.role as Role)
    console.log("Session created for:", parsed.data.email)
    
    const res = NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    res.cookies.set("user_role", user.role, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal Server Error: " + error.message }, { status: 500 })
  }
}
