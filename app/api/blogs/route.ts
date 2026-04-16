import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/blogs - list blog posts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")?.trim() || ""
    const status = searchParams.get("status") || "Published"
    const all = searchParams.get("all") === "true"

    const where: any = {}
    if (!all) {
      where.status = status
    }
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// POST /api/blogs - create a blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, content, excerpt, coverImage, category, quiz, status } = body

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Validate quiz JSON if provided
    if (quiz) {
      try {
        const parsed = JSON.parse(quiz)
        if (!Array.isArray(parsed)) {
          return NextResponse.json({ error: "Quiz must be a JSON array" }, { status: 400 })
        }
      } catch {
        return NextResponse.json({ error: "Invalid quiz JSON format" }, { status: 400 })
      }
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString(36)

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug,
        content: content.trim(),
        excerpt: excerpt?.trim() || null,
        coverImage: coverImage?.trim() || null,
        category: category?.trim() || null,
        quiz: quiz || null,
        status: status || "Draft",
      },
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
