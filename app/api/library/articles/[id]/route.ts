import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(prisma as any).libraryArticle) {
    return NextResponse.json({ error: "Server needs restart" }, { status: 503 })
  }

  try {
    const article = await (prisma as any).libraryArticle.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, role: true, imageUrl: true } },
      },
    })

    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const role = session.role
    const access = article.accessLevel

    if (role === "admin" || role === "teacher") {
      return NextResponse.json(article)
    }
    if (role === "student" && ["all", "student"].includes(access)) {
      return NextResponse.json(article)
    }
    if (role === "parent" && ["all", "parent"].includes(access)) {
      return NextResponse.json(article)
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || !["admin", "teacher"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(prisma as any).libraryArticle) {
    return NextResponse.json({ error: "Server needs restart" }, { status: 503 })
  }

  try {
    const article = await (prisma as any).libraryArticle.findUnique({ where: { id } })
    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (session.role === "teacher" && article.authorId !== session.userId) {
      return NextResponse.json({ error: "You can only delete your own articles" }, { status: 403 })
    }

    await (prisma as any).libraryArticle.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 })
  }
}

