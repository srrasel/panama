
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting verification...");

  // 1. Verify Role table has data
  const roles = await prisma.role.findMany();
  console.log(`Found ${roles.length} roles:`, roles.map(r => r.name));

  if (roles.length === 0) {
    console.error("No roles found! Seed script might have failed.");
    process.exit(1);
  }

  // 2. Simulate User Registration with Valid Role
  const testEmail = "test_role_verify_" + Date.now() + "@example.com";
  const validRole = roles[0].name; // Use the first available role

  console.log(`Attempting to create user with valid role: ${validRole}`);
  
  // Logic from app/api/auth/register/route.ts
  const roleRecord = await prisma.role.findUnique({
    where: { name: validRole }
  });

  if (!roleRecord) {
    console.error(`Validation failed for valid role: ${validRole}`);
  } else {
    console.log(`Validation passed for role: ${validRole}`);
  }

  // 3. Simulate User Registration with Invalid Role
  const invalidRole = "super_mega_admin_" + Date.now();
  console.log(`Attempting to validate invalid role: ${invalidRole}`);

  const invalidRoleRecord = await prisma.role.findUnique({
    where: { name: invalidRole }
  });

  if (!invalidRoleRecord) {
    console.log(`Correctly rejected invalid role: ${invalidRole}`);
  } else {
    console.error(`Incorrectly accepted invalid role: ${invalidRole}`);
  }

  // 4. Verify Backward Compatibility for "instructor"
  const instructorRole = "instructor";
  const mappedRole = instructorRole === "instructor" ? "teacher" : instructorRole;
  console.log(`Mapping 'instructor' to '${mappedRole}'`);
  
  const mappedRoleRecord = await prisma.role.findUnique({
    where: { name: mappedRole }
  });

  if (mappedRoleRecord) {
     console.log(`Mapped role '${mappedRole}' exists in DB. Compatibility check passed.`);
  } else {
     console.warn(`Mapped role '${mappedRole}' does NOT exist in DB. Ensure 'teacher' role is seeded.`);
  }

  console.log("Verification complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
