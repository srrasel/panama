
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Fetching a course ID...')
    const course = await prisma.course.findFirst()
    
    if (!course) {
        console.log('No courses found in DB.')
        return
    }
    
    console.log(`Found course ID: ${course.id}`)
    
    console.log('Executing detailed query...')
    const detailedCourse = await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        teacher: true,
        lessons: {
          orderBy: { order: "asc" }
        },
        enrollments: true,
        reviews: true,
      }
    })
    
    console.log('Query successful!')
    console.log('Teacher:', detailedCourse.teacher ? detailedCourse.teacher.name : 'None')
    console.log('Lessons:', detailedCourse.lessons.length)
    console.log('Enrollments:', detailedCourse.enrollments.length)
    console.log('Reviews:', detailedCourse.reviews.length)

  } catch (e) {
    console.error('❌ Query failed:')
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
