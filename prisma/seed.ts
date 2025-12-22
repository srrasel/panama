import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, s, 64).toString("hex")
  return { salt: s, hash }
}

async function main() {
  const demoUsers = [
    { name: "Student Demo", email: "student@demo.com", role: "student", password: "demo123" },
    { name: "Teacher Demo", email: "teacher@demo.com", role: "teacher", password: "demo123" },
    { name: "Admin Demo", email: "admin@demo.com", role: "admin", password: "demo123" },
    { name: "Parent Demo", email: "parent@demo.com", role: "parent", password: "demo123" },
  ]

  console.log('Start seeding...')

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
      console.log(`Created user: ${u.email}`)
    } else {
      console.log(`User already exists: ${u.email}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
