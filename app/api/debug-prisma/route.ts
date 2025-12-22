
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL
    const isDefined = !!dbUrl
    const maskedUrl = dbUrl ? dbUrl.replace(/:[^:@]+@/, ":****@") : "undefined"

    console.log("Debug Prisma: Checking DB connection...")
    
    // Simple query to check connection
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      status: "ok",
      database_url_defined: isDefined,
      database_url_masked: maskedUrl,
      user_count: userCount,
      env_node_env: process.env.NODE_ENV
    })
  } catch (e: any) {
    console.error("Debug Prisma Error:", e)
    return NextResponse.json({
      status: "error",
      message: e.message,
      stack: e.stack
    }, { status: 500 })
  }
}
