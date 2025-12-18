import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || !session.user) return NextResponse.json({ user: null })
  
  const user = session.user
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
}
