import crypto from "crypto"
import { prisma } from "@/lib/prisma"

export type Role = string

export function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, s, 64).toString("hex")
  return { salt: s, hash }
}

export function verifyPassword(password: string, salt: string, hash: string) {
  const hashed = crypto.scryptSync(password, salt, 64)
  const a = Buffer.from(hashed.toString("hex"), "hex")
  const b = Buffer.from(hash, "hex")
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function createSession(userId: string, role: Role) {
  const session = await prisma.session.create({
    data: {
      userId,
      role,
    },
  })
  return session.id
}

export async function getSession(id: string | undefined) {
  if (!id) return undefined
  const session = await prisma.session.findUnique({
    where: { id },
    include: { user: true },
  })
  if (!session) return undefined
  return session
}

export async function destroySession(id: string | undefined) {
  if (!id) return
  try {
    await prisma.session.delete({ where: { id } })
  } catch (e) {
    // Ignore if session not found
  }
}
