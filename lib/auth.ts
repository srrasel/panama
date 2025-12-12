import crypto from "crypto"

export type Role = "student" | "teacher" | "admin" | "parent"

function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, s, 64).toString("hex")
  return { salt: s, hash }
}

function verifyPassword(password: string, salt: string, hash: string) {
  const hashed = crypto.scryptSync(password, salt, 64)
  const a = Buffer.from(hashed.toString("hex"), "hex")
  const b = Buffer.from(hash, "hex")
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

type Session = { userId: string; role: Role; createdAt: number }

const sessions = new Map<string, Session>()

function createSession(userId: string, role: Role) {
  const id = crypto.randomBytes(32).toString("hex")
  sessions.set(id, { userId, role, createdAt: Date.now() })
  return id
}

function getSession(id: string | undefined) {
  if (!id) return undefined
  return sessions.get(id)
}

function destroySession(id: string | undefined) {
  if (!id) return
  sessions.delete(id)
}

export { hashPassword, verifyPassword, createSession, getSession, destroySession }
