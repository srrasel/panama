import { existsSync, readFileSync } from "fs"
import { resolve } from "path"
import { PrismaClient } from "@prisma/client"

/**
 * Next.js normally loads .env, but Docker/production often won't unless
 * env_file / platform env vars are set. Fall back to reading .env files.
 */
function loadDatabaseUrlFromEnvFiles() {
  if (process.env.DATABASE_URL) return

  const candidates = [".env.local", ".env", ".env.production"]
  for (const file of candidates) {
    const fullPath = resolve(process.cwd(), file)
    if (!existsSync(fullPath)) continue

    const content = readFileSync(fullPath, "utf8")
    const match = content.match(/^DATABASE_URL\s*=\s*(.+)$/m)
    if (!match) continue

    let value = match[1].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    process.env.DATABASE_URL = value
    break
  }
}

loadDatabaseUrlFromEnvFiles()

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
