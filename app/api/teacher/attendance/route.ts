type ClassInfo = { id: string; name: string; students: number; period: string }
type StudentRecord = { id: number; name: string; roll: string; status: "present" | "absent" | "late" }

let classes: ClassInfo[] = [
  { id: "class1", name: "Advanced Mathematics 101", students: 32, period: "09:00 - 10:30" },
  { id: "class2", name: "Physics Lab", students: 28, period: "11:00 - 12:30" },
  { id: "class3", name: "Computer Science", students: 35, period: "14:00 - 15:30" },
]

let attendanceStore: Record<string, { date: string; students: StudentRecord[] }> = {
  class1: {
    date: new Date().toISOString().slice(0, 10),
    students: [
      { id: 1, name: "John Adams", roll: "MA101", status: "present" },
      { id: 2, name: "Sarah Mitchell", roll: "MA102", status: "present" },
      { id: 3, name: "James Wilson", roll: "MA103", status: "absent" },
      { id: 4, name: "Emily Davis", roll: "MA104", status: "present" },
      { id: 5, name: "Michael Brown", roll: "MA105", status: "late" },
      { id: 6, name: "Jessica Taylor", roll: "MA106", status: "present" },
      { id: 7, name: "David Anderson", roll: "MA107", status: "present" },
      { id: 8, name: "Amanda White", roll: "MA108", status: "absent" },
    ],
  },
  class2: {
    date: new Date().toISOString().slice(0, 10),
    students: [
      { id: 1, name: "Alice Walker", roll: "PH201", status: "present" },
      { id: 2, name: "Mark Lee", roll: "PH202", status: "late" },
    ],
  },
  class3: {
    date: new Date().toISOString().slice(0, 10),
    students: [
      { id: 1, name: "Tom Harris", roll: "CS301", status: "present" },
      { id: 2, name: "Nina Patel", roll: "CS302", status: "present" },
    ],
  },
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const classId = url.searchParams.get("classId") || "class1"
  const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10)
  const cls = classes
  const store = attendanceStore[classId]
  const students = store ? store.students : []
  return Response.json({ classes: cls, date, students })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const classId = String(body.classId || "class1")
  const date = String(body.date || new Date().toISOString().slice(0, 10))
  const students = Array.isArray(body.students) ? body.students : []
  attendanceStore[classId] = { date, students }
  return Response.json({ ok: true })
}
