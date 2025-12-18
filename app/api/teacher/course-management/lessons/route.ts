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

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const courseId = url.searchParams.get("courseId")

  const where: any = {
    course: {
      ...(courseId ? { id: courseId } : {})
    }
  }

  if (session.role !== "admin") {
    where.course.teacherId = session.userId
  }

  const lessons = await prisma.lesson.findMany({
    where,
    orderBy: { order: "asc" }
  })

  // Map to expected format
  const formatted = lessons.map(l => ({
    id: l.id,
    courseId: l.courseId,
    title: l.title,
    duration: l.duration || "0 min",
    status: l.status,
    videoUrl: l.videoUrl,
    imageUrls: l.imageUrls ? JSON.parse(l.imageUrls) : [],
    content: l.content
  }))

  return NextResponse.json({ lessons: formatted })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentType = req.headers.get("content-type") || ""
  let data: any = {}

  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    data.courseId = String(fd.get("courseId") || "")
    data.title = String(fd.get("title") || "Untitled Lesson")
    data.duration = String(fd.get("duration") || "0 min")
    data.status = String(fd.get("status") || "Draft")
    
    const video = fd.get("video") as File | null
    if (video) {
      data.videoUrl = await saveFile(video)
    }
    
    const images = fd.getAll("images").filter(Boolean) as File[]
    if (images.length) {
      data.imageUrls = []
      for (const img of images) {
        data.imageUrls.push(await saveFile(img))
      }
    } else {
      data.imageUrls = []
    }
    
    data.content = String(fd.get("content") || "")
  } else {
    const body = await req.json().catch(() => ({}))
    data = {
      courseId: String(body.courseId || ""),
      title: String(body.title || "Untitled Lesson"),
      duration: String(body.duration || "0 min"),
      status: String(body.status || "Draft"),
      videoUrl: body.videoUrl,
      imageUrls: body.imageUrls || [],
      content: body.content,
    }
  }

  // Verify course belongs to teacher
  const course = await prisma.course.findUnique({ where: { id: data.courseId } })
  if (!course || (course.teacherId !== session.userId && session.role !== "admin")) {
    return NextResponse.json({ error: "Invalid course" }, { status: 400 })
  }

  // Get max order
  const lastLesson = await prisma.lesson.findFirst({
    where: { courseId: data.courseId },
    orderBy: { order: "desc" }
  })
  const order = (lastLesson?.order || 0) + 1

  const lesson = await prisma.lesson.create({
    data: {
      courseId: data.courseId,
      title: data.title,
      duration: data.duration,
      status: data.status,
      videoUrl: data.videoUrl,
      imageUrls: JSON.stringify(data.imageUrls),
      content: data.content,
      order
    }
  })

  return NextResponse.json({ lesson })
}

export async function PUT(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentType = req.headers.get("content-type") || ""
  let data: any = {}
  let id = ""

  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    id = String(fd.get("id") || "")
    data.title = fd.get("title") ? String(fd.get("title")) : undefined
    data.duration = fd.get("duration") ? String(fd.get("duration")) : undefined
    data.status = fd.get("status") ? String(fd.get("status")) : undefined
    data.content = fd.get("content") ? String(fd.get("content")) : undefined
    
    const video = fd.get("video") as File | null
    if (video) data.videoUrl = await saveFile(video)
    
    const images = fd.getAll("images").filter(Boolean) as File[]
    if (images.length > 0) {
      const savedUrls = []
      for (const img of images) {
        savedUrls.push(await saveFile(img))
      }
      data.imageUrls = JSON.stringify(savedUrls)
    }
  } else {
    const body = await req.json().catch(() => ({}))
    id = body.id
    data = { ...body }
    delete data.id
    delete data.courseId // Prevent moving lesson to another course for safety (or allow if needed)
    if (data.imageUrls) data.imageUrls = JSON.stringify(data.imageUrls)
  }

  if (!id) {
    return NextResponse.json({ error: "Lesson ID required" }, { status: 400 })
  }

  // Verify ownership via existing lesson
  const existingLesson = await prisma.lesson.findUnique({
      where: { id },
      include: { course: true }
  })

  if (!existingLesson || (existingLesson.course.teacherId !== session.userId && session.role !== "admin")) {
      return NextResponse.json({ error: "Lesson not found or unauthorized" }, { status: 404 })
  }

  const lesson = await prisma.lesson.update({
    where: { id },
    data
  })

  return NextResponse.json({ lesson })
}

export async function DELETE(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  if (!id) {
      return NextResponse.json({ error: "Lesson ID required" }, { status: 400 })
  }

  // Verify ownership
  const existingLesson = await prisma.lesson.findUnique({
      where: { id },
      include: { course: true }
  })

  if (!existingLesson || (existingLesson.course.teacherId !== session.userId && session.role !== "admin")) {
      return NextResponse.json({ error: "Lesson not found or unauthorized" }, { status: 404 })
  }

  await prisma.lesson.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
