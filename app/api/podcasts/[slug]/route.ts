import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const podcast = await prisma.podcast.findUnique({ where: { slug } })

    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 })
    }

    return NextResponse.json({ podcast })
  } catch (error) {
    console.error("Error fetching podcast:", error)
    return NextResponse.json({ error: "Failed to fetch podcast" }, { status: 500 })
  }
}

// PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await req.json()

    const { title, description, coverImage, audioUrl, iframeEmbed, duration, host, category, status } = body

    const existing = await prisma.podcast.findUnique({ where: { slug } })
    if (!existing) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 })
    }

    const podcast = await prisma.podcast.update({
      where: { slug },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(coverImage !== undefined && { coverImage: coverImage?.trim() || null }),
        ...(audioUrl !== undefined && { audioUrl: audioUrl?.trim() || null }),
        ...(iframeEmbed !== undefined && { iframeEmbed: iframeEmbed?.trim() || null }),
        ...(duration !== undefined && { duration: duration?.trim() || null }),
        ...(host !== undefined && { host: host?.trim() || null }),
        ...(category !== undefined && { category: category?.trim() || null }),
        ...(status !== undefined && { status }),
      },
    })

    return NextResponse.json({ podcast })
  } catch (error) {
    console.error("Error updating podcast:", error)
    return NextResponse.json({ error: "Failed to update podcast" }, { status: 500 })
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const existing = await prisma.podcast.findUnique({ where: { slug } })
    if (!existing) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 })
    }

    await prisma.podcast.delete({ where: { slug } })

    return NextResponse.json({ message: "Podcast deleted" })
  } catch (error) {
    console.error("Error deleting podcast:", error)
    return NextResponse.json({ error: "Failed to delete podcast" }, { status: 500 })
  }
}