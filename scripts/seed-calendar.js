// Run: node scripts/seed-calendar.js
// Seeds public calendar events from Pamavambo Private SchoolS CALENDAR OF EVENTS 2026

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const SOURCE = "pamavambo-calendar-2026"

function dayStart(dateStr) {
  return new Date(`${dateStr}T08:00:00`)
}

function dayEnd(dateStr) {
  return new Date(`${dateStr}T17:00:00`)
}

function range(startDate, endDate) {
  return { start: dayStart(startDate), end: dayEnd(endDate) }
}

function single(dateStr) {
  return range(dateStr, dateStr)
}

const events = [
  // TERM 1
  { ...single("2026-01-14"), title: "School Opening", description: "Primary & Secondary — Term 1", category: "Community", type: "Event" },
  { ...single("2026-01-30"), title: "Civvies Day", description: "Primary School", category: "Community", type: "Event" },
  { ...single("2026-02-06"), title: "Civvies Day", description: "Secondary School", category: "Community", type: "Event" },
  { ...single("2026-02-13"), title: "Inter House Athletics", description: "Secondary School", category: "Athletics", type: "Event" },
  { ...single("2026-02-20"), title: "Inter House Athletics", description: "Primary School", category: "Athletics", type: "Event" },
  { ...single("2026-02-25"), title: "Consultation & Parents Meeting", description: "Primary School", category: "Academics", type: "Event" },
  { ...single("2026-02-25"), title: "Consultation Form 3 & 4 & Parents Meeting", description: "Secondary School", category: "Academics", type: "Event" },
  { ...range("2026-02-26", "2026-02-27"), title: "Exeat", description: "Primary & Secondary School", category: "Community", type: "Event" },
  { ...single("2026-03-06"), title: "Inter School Athletics", description: "Primary School", category: "Athletics", type: "Event" },
  { ...single("2026-03-06"), title: "Colour Run", description: "Secondary School", category: "Athletics", type: "Event" },
  { ...range("2026-03-09", "2026-03-23"), title: "Exams", description: "Secondary School — Term 1", category: "Academics", type: "Exam" },
  { ...single("2026-03-13"), title: "Career's Day", description: "Primary School", category: "Academics", type: "Event" },
  { ...range("2026-03-19", "2026-03-26"), title: "Exams", description: "Primary School — Term 1", category: "Academics", type: "Exam" },
  { ...single("2026-03-25"), title: "Inter Schools Athletics", description: "Secondary School", category: "Athletics", type: "Event" },
  { ...single("2026-04-01"), title: "School Close", description: "Primary & Secondary — End of Term 1", category: "Community", type: "Event" },

  // TERM 2
  { ...single("2026-05-12"), title: "School Opening", description: "Primary & Secondary — Term 2", category: "Community", type: "Event" },
  { ...single("2026-05-28"), title: "Africa Day / Culture", description: "Secondary School", category: "Arts", type: "Event" },
  { ...single("2026-05-29"), title: "Culture Day", description: "Primary School", category: "Arts", type: "Event" },
  { ...single("2026-05-30"), title: "Civvies Day", description: "Secondary School", category: "Community", type: "Event" },
  { ...single("2026-06-05"), title: "Clean Up Day", description: "Primary School", category: "Community", type: "Event" },
  { ...single("2026-06-24"), title: "Consultation", description: "Primary & Secondary School", category: "Academics", type: "Event" },
  { ...range("2026-06-25", "2026-06-26"), title: "Exeat", description: "Primary & Secondary School", category: "Community", type: "Event" },
  { ...single("2026-07-03"), title: "Inter Schools Ball Games", description: "Primary School", category: "Athletics", type: "Event" },
  { ...single("2026-07-10"), title: "Inter Schools Ball Games", description: "Secondary School", category: "Athletics", type: "Event" },
  { ...range("2026-07-22", "2026-07-29"), title: "Exams", description: "Primary & Secondary — Term 2", category: "Academics", type: "Exam" },
  { ...single("2026-07-31"), title: "Talent Show", description: "Primary School", category: "Arts", type: "Event" },
  { ...single("2026-08-03"), title: "Talent Show", description: "Secondary School", category: "Arts", type: "Event" },
  { ...single("2026-08-03"), title: "Grade 7 Trip", description: "Primary School", category: "Community", type: "Event" },
  { ...single("2026-08-06"), title: "School Close", description: "Primary & Secondary — End of Term 2", category: "Community", type: "Event" },
  { ...range("2026-08-10", "2026-08-12"), title: "Trip — Mutare", description: "Secondary School", category: "Community", type: "Event" },

  // TERM 3
  { ...single("2026-09-08"), title: "School Opening", description: "Primary & Secondary — Term 3", category: "Community", type: "Event" },
  { ...single("2026-09-25"), title: "Civvies Day", description: "Primary School", category: "Community", type: "Event" },
  { ...single("2026-09-30"), title: "Civvies & Consultation Form 4s", description: "Secondary School", category: "Academics", type: "Event" },
  { ...single("2026-10-02"), title: "Clean Up Day", description: "Primary School", category: "Community", type: "Event" },
  { ...range("2026-10-01", "2026-10-31"), title: "Grade 7 Exams", description: "Primary School — October", category: "Academics", type: "Exam" },
  { ...range("2026-10-22", "2026-10-23"), title: "Exeat", description: "Primary & Secondary School", category: "Community", type: "Event" },
  { ...single("2026-10-30"), title: "ECD — Grade 2 Trip", description: "Primary School", category: "Community", type: "Event" },
  { ...single("2026-10-30"), title: "Civvies Day", description: "Secondary School", category: "Community", type: "Event" },
  { ...range("2026-11-02", "2026-11-06"), title: "Grade 3–6 Trips", description: "Primary School", category: "Community", type: "Event" },
  { ...range("2026-10-15", "2026-11-30"), title: "O Level Exams", description: "Secondary School — October to November", category: "Academics", type: "Exam" },
  { ...range("2026-11-11", "2026-11-25"), title: "Exams", description: "Primary & Secondary — Term 3", category: "Academics", type: "Exam" },
  { ...single("2026-11-30"), title: "Pro Night — Form 4s", description: "Secondary School", category: "Arts", type: "Event" },
  { ...single("2026-12-01"), title: "Prize Giving — ECD to Grade 2", description: "Primary School", category: "Arts", type: "Event" },
  { ...single("2026-12-02"), title: "Prize Giving — Grade 3 to 6", description: "Primary School", category: "Arts", type: "Event" },
  { ...single("2026-12-03"), title: "School Close", description: "Primary & Secondary — End of Term 3", category: "Community", type: "Event" },
]

async function main() {
  const admin = await prisma.user.findFirst({
    where: { role: "admin" },
    orderBy: { createdAt: "asc" },
  })

  if (!admin) {
    throw new Error("No admin user found. Run prisma seed first.")
  }

  const deleted = await prisma.schedule.deleteMany({
    where: {
      description: { contains: SOURCE },
    },
  })
  console.log(`Removed ${deleted.count} previously seeded calendar events.`)

  let created = 0
  for (const ev of events) {
    await prisma.schedule.create({
      data: {
        title: ev.title,
        description: `${ev.description} [${SOURCE}]`,
        startTime: ev.start,
        endTime: ev.end,
        type: ev.type,
        category: ev.category,
        location: "Pamavambo Private Schools",
        teacherId: admin.id,
      },
    })
    created++
  }

  console.log(`Seeded ${created} Pamavambo 2026 calendar events.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
