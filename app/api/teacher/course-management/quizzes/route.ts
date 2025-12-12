type MCQItem = { question: string; options: string[]; answerIndex: number }
type Quiz = { id: number; title: string; course: string; questions: number; status: string; items?: MCQItem[] }

let quizzes: Quiz[] = [
  { id: 1, title: "HTML Basics Quiz", course: "Web Development", questions: 15, status: "Published" },
  { id: 2, title: "CSS Layouts Quiz", course: "Web Development", questions: 12, status: "Draft" },
  { id: 3, title: "Data Wrangling Quiz", course: "Data Science", questions: 10, status: "Published" },
]

export async function GET() {
  return Response.json({ quizzes })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const quiz: Quiz = {
    id: quizzes.length + 1,
    title: String(body.title || "Untitled Quiz"),
    course: String(body.course || "Unknown"),
    questions: Number(body.questions || 0),
    status: String(body.status || "Draft"),
    items: Array.isArray(body.items) ? body.items : undefined,
  }
  quizzes = [quiz, ...quizzes]
  return Response.json({ quiz })
}
