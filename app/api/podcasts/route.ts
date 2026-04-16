import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/podcasts - list podcasts with optional search
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
        { description: { contains: q, mode: "insensitive" } },
        { host: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
      ]
    }

    const podcasts = await prisma.podcast.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ podcasts })
  } catch (error) {
    console.error("Error fetching podcasts:", error)
    return NextResponse.json({ error: "Failed to fetch podcasts" }, { status: 500 })
  }
}

// POST /api/podcasts - create a podcast (admin only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, coverImage, audioUrl, iframeEmbed, duration, host, category, status } = body

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString(36)

    const podcast = await prisma.podcast.create({
      data: {
        title: title.trim(),
        slug,
        description: description?.trim() || null,
        coverImage: coverImage?.trim() || null,
        audioUrl: audioUrl?.trim() || null,
        iframeEmbed: iframeEmbed?.trim() || null,
        duration: duration?.trim() || null,
        host: host?.trim() || null,
        category: category?.trim() || null,
        status: status || "Draft",
      },
    })

    return NextResponse.json({ podcast }, { status: 201 })
  } catch (error) {
    console.error("Error creating podcast:", error)
    return NextResponse.json({ error: "Failed to create podcast" }, { status: 500 })
  }
}
