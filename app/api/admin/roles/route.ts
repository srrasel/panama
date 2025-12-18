import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get("session")?.value
    
    // Wrap getSession in a try-catch or handle potential DB errors
    let session;
    try {
      session = await getSession(sid)
    } catch (dbError: any) {
      console.error("Session verification failed (DB error):", dbError)
      return NextResponse.json({ 
        error: "Database Connection Failed", 
        details: dbError.message 
      }, { status: 500 })
    }

    if (!session || session.role !== "admin") {
      console.log("Unauthorized access attempt to GET /api/admin/roles", { sid, role: session?.role })
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let roles: any[] = []
    // Check if prisma.role exists (runtime check for stale client)
    if ((prisma as any).role) {
      roles = await (prisma as any).role.findMany({
        orderBy: { createdAt: "asc" }
      })
    } else {
      // Fallback using raw query if the model is missing in the loaded client
      try {
        roles = await prisma.$queryRaw`SELECT * FROM Role ORDER BY createdAt ASC`
      } catch (rawError: any) {
        console.error("Raw query failed:", rawError)
        throw new Error(`Failed to fetch roles via raw query: ${rawError.message}`)
      }
    }
    
    // Parse permissions JSON
    const parsedRoles = roles.map(role => {
      try {
        return {
          ...role,
          permissions: typeof role.permissions === 'string' 
            ? JSON.parse(role.permissions || "[]") 
            : role.permissions 
        }
      } catch (e) {
        console.error(`Failed to parse permissions for role ${role.name}:`, role.permissions)
        return {
          ...role,
          permissions: [] 
        }
      }
    })

    return NextResponse.json(parsedRoles)
  } catch (error: any) {
    console.error("Failed to fetch roles:", error)
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, permissions, description } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    let existing;
    if ((prisma as any).role) {
      existing = await (prisma as any).role.findUnique({
        where: { name }
      })
    } else {
      const rows = await prisma.$queryRaw`SELECT * FROM Role WHERE name = ${name}`
      existing = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    }

    if (existing) {
      return NextResponse.json({ error: "Role already exists" }, { status: 409 })
    }

    let role;
    if ((prisma as any).role) {
      role = await (prisma as any).role.create({
        data: {
          name,
          permissions: JSON.stringify(permissions || []),
          description
        }
      })
    } else {
      const id = randomUUID()
      // Use current date for timestamps. SQLite needs proper format or let Prisma helper handle it if possible.
      // But passing Date object to $executeRaw usually works with Prisma
      const now = new Date()
      await prisma.$executeRaw`INSERT INTO Role (id, name, permissions, description, createdAt, updatedAt) VALUES (${id}, ${name}, ${JSON.stringify(permissions || [])}, ${description}, ${now}, ${now})`
      const rows = await prisma.$queryRaw`SELECT * FROM Role WHERE id=${id}`
      role = (rows as any[])[0]
    }

    return NextResponse.json({
      ...role,
      permissions: typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions
    })
  } catch (error) {
    console.error("Failed to create role:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
