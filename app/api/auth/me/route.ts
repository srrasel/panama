import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { getUserById } from "@/lib/db"

export async function GET() {
  const sid = cookies().get("session")?.value
  const session = getSession(sid)
  if (!session) return NextResponse.json({ user: null })
  const user = getUserById(session.userId)
  if (!user) return NextResponse.json({ user: null })
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
}
