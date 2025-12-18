
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Attempting to connect to database...')
    const userCount = await prisma.user.count()
    console.log(`✅ Connection successful!`)
    console.log(`Found ${userCount} users in the database.`)
    
    // Check for dev.db existence in file system via node just to be double sure
    const fs = require('fs')
    const path = require('path')
    // Relative to where script runs, but let's assume standard location
    const dbPath = path.join(__dirname, 'prisma', 'dev.db')
    if (fs.existsSync(dbPath)) {
        console.log(`Database file found at: ${dbPath}`)
    } else {
        console.log(`Note: prisma/dev.db file not found at expected path: ${dbPath} (Prisma might be looking elsewhere based on cwd)`)
    }

  } catch (e) {
    console.error('❌ Connection failed:')
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
