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

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const course = await prisma.course.findFirst({
    where: {
      OR: [
        { id },
        { slug: id }
      ]
    },
    include: {
      lessons: {
        orderBy: { order: "asc" }
      },
      quizzes: true
    }
  })

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  if (course.teacherId !== session.userId && session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json({ 
    course: {
      ...course,
      requirements: course.requirements ? JSON.parse(course.requirements) : [],
    } 
  })
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
    if (fd.has("status")) data.status = String(fd.get("status"))
    const image = fd.get("image") as File | null
    if (image) data.imageUrl = await saveFile(image)
    
    if (fd.has("isFree")) data.isFree = String(fd.get("isFree")) === "true"
    if (fd.has("price")) data.price = Number(fd.get("price"))
    if (fd.has("requirements")) data.requirements = JSON.stringify(fd.getAll("requirements").map(String))
    if (fd.has("description")) data.description = String(fd.get("description"))
  } else {
    const body = await req.json().catch(() => ({}))
    if (body.title !== undefined) data.title = body.title
    if (body.status !== undefined) data.status = body.status
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl
    if (body.isFree !== undefined) data.isFree = body.isFree
    if (body.price !== undefined) data.price = body.price
    if (body.requirements !== undefined) data.requirements = JSON.stringify(body.requirements)
    if (body.description !== undefined) data.description = body.description
  }

  try {
    const existing = await prisma.course.findFirst({
      where: { OR: [{ id }, { slug: id }] }
    })

    if (!existing) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    if (existing.teacherId !== session.userId && session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (data.title && data.title !== existing.title) {
      let slug = slugify(data.title)
      let counter = 1
      while (await prisma.course.findFirst({ where: { slug, id: { not: existing.id } } })) {
        slug = `${slugify(data.title)}-${counter}`
        counter++
      }
      data.slug = slug
    }

    const course = await prisma.course.update({
      where: { id: existing.id },
      data
    })
    return NextResponse.json({ course })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
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
    const existing = await prisma.course.findFirst({
      where: { OR: [{ id }, { slug: id }] }
    })

    if (!existing) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    if (existing.teacherId !== session.userId && session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.course.delete({
      where: { id: existing.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
