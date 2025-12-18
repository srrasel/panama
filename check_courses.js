const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const allCourses = await prisma.course.findMany()
  console.log("All courses:", allCourses.length)
  
  const activeCourses = await prisma.course.findMany({
    where: { status: "Active" }
  })
  console.log("Active courses:", activeCourses.length)
  console.log("Active courses details:", JSON.stringify(activeCourses, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })