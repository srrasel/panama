import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { saveFile } from "@/lib/upload"

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || !["admin", "teacher"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const accessLevel = formData.get("accessLevel") as string // "all", "student", "parent"

    if (!file || !title) {
      return NextResponse.json({ error: "Missing file or title" }, { status: 400 })
    }

    // Save file
    const url = await saveFile(file, "uploads/library")

    // Determine file type
    let fileType = "Other"
    const mime = file.type.toLowerCase()
    if (mime.includes("pdf")) fileType = "PDF"
    else if (mime.includes("image")) fileType = "Image"
    else if (mime.includes("video")) fileType = "Video"
    else if (mime.includes("word") || mime.includes("document")) fileType = "Document"
    else if (mime.includes("sheet") || mime.includes("excel")) fileType = "Spreadsheet"

    // Save to DB
    let resource;
    if ((prisma as any).libraryResource) {
        resource = await (prisma as any).libraryResource.create({
            data: {
                title,
                description: description || "",
                fileUrl: url,
                fileType,
                accessLevel: accessLevel || "all",
                uploaderId: session.userId
            }
        })
    } else {
        // Fallback for stale client
        // We can't easily insert via raw query with relations and defaults without more work, 
        // but let's try to be safe.
        // Actually, if db push worked, we might just need to rely on the user restarting if this fails.
        // But let's try to gracefully handle it or throw.
        return NextResponse.json({ error: "Server needs restart to apply schema changes" }, { status: 503 })
    }

    return NextResponse.json(resource)
  } catch (error: any) {
    console.error("Library upload error:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  // Allow public access? Maybe not. Let's require login.
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const role = session.role
    
    let where: any = {}
    
    if (role === "admin" || role === "teacher") {
        // Can see all
    } else if (role === "student") {
        where = {
            accessLevel: { in: ["all", "student"] }
        }
    } else if (role === "parent") {
        where = {
            accessLevel: { in: ["all", "parent"] }
        }
    } else {
        return NextResponse.json({ error: "Unauthorized role" }, { status: 403 })
    }

    let resources = []
    if ((prisma as any).libraryResource) {
        resources = await (prisma as any).libraryResource.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                uploadedBy: {
                    select: { name: true, role: true }
                }
            }
        })
    } else {
         // Fallback using raw query if needed, but it's complex with relations
         return NextResponse.json({ error: "Server needs restart" }, { status: 503 })
    }

    return NextResponse.json(resources)
  } catch (error: any) {
    console.error("Library fetch error:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}
