import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    
    // Wrap getSession in a try-catch
    let session;
    try {
      session = await getSession(sid)
    } catch (dbError: any) {
      console.error("Session verification failed:", dbError)
      return NextResponse.json({ error: "Database Connection Failed" }, { status: 500 })
    }

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let integrations = []
    if ((prisma as any).integration) {
      integrations = await (prisma as any).integration.findMany({
        orderBy: { name: "asc" }
      })
    } else {
      try {
        integrations = await prisma.$queryRaw`SELECT * FROM Integration ORDER BY name ASC` as any[]
      } catch (e: any) {
        console.error("Raw query failed:", e)
        throw new Error("Failed to fetch integrations")
      }
    }

    return NextResponse.json(integrations)
  } catch (error: any) {
    console.error("Failed to fetch integrations:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    const session = await getSession(sid)

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const { id, name, key, provider, config, status, isActive } = json

    if (!name || !key) {
      return NextResponse.json({ error: "Name and Key are required" }, { status: 400 })
    }

    let integration;
    if ((prisma as any).integration) {
      if (id) {
        integration = await (prisma as any).integration.update({
          where: { id },
          data: { name, key, provider, config: JSON.stringify(config), status, isActive }
        })
      } else {
        integration = await (prisma as any).integration.create({
          data: { name, key, provider, config: JSON.stringify(config), status, isActive }
        })
      }
    } else {
      const now = new Date().toISOString()
      const configStr = JSON.stringify(config || {})
      
      if (id) {
        // Update
        // SQLite raw update
        await prisma.$executeRaw`UPDATE Integration SET name=${name}, "key"=${key}, provider=${provider}, config=${configStr}, status=${status}, isActive=${isActive}, updatedAt=${now} WHERE id=${id}`
        const rows = await prisma.$queryRaw`SELECT * FROM Integration WHERE id=${id}`
        integration = Array.isArray(rows) ? rows[0] : null
      } else {
        // Create
        const newId = randomUUID()
        await prisma.$executeRaw`INSERT INTO Integration (id, name, "key", provider, config, status, isActive, createdAt, updatedAt) VALUES (${newId}, ${name}, ${key}, ${provider}, ${configStr}, ${status}, ${isActive}, ${now}, ${now})`
        const rows = await prisma.$queryRaw`SELECT * FROM Integration WHERE id=${newId}`
        integration = Array.isArray(rows) ? rows[0] : null
      }
    }

    return NextResponse.json(integration)
  } catch (error: any) {
    console.error("Failed to save integration:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
    return POST(req)
}
