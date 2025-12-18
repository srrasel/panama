const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Fetching active courses with relations...")
    const allCourses = await prisma.course.findMany({
      where: {
        status: "Active"
      },
      include: {
        teacher: {
          select: { name: true }
        },
        _count: {
          select: { 
            enrollments: true,
            lessons: true 
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    console.log(`Found ${allCourses.length} courses.`)

    const mapped = allCourses.map(course => {
      try {
        return {
          id: course.id,
          title: course.title,
          instructor: course.teacher ? course.teacher.name : "Unknown Instructor",
          description: course.description,
          price: course.price,
          isFree: course.isFree,
          imageUrl: course.imageUrl,
          lessonsCount: course._count ? course._count.lessons : 0,
          studentsCount: course._count ? course._count.enrollments : 0,
        }
      } catch (err) {
        console.error("Error mapping course:", course.id, err)
        return null
      }
    })

    console.log("Mapped courses:", JSON.stringify(mapped, null, 2))
  } catch (error) {
    console.error("Query failed:", error)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })