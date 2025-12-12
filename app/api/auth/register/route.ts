import { NextResponse } from "next/server"
import { z } from "zod"
import { createUser, getUserByEmail } from "@/lib/db"

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["student", "teacher", "admin", "parent", "instructor"]).default("student"),
})

export async function POST(req: Request) {
  const json = await req.json()
  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }
  const role = parsed.data.role === "instructor" ? "teacher" : parsed.data.role
  const exists = getUserByEmail(parsed.data.email)
  if (exists) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }
  const user = createUser({
    name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
    email: parsed.data.email,
    role,
    password: parsed.data.password,
  })
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
}
