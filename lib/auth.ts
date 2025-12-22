import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { SignJWT, jwtVerify } from "jose"
import { promisify } from "util"

const scryptAsync = promisify(crypto.scrypt)

export type Role = string

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-change-in-prod"
)

export async function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString("hex")
  const derivedKey = (await scryptAsync(password, s, 64)) as Buffer
  return { salt: s, hash: derivedKey.toString("hex") }
}

export async function verifyPassword(password: string, salt: string, hash: string) {
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  const b = Buffer.from(hash, "hex")
  if (derivedKey.length !== b.length) return false
  return crypto.timingSafeEqual(derivedKey, b)
}

export async function createSession(userId: string, role: Role) {
  // Use stateless JWT session to avoid DB writes (compatible with read-only Netlify)
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
  return token
}

export async function getSession(id: string | undefined) {
  if (!id) return undefined
  try {
    const { payload } = await jwtVerify(id, JWT_SECRET)
    const userId = payload.userId as string
    
    // Fetch user details (read-only)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    
    if (!user) return undefined
    
    return {
      id: id, // return the JWT token as the session ID
      userId: user.id,
      role: user.role,
      user: user
    }
  } catch (e) {
    // Fallback to DB check for legacy sessions or if JWT fails
    try {
      const session = await prisma.session.findUnique({
        where: { id },
        include: { user: true },
      })
      if (!session) return undefined
      return session
    } catch (dbError) {
      return undefined
    }
  }
}

export async function destroySession(id: string | undefined) {
  // Stateless session - nothing to destroy on server
  if (!id) return
  // Optional: Add to blacklist if needed, but not required for simple auth
}
