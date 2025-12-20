
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
    console.log(`Requirements raw:`, course.requirements)
    
    if (course.requirements) {
        try {
            const parsed = JSON.parse(course.requirements)
            console.log('JSON Parse successful:', parsed)
        } catch (e) {
            console.error('❌ JSON Parse failed:', e.message)
        }
    } else {
        console.log('No requirements field set.')
    }

  } catch (e) {
    console.error('❌ Query failed:')
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
