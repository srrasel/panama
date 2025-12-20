import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { destroySession } from "@/lib/auth"

export async function POST() {
  const sid = (await cookies()).get("session")?.value
  await destroySession(sid)
  const res = NextResponse.json({ ok: true })
  res.cookies.set("session", "", { path: "/", httpOnly: true, maxAge: 0 })
  res.cookies.set("user_role", "", { path: "/", httpOnly: true, maxAge: 0 })
  return res
}
