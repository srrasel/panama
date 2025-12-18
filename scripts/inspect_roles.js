
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const roles = await prisma.role.findMany();
    console.log("Raw Roles from DB:");
    roles.forEach(r => {
      console.log(`Role: ${r.name}`);
      console.log(`Permissions (Type: ${typeof r.permissions}):`, r.permissions);
      try {
        JSON.parse(r.permissions);
        console.log("JSON Parse: OK");
      } catch (e) {
        console.log("JSON Parse: FAIL -", e.message);
      }
      console.log("---");
    });
  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
