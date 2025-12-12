import { NextResponse } from "next/server"
import { z } from "zod"
import { getUserByEmail } from "@/lib/db"
import { verifyPassword, createSession } from "@/lib/auth"

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }
  const user = getUserByEmail(parsed.data.email)
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
  const ok = verifyPassword(parsed.data.password, user.passwordSalt, user.passwordHash)
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
  const sid = createSession(user.id, user.role)
  const res = NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  res.cookies.set("session", sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
