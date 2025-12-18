const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
