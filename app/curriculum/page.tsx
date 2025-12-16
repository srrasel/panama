import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { BookOpen, FileText, Award, Lightbulb, Clock, Users } from "lucide-react"

export default function CurriculumPage() {
  const stats = [
    { label: "Subjects", value: "24", icon: BookOpen },
    { label: "Modules", value: "180+", icon: FileText },
    { label: "Assessments", value: "350+", icon: Award },
    { label: "Learning Outcomes", value: "500+", icon: Lightbulb },
  ]

  const coreSubjects = [
    { title: "Mathematics", description: "Number systems, algebra, geometry, statistics, and applied problem solving." },
    { title: "Science", description: "Physics, chemistry, biology, and inquiry-based laboratory practice." },
    { title: "English", description: "Reading comprehension, composition, grammar, literature, and communication." },
    { title: "Social Studies", description: "History, civics, geography, and global perspectives." },
    { title: "Computer Science", description: "Programming fundamentals, web, data, AI literacy, and cybersecurity." },
    { title: "Arts", description: "Visual design, music theory, performance, and creative expression." },
  ]

  const gradeBands = [
    { title: "Primary (Grades 1–5)", points: ["Foundational literacy and numeracy", "Play-based exploration", "Social-emotional learning"] },
    { title: "Middle (Grades 6–8)", points: ["Concept mastery", "Project-based learning", "Study skills and collaboration"] },
    { title: "Secondary (Grades 9–12)", points: ["Advanced electives", "Career readiness", "Research and portfolio"] },
  ]

  const outcomes = [
    "Critical thinking and problem solving",
    "Effective written and verbal communication",
    "Digital literacy and responsible citizenship",
    "Collaboration and leadership",
    "Creativity and design thinking",
    "Data interpretation and scientific inquiry",
  ]

  const assessments = [
    { title: "Formative", description: "Weekly quizzes, in-class activities, exit tickets" },
    { title: "Summative", description: "Unit tests, term exams, final projects" },
    { title: "Performance", description: "Presentations, labs, studio work, peer review" },
    { title: "Portfolio", description: "Long-term artifacts demonstrating growth and mastery" },
  ]

  const sampleWeek = [
    { day: "Monday", items: ["Math • Algebraic Expressions", "Science • Lab Safety", "English • Narrative Writing"] },
    { day: "Tuesday", items: ["Social Studies • Ancient Civilizations", "Computer Science • HTML Basics", "Arts • Color Theory"] },
    { day: "Wednesday", items: ["Math • Linear Equations", "Science • States of Matter", "English • Grammar Workshop"] },
    { day: "Thursday", items: ["Social Studies • Map Skills", "Computer Science • CSS Layouts", "Arts • Composition Practice"] },
    { day: "Friday", items: ["Math • Problem Solving", "Science • Lab: Density", "English • Reading Circle"] },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="px-4 py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-3">Curriculum</h1>
                <p className="text-white/80 max-w-2xl">A cohesive, outcomes-driven curriculum across grade bands and subjects, designed for rigor, equity, and real-world application.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                  <div className="flex items-center justify-center gap-3">
                    <Users className="h-6 w-6 text-white" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">12k+</div>
                      <div className="text-white/80 text-sm">Active Students</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="h-6 w-6 text-white" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">7–8 hrs</div>
                      <div className="text-white/80 text-sm">Daily Learning</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/10 border border-white/20 p-6">
                  <div className="flex items-center justify-center gap-3">
                    <s.icon className="h-6 w-6 text-white" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">{s.value}</div>
                      <div className="text-white/80 text-sm">{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Core Subjects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreSubjects.map((s) => (
                <div key={s.title} className="bg-card rounded-xl border border-border p-6 hover:border-foreground/30 transition">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-foreground/70 text-sm">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Grade Bands</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradeBands.map((g) => (
                <div key={g.title} className="rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{g.title}</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {g.points.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Learning Outcomes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {outcomes.map((o) => (
                <div key={o} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-foreground/80" />
                    <p className="text-sm text-foreground">{o}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-muted/50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Assessment Methods</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {assessments.map((a) => (
                <div key={a.title} className="rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{a.title}</h3>
                  <p className="text-sm text-foreground/70">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Sample Weekly Plan</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleWeek.map((d) => (
                <div key={d.day} className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{d.day}</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {d.items.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-xl bg-muted/60 border border-border p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Curriculum Resources</h3>
                <p className="text-sm text-foreground/70">Syllabi, pacing guides, assessment rubrics, and reading lists.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-full bg-amber-500 text-black hover:bg-amber-600 transition text-sm">Download Syllabus</button>
                <button className="px-4 py-2 rounded-full border border-border text-foreground hover:bg-muted/80 transition text-sm">View Reading List</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
