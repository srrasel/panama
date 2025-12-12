export async function GET() {
  const earnings = [
    { month: "Jan", earnings: 75 },
    { month: "Feb", earnings: 95 },
    { month: "Mar", earnings: 70 },
    { month: "Apr", earnings: 110 },
    { month: "May", earnings: 80 },
    { month: "Jun", earnings: 85 },
    { month: "Jul", earnings: 90 },
    { month: "Aug", earnings: 95 },
    { month: "Sep", earnings: 120 },
    { month: "Oct", earnings: 35 },
    { month: "Nov", earnings: 110 },
    { month: "Dec", earnings: 100 },
  ]

  const stats = {
    totalStudents: 17,
    totalCourses: 11,
    totalEarnings: 486,
  }

  return Response.json({ earnings, stats })
}
