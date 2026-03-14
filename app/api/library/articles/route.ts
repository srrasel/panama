import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function estimateReadingTimeMinutes(content: string) {
  const text = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = text ? text.split(" ").length : 0
  return Math.max(1, Math.ceil(words / 200))
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || !["admin", "teacher"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(prisma as any).libraryArticle) {
    return NextResponse.json({ error: "Server needs restart to apply schema changes" }, { status: 503 })
  }

  try {
    const json = await req.json().catch(() => null)
    const title = typeof json?.title === "string" ? json.title.trim() : ""
    const summary = typeof json?.summary === "string" ? json.summary.trim() : ""
    const content = typeof json?.content === "string" ? json.content : ""
    const accessLevel = typeof json?.accessLevel === "string" ? json.accessLevel : "all"

    if (!title || !content.trim()) {
      return NextResponse.json({ error: "Missing title or content" }, { status: 400 })
    }

    const readingTimeMinutes = estimateReadingTimeMinutes(content)

    const article = await (prisma as any).libraryArticle.create({
      data: {
        title,
        summary,
        content,
        readingTimeMinutes,
        accessLevel,
        authorId: session.userId,
      },
      include: {
        author: {
          select: { name: true, role: true, imageUrl: true },
        },
      },
    })

    return NextResponse.json(article)
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 })
  }
}

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(prisma as any).libraryArticle) {
    return NextResponse.json([])
  }

  try {
    const role = session.role
    let where: any = {}

    if (role === "admin" || role === "teacher") {
      where = {}
    } else if (role === "student") {
      where = { accessLevel: { in: ["all", "student"] } }
    } else if (role === "parent") {
      where = { accessLevel: { in: ["all", "parent"] } }
    } else {
      return NextResponse.json({ error: "Unauthorized role" }, { status: 403 })
    }

    const articles = await (prisma as any).libraryArticle.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        summary: true,
        readingTimeMinutes: true,
        accessLevel: true,
        createdAt: true,
        author: { select: { name: true, role: true, imageUrl: true } },
      },
    })

    return NextResponse.json(articles)
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 })
  }
}
