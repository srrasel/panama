
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const keys = Object.keys(prisma)
  const hasRole = 'role' in prisma
  
  let rawRoles = []
  try {
    rawRoles = await prisma.$queryRaw`SELECT * FROM Role`
  } catch (e: any) {
    rawRoles = [{ error: e.message }]
  }

  return NextResponse.json({
    keys,
    hasRole,
    rawRoles
  })
}
