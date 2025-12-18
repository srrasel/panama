
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const roles = await prisma.role.findMany();
    console.log("Current Roles in DB:", JSON.stringify(roles, null, 2));
  } catch (e) {
    console.error("Error fetching roles:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
