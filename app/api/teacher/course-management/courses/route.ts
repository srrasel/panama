let courses = [
  { id: 1, title: "Web Development", students: 156, status: "Active", lessons: 24, imageUrl: "/images/web-dev.jpg", isFree: true, price: 0, requirements: [] as string[], description: "", teacher: "Prof. Smith", createdDate: "2024-08-15" },
  { id: 2, title: "Data Science", students: 198, status: "Active", lessons: 18, imageUrl: "/images/data-science.jpg", isFree: true, price: 0, requirements: [] as string[], description: "", teacher: "Dr. Johnson", createdDate: "2024-09-01" },
  { id: 3, title: "Mobile Apps", students: 156, status: "Draft", lessons: 12, imageUrl: "/images/mobile-apps.jpg", isFree: true, price: 0, requirements: [] as string[], description: "", teacher: "Emma Davis", createdDate: "2024-10-10" },
  { id: 4, title: "AI & Machine Learning", students: 134, status: "Archived", lessons: 20, imageUrl: "/images/ai-ml.jpg", isFree: true, price: 0, requirements: [] as string[], description: "", teacher: "Prof. Chen", createdDate: "2024-11-05" },
]

export async function GET() {
  return Response.json({ courses })
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || ""
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    const title = String(fd.get("title") || "Untitled Course")
    const status = String(fd.get("status") || "Draft")
    const lessons = Number(fd.get("lessons") || 0)
    const students = Number(fd.get("students") || 0)
    const image = fd.get("image") as File | null
    const imageUrl = image ? `/uploads/${image.name}` : ""
    const isFree = String(fd.get("isFree") || "true") === "true"
    const price = Number(fd.get("price") || 0)
    const requirements = fd.getAll("requirements").map((r) => String(r))
    const description = String(fd.get("description") || "")
    const teacher = String(fd.get("teacher") || "")
    const createdDate = String(fd.get("createdDate") || new Date().toISOString().split("T")[0])
    const course = { id: courses.length + 1, title, status, lessons, students, imageUrl, isFree, price, requirements, description, teacher, createdDate }
    courses = [course, ...courses]
    return Response.json({ course })
  } else {
    const body = await req.json().catch(() => ({}))
    const course = {
      id: courses.length + 1,
      title: String(body.title || "Untitled Course"),
      status: String(body.status || "Draft"),
      lessons: Number(body.lessons || 0),
      students: Number(body.students || 0),
      imageUrl: String(body.imageUrl || ""),
      isFree: Boolean(body.isFree ?? true),
      price: Number(body.price || 0),
      requirements: Array.isArray(body.requirements) ? body.requirements.map((r: any) => String(r)) : [],
      description: String(body.description || ""),
      teacher: String(body.teacher || ""),
      createdDate: String(body.createdDate || new Date().toISOString().split("T")[0]),
    }
    courses = [course, ...courses]
    return Response.json({ course })
  }
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}))
  const id = Number(body.id)
  const idx = courses.findIndex((c) => c.id === id)
  if (idx === -1) return new Response("Not Found", { status: 404 })
  const updated = { ...courses[idx] }
  const keys = [
    "title",
    "status",
    "lessons",
    "students",
    "imageUrl",
    "isFree",
    "price",
    "requirements",
    "description",
    "teacher",
    "createdDate",
  ] as const
  for (const k of keys) {
    if (body[k] !== undefined) (updated as any)[k] = body[k]
  }
  courses[idx] = updated as any
  return Response.json({ course: courses[idx] })
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => ({}))
  const id = Number(body.id)
  const before = courses.length
  courses = courses.filter((c) => c.id !== id)
  if (courses.length === before) return new Response("Not Found", { status: 404 })
  return Response.json({ ok: true })
}
