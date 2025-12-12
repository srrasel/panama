export async function GET() {
  const gradesData = {
    term1: [
      { subject: "Mathematics", grade: "A-", percentage: 92, marks: 92, outOf: 100, performance: "Excellent", comments: "Excellent grasp of concepts. Keep up the good work!", trend: "+5" },
      { subject: "English", grade: "A", percentage: 95, marks: 95, outOf: 100, performance: "Outstanding", comments: "Outstanding essay writing skills and comprehension.", trend: "+2" },
      { subject: "Science", grade: "B+", percentage: 87, marks: 87, outOf: 100, performance: "Good", comments: "Good understanding of core concepts. Improve lab work.", trend: "-1" },
      { subject: "History", grade: "A-", percentage: 90, marks: 90, outOf: 100, performance: "Excellent", comments: "Excellent historical knowledge and analysis.", trend: "+3" },
      { subject: "Physical Education", grade: "A", percentage: 94, marks: 94, outOf: 100, performance: "Excellent", comments: "Excellent participation and physical fitness.", trend: "+4" },
    ],
    term2: [
      { subject: "Mathematics", grade: "A", percentage: 94, marks: 94, outOf: 100, performance: "Outstanding", comments: "Improved performance. Excellent problem-solving skills.", trend: "+2" },
      { subject: "English", grade: "A-", percentage: 93, marks: 93, outOf: 100, performance: "Excellent", comments: "Strong writing skills. Minor improvements needed in poetry analysis.", trend: "-2" },
      { subject: "Science", grade: "A-", percentage: 91, marks: 91, outOf: 100, performance: "Excellent", comments: "Great improvement in lab work. Excellent practical understanding.", trend: "+4" },
      { subject: "History", grade: "A", percentage: 92, marks: 92, outOf: 100, performance: "Excellent", comments: "Consistent performance. Excellent class participation.", trend: "+1" },
      { subject: "Physical Education", grade: "A", percentage: 94, marks: 94, outOf: 100, performance: "Outstanding", comments: "Outstanding athletic performance and sportsmanship.", trend: "+3" },
    ],
  }
  return Response.json({ gradesData })
}
