type Question = { id: number; text: string; type: string; difficulty: string; marks: number }

let questions: Question[] = [
  { id: 1, text: "Explain the box model in CSS.", type: "Short Answer", difficulty: "Medium", marks: 5 },
  { id: 2, text: "Which property enables flexbox?", type: "MCQ", difficulty: "Easy", marks: 2 },
  { id: 3, text: "Write a function to reverse a string in JavaScript.", type: "Coding", difficulty: "Hard", marks: 10 },
]

export async function GET() {
  return Response.json({ questions })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const question: Question = {
    id: questions.length + 1,
    text: String(body.text || "Untitled Question"),
    type: String(body.type || "MCQ"),
    difficulty: String(body.difficulty || "Easy"),
    marks: Number(body.marks || 1),
  }
  questions = [question, ...questions]
  return Response.json({ question })
}

