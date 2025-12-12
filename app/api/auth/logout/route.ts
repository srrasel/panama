import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { destroySession } from "@/lib/auth"

export async function POST() {
  const sid = cookies().get("session")?.value
  destroySession(sid)
  const res = NextResponse.json({ ok: true })
  res.cookies.set("session", "", { path: "/", httpOnly: true, maxAge: 0 })
  return res
}
