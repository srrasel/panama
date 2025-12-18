import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, Role } from "@/lib/auth"

export async function GET() {
  const demoUsers = [
    { name: "Student Demo", email: "student@demo.com", role: "student", password: "demo123" },
    { name: "Teacher Demo", email: "teacher@demo.com", role: "teacher", password: "demo123" },
    { name: "Admin Demo", email: "admin@demo.com", role: "admin", password: "demo123" },
    { name: "Parent Demo", email: "parent@demo.com", role: "parent", password: "demo123" },
  ]

  for (const u of demoUsers) {
    const exists = await prisma.user.findUnique({ where: { email: u.email } })
    if (!exists) {
      const { hash, salt } = hashPassword(u.password)
      await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          role: u.role,
          passwordHash: hash,
          passwordSalt: salt,
        }
      })
    }
  }

  return NextResponse.json({ ok: true, message: "Seeded" })
}
