type Assignment = {
  id: number
  title: string
  course: string
  dueDate: string
  total: number
  status: "Pending" | "Graded"
  submissions?: number
  graded?: number
  avgScore?: number
  description?: string
}

let assignments: Assignment[] = [
  { id: 1, title: "Calculus Problem Set #5", course: "Advanced Mathematics 101", dueDate: "2025-12-05", total: 100, status: "Pending", submissions: 12 },
  { id: 2, title: "Physics Lab Report", course: "Physics Lab", dueDate: "2025-12-08", total: 50, status: "Pending", submissions: 5 },
  { id: 3, title: "Coding Project Phase 1", course: "Computer Science", dueDate: "2025-12-10", total: 150, status: "Pending", submissions: 8 },
  { id: 4, title: "Essay on History", course: "Advanced Mathematics 101", dueDate: "2025-11-20", total: 100, status: "Graded", graded: 28, avgScore: 85 },
  { id: 5, title: "Quiz 3", course: "Physics Lab", dueDate: "2025-11-18", total: 50, status: "Graded", graded: 28, avgScore: 82 },
]

export async function GET() {
  return Response.json({ assignments })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const assignment: Assignment = {
    id: assignments.length + 1,
    title: String(body.title || "Untitled Assignment"),
    course: String(body.course || "Unknown"),
    dueDate: String(body.dueDate || new Date().toISOString().slice(0, 10)),
    total: Number(body.total || 100),
    status: "Pending",
    submissions: 0,
    description: String(body.description || ""),
  }
  assignments = [assignment, ...assignments]
  return Response.json({ assignment })
}
