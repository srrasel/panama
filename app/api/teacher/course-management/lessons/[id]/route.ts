import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { join } from "path"
import { writeFile, mkdir } from "fs/promises"

async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const uploadDir = join(process.cwd(), "public", "uploads")
  await mkdir(uploadDir, { recursive: true })
  
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
  const filepath = join(uploadDir, filename)
  
  await writeFile(filepath, buffer)
  return `/uploads/${filename}`
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentType = req.headers.get("content-type") || ""
  let data: any = {}

  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    if (fd.has("title")) data.title = String(fd.get("title"))
    if (fd.has("duration")) data.duration = String(fd.get("duration"))
    if (fd.has("status")) data.status = String(fd.get("status"))
    
    const video = fd.get("video") as File | null
    if (video) data.videoUrl = await saveFile(video)
    
    const images = fd.getAll("images").filter(Boolean) as File[]
    if (images.length) {
      const savedUrls = []
      for (const img of images) {
        savedUrls.push(await saveFile(img))
      }
      data.imageUrls = JSON.stringify(savedUrls)
    }
    
    if (fd.has("content")) data.content = String(fd.get("content"))
  } else {
    const body = await req.json().catch(() => ({}))
    if (body.title !== undefined) data.title = body.title
    if (body.duration !== undefined) data.duration = body.duration
    if (body.status !== undefined) data.status = body.status
    if (body.videoUrl !== undefined) data.videoUrl = body.videoUrl
    if (body.imageUrls !== undefined) data.imageUrls = JSON.stringify(body.imageUrls)
    if (body.content !== undefined) data.content = body.content
  }

  try {
    const lesson = await prisma.lesson.findUnique({ where: { id: parseInt(id) }, include: { course: true } })
    if (!lesson || (lesson.course.teacherId !== session.userId && session.role !== "admin")) {
      return NextResponse.json({ error: "Lesson not found or unauthorized" }, { status: 404 })
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: parseInt(id) },
      data
    })
    return NextResponse.json({ lesson: updatedLesson })
  } catch (error) {
    console.error("Error updating lesson:", error)
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const lesson = await prisma.lesson.findUnique({ where: { id: parseInt(id) }, include: { course: true } })
    if (!lesson || (lesson.course.teacherId !== session.userId && session.role !== "admin")) {
      return NextResponse.json({ error: "Lesson not found or unauthorized" }, { status: 404 })
    }

    await prisma.lesson.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 })
  }
}
