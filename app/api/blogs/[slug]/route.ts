import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/blogs/[slug]
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params
    const post = await prisma.blogPost.findUnique({ where: { slug } })
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// PUT /api/blogs/[slug]
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params
    const body = await req.json()
    const { title, content, excerpt, coverImage, category, quiz, status } = body

    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

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

    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(content !== undefined && { content: content.trim() }),
        ...(excerpt !== undefined && { excerpt: excerpt?.trim() || null }),
        ...(coverImage !== undefined && { coverImage: coverImage?.trim() || null }),
        ...(category !== undefined && { category: category?.trim() || null }),
        ...(quiz !== undefined && { quiz: quiz || null }),
        ...(status !== undefined && { status }),
      },
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE /api/blogs/[slug]
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params
    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    await prisma.blogPost.delete({ where: { slug } })
    return NextResponse.json({ message: "Blog post deleted" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
