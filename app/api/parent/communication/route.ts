export async function GET() {
  const messages = [
    { id: 1, from: "Mr. James Smith", role: "Mathematics Teacher", subject: "Great Performance in Recent Quiz", content: "Emma did excellently in the recent mathematics quiz. Keep encouraging her to practice more problems.", date: "2025-12-01", unread: true },
    { id: 2, from: "Mrs. Sarah Johnson", role: "English Teacher", subject: "Essay Submission Feedback", content: "Excellent essay on Climate Change. The research was thorough and well-presented.", date: "2025-11-29", unread: false },
    { id: 3, from: "Dr. Michael Brown", role: "School Principal", subject: "Semester Academic Awards", content: "Emma has been selected for the semester academic excellence award. Congratulations!", date: "2025-11-27", unread: false },
  ]
  return Response.json({ messages })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!body || !body.content) {
    return Response.json({ error: "Invalid message" }, { status: 400 })
  }
  const saved = {
    id: Math.floor(Math.random() * 1000000),
    from: "You",
    role: "Parent",
    subject: body.subject || "Message",
    content: body.content,
    date: new Date().toISOString().slice(0, 10),
    unread: false,
  }
  return Response.json({ ok: true, message: saved })
}
