import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { hashPassword, Role } from "@/lib/auth"

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().default("student"),
})

export async function POST(req: Request) {
  const json = await req.json()
  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }
  
  // Map 'instructor' to 'teacher' for backward compatibility
  let roleStr = parsed.data.role === "instructor" ? "teacher" : parsed.data.role

  // Validate role exists in DB
  let roleRecord;
  if ((prisma as any).role) {
    roleRecord = await (prisma as any).role.findUnique({
      where: { name: roleStr }
    })
  } else {
    const rows = await prisma.$queryRaw`SELECT * FROM Role WHERE name = ${roleStr}`
    roleRecord = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
  }

  if (!roleRecord) {
     return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }
  
  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email }
  })
  
  if (exists) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }

  const { hash, salt } = hashPassword(parsed.data.password)

  const user = await prisma.user.create({
    data: {
      name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
      email: parsed.data.email,
      role: roleStr,
      passwordHash: hash,
      passwordSalt: salt,
    }
  })
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
}
