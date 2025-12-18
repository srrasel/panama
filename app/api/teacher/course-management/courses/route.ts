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

export const dynamic = "force-dynamic"

export async function GET() {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const where: any = {}
  
  if (session.role !== "admin") {
    where.teacherId = session.userId
  }

  const courses = await prisma.course.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      lessons: true,
      enrollments: true,
    }
  })

  // Map to expected format
  const formatted = courses.map(c => ({
    id: c.id,
    slug: c.slug || c.id,
    title: c.title,
    students: c.enrollments.length,
    status: c.status,
    lessons: c.lessons.length,
    imageUrl: c.imageUrl,
    isFree: c.isFree,
    price: c.price,
    requirements: c.requirements ? JSON.parse(c.requirements) : [],
    description: c.description,
    teacher: session.user?.name, // Or fetch teacher name if needed
    createdDate: c.createdAt.toISOString().split("T")[0]
  }))

  return NextResponse.json({ courses: formatted })
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
    data.title = String(fd.get("title") || "Untitled Course")
    data.status = String(fd.get("status") || "Draft")
    // lessons count is derived from relation
    // students count is derived from relation
    const image = fd.get("image") as File | null
    if (image) {
      data.imageUrl = await saveFile(image)
    } else {
      data.imageUrl = ""
    }
    data.isFree = String(fd.get("isFree") || "true") === "true"
    data.price = Number(fd.get("price") || 0)
    data.requirements = fd.getAll("requirements").map((r) => String(r))
    data.description = String(fd.get("description") || "")
    // createdDate is auto
  } else {
    const body = await req.json().catch(() => ({}))
    data = {
      title: String(body.title || "Untitled Course"),
      status: String(body.status || "Draft"),
      imageUrl: String(body.imageUrl || ""),
      isFree: Boolean(body.isFree ?? true),
      price: Number(body.price || 0),
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      description: String(body.description || ""),
    }
  }

  let slug = slugify(data.title)
  let counter = 1
  while (await prisma.course.findUnique({ where: { slug } })) {
    slug = `${slugify(data.title)}-${counter}`
    counter++
  }

  const course = await prisma.course.create({
    data: {
      title: data.title,
      slug,
      status: data.status,
      imageUrl: data.imageUrl,
      isFree: data.isFree,
      price: data.price,
      requirements: JSON.stringify(data.requirements),
      description: data.description,
      teacherId: session.userId,
    }
  })

  return NextResponse.json({ 
    course: {
      ...course,
      id: course.id,
      slug: course.slug,
      lessons: 0,
      students: 0,
      requirements: data.requirements,
      createdDate: course.createdAt.toISOString().split("T")[0]
    } 
  })
}

export async function PUT(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const id = String(body.id)

  const existing = await prisma.course.findUnique({ where: { id } })
  if (!existing || (existing.teacherId !== session.userId && session.role !== "admin")) {
    return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 })
  }

  const updateData: any = {}
  if (body.title !== undefined) {
    updateData.title = body.title
    if (body.title !== existing.title) {
      let slug = slugify(body.title)
      let counter = 1
      while (await prisma.course.findFirst({ where: { slug, id: { not: existing.id } } })) {
        slug = `${slugify(body.title)}-${counter}`
        counter++
      }
      updateData.slug = slug
    }
  }
  if (body.status !== undefined) updateData.status = body.status
  if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl
  if (body.isFree !== undefined) updateData.isFree = body.isFree
  if (body.price !== undefined) updateData.price = body.price
  if (body.requirements !== undefined) updateData.requirements = JSON.stringify(body.requirements)
  if (body.description !== undefined) updateData.description = body.description

  const updated = await prisma.course.update({
    where: { id },
    data: updateData,
    include: { lessons: true, enrollments: true }
  })

  return NextResponse.json({ 
    course: {
      ...updated,
      slug: updated.slug,
      lessons: updated.lessons.length,
      students: updated.enrollments.length,
      requirements: updated.requirements ? JSON.parse(updated.requirements) : [],
      createdDate: updated.createdAt.toISOString().split("T")[0]
    } 
  })
}

export async function DELETE(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  if (!session || (session.role !== "teacher" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const id = String(body.id)

  const existing = await prisma.course.findUnique({ where: { id } })
  if (!existing || (existing.teacherId !== session.userId && session.role !== "admin")) {
    return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 })
  }

  await prisma.course.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
