type Lesson = {
  id: number
  courseId: number
  title: string
  duration: string
  status: string
  videoUrl?: string
  imageUrls?: string[]
  content?: string
}

let lessons: Lesson[] = [
  { id: 1, courseId: 1, title: "HTML & CSS Basics", duration: "45 min", status: "Published" },
  { id: 2, courseId: 1, title: "Flexbox & Grid", duration: "50 min", status: "Published" },
  { id: 3, courseId: 1, title: "JavaScript Fundamentals", duration: "60 min", status: "Draft" },
]

export async function GET() {
  return Response.json({ lessons })
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || ""
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    const courseId = Number(fd.get("courseId") || 1)
    const title = String(fd.get("title") || "Untitled Lesson")
    const duration = String(fd.get("duration") || "0 min")
    const status = String(fd.get("status") || "Draft")
    const video = fd.get("video") as File | null
    const videoUrl = video ? `/uploads/${video.name}` : undefined
    const images = fd.getAll("images").filter(Boolean) as File[]
    const imageUrls = images.length ? images.map((f) => `/uploads/${f.name}`) : undefined
    const content = String(fd.get("content") || "")
    const lesson: Lesson = { id: lessons.length + 1, courseId, title, duration, status, videoUrl, imageUrls, content }
    lessons = [lesson, ...lessons]
    return Response.json({ lesson })
  } else {
    const body = await req.json().catch(() => ({}))
    const lesson: Lesson = {
      id: lessons.length + 1,
      courseId: Number(body.courseId || 1),
      title: String(body.title || "Untitled Lesson"),
      duration: String(body.duration || "0 min"),
      status: String(body.status || "Draft"),
      videoUrl: body.videoUrl || undefined,
      imageUrls: body.imageUrls || undefined,
      content: body.content || undefined,
    }
    lessons = [lesson, ...lessons]
    return Response.json({ lesson })
  }
}
