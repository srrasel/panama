import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

  const Role = {
  student: 'student',
  teacher: 'teacher',
  admin: 'admin',
  parent: 'parent',
}

function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString("hex")
  const hash = crypto.scryptSync(password, s, 64).toString("hex")
  return { salt: s, hash }
}

async function main() {
  // Seed Roles
  const roles = [
    { 
      name: "student", 
      permissions: JSON.stringify(["View Courses", "Submit Assignments", "View Grades"]),
      description: "Standard student role"
    },
    { 
      name: "teacher", 
      permissions: JSON.stringify(["Create Courses", "Grade Assignments", "Manage Attendance"]),
      description: "Teacher with course management access"
    },
    { 
      name: "parent", 
      permissions: JSON.stringify(["View Child Performance", "Access Reports"]),
      description: "Parent with read-only access to children's data"
    },
    { 
      name: "admin", 
      permissions: JSON.stringify(["Full Access"]),
      description: "System administrator"
    }
  ]

  for (const role of roles) {
    const upserted = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    })
    console.log(`Role ensured: ${upserted.name}`)
  }

  const demoUsers = [
    { name: "Student Demo", email: "student@demo.com", role: Role.student, password: "demo123" },
    { name: "Teacher Demo", email: "teacher@demo.com", role: Role.teacher, password: "demo123" },
    { name: "Admin Demo", email: "admin@demo.com", role: Role.admin, password: "demo123" },
    { name: "Parent Demo", email: "parent@demo.com", role: Role.parent, password: "demo123" },
  ]

  for (const u of demoUsers) {
    let user = await prisma.user.findUnique({ where: { email: u.email } })
    if (!user) {
      console.log(`Creating user ${u.email}...`)
      const { hash, salt } = hashPassword(u.password)
      user = await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          role: u.role,
          passwordHash: hash,
          passwordSalt: salt,
        }
      })
    } else {
        console.log(`User ${u.email} already exists.`)
    }

    // Seed courses for Teacher
    if (u.role === Role.teacher && user) {
        const existingCourses = await prisma.course.findMany({ where: { teacherId: user.id } })
        if (existingCourses.length === 0) {
            console.log("Seeding courses for teacher...")
            const course = await prisma.course.create({
                data: {
                    title: "Web Development Fundamentals",
                    description: "Complete guide to HTML, CSS, JavaScript, and responsive design.",
                    status: "Active",
                    price: 0,
                    isFree: true,
                    teacherId: user.id,
                    imageUrl: "/web-development-course.jpg",
                    lessons: {
                        create: [
                            { title: "HTML Basics", status: "Published", duration: "45 min", order: 1 },
                            { title: "CSS Styling", status: "Published", duration: "50 min", order: 2 },
                            { title: "JavaScript Intro", status: "Draft", duration: "60 min", order: 3 },
                        ]
                    },
                    quizzes: {
                        create: [
                            { title: "HTML Quiz", status: "Published", questions: JSON.stringify([{ question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language"], answerIndex: 0 }]) }
                        ]
                    },
                    assignments: {
                        create: [
                            { title: "Build a Portfolio", description: "Create a personal portfolio site", status: "Pending", totalPoints: 100, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
                        ]
                    }
                }
            })
            console.log(`Created course: ${course.title}`)
        }
    }
  }

  // Seed Integrations
  const integrations = [
    { name: "Email Service", key: "email_service", provider: "SMTP", status: "Connected", isActive: true },
    { name: "Payment Gateway", key: "payment_gateway", provider: "Stripe", status: "Connected", isActive: true },
    { name: "Video Streaming", key: "video_streaming", provider: "Mux", status: "Pending", isActive: false },
    { name: "File Storage", key: "file_storage", provider: "AWS S3", status: "Connected", isActive: true },
  ]

  console.log("Seeding Integrations...")
  for (const intg of integrations) {
    if ((prisma as any).integration) {
        await (prisma as any).integration.upsert({
            where: { key: intg.key },
            update: {},
            create: intg
        })
        console.log(`Integration ensured: ${intg.name}`)
    } else {
        // Fallback for when client isn't generated
        try {
            const existing = await prisma.$queryRaw`SELECT * FROM Integration WHERE key=${intg.key}`
            if (Array.isArray(existing) && existing.length === 0) {
                 const id = crypto.randomUUID()
                 const now = new Date().toISOString()
                 await prisma.$executeRaw`INSERT INTO Integration (id, name, "key", provider, status, isActive, createdAt, updatedAt) VALUES (${id}, ${intg.name}, ${intg.key}, ${intg.provider}, ${intg.status}, ${intg.isActive}, ${now}, ${now})`
                 console.log(`Integration created (raw): ${intg.name}`)
            } else {
                 console.log(`Integration exists (raw): ${intg.name}`)
            }
        } catch (e: any) {
            console.error(`Failed to seed integration ${intg.name}:`, e.message)
        }
    }
  }
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
