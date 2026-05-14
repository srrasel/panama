"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Mic, Clock, User as UserIcon, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

type Podcast = {
  id: string
  title: string
  slug: string
  description: string | null
  coverImage: string | null
  duration: string | null
  host: string | null
  category: string | null
  iframeEmbed: string | null
  createdAt: string
}

type LearningResource = {
  category: string
  title: string
  ages: string
  url: string
  description: string
  grades: string[]
}

const learningResources: LearningResource[] = [
  {
    category: "Science & Nature",
    title: "National Geographic Society Kids Videos",
    ages: "Ages 7-14",
    url: "https://kids.nationalgeographic.com/videos",
    description: "Short, engaging videos on animals, ecosystems, and Earth science.",
    grades: ["Elementary", "Middle"],
  },
  {
    category: "Science & Nature",
    title: "Smithsonian Institution Learning Lab",
    ages: "Ages 10-17",
    url: "https://learninglab.si.edu/",
    description: "Curated science, space, and innovation videos tied to real artifacts.",
    grades: ["Middle", "High"],
  },
  {
    category: "Science & Nature",
    title: "Khan Academy - Science Courses",
    ages: "Ages 11-17",
    url: "https://www.khanacademy.org/",
    description: "Clear instructional videos on biology, chemistry, physics, and more.",
    grades: ["Middle", "High"],
  },
  {
    category: "Social-Emotional Learning (SEL)",
    title: "PBS Kids - Talk About",
    ages: "Ages 7-12",
    url: "https://pbskids.org/videos/pbs-kids-talk-about",
    description: "Helps students understand emotions, relationships, and real-life challenges.",
    grades: ["Elementary", "Middle"],
  },
  {
    category: "Social-Emotional Learning (SEL)",
    title: "PBS - Becoming Your Personal Best",
    ages: "Ages 12-17",
    url: "https://www.pbs.org/video/educators-youth-part-1-eizkxn/",
    description: "Builds resilience, confidence, and goal-setting skills.",
    grades: ["Middle", "High"],
  },
  {
    category: "History & Social Studies",
    title: "Smithsonian Institution Learning Lab - History Collections",
    ages: "Ages 10-17",
    url: "https://learninglab.si.edu/",
    description: "Primary sources and videos covering U.S. and world history.",
    grades: ["Middle", "High"],
  },
  {
    category: "History & Social Studies",
    title: "PBS LearningMedia",
    ages: "Ages 8-17",
    url: "https://www.pbslearningmedia.org/",
    description: "Classroom-ready videos on civics, government, and historical events.",
    grades: ["Elementary", "Middle", "High"],
  },
  {
    category: "General Learning & Critical Thinking",
    title: "TED Talks",
    ages: "Ages 13-17",
    url: "https://www.ted.com/talks",
    description: "Inspiring talks on ideas, innovation, and real-world problem solving.",
    grades: ["High"],
  },
  {
    category: "General Learning & Critical Thinking",
    title: "TED-Ed Lessons",
    ages: "Ages 10-17",
    url: "https://ed.ted.com/lessons",
    description: "Animated lessons with questions and discussion prompts across subjects.",
    grades: ["Middle", "High"],
  },
  {
    category: "General Learning & Critical Thinking",
    title: "PBS - TED Talks Education Series",
    ages: "Ages 12-17",
    url: "https://www.pbs.org/wnet/ted-talks-education/video/",
    description: "Focuses on learning, student voice, and education innovation.",
    grades: ["Middle", "High"],
  },
  {
    category: "Math & Core Skills",
    title: "Khan Academy - Math Programs",
    ages: "Ages 7-17",
    url: "https://www.khanacademy.org/",
    description: "Step-by-step math instruction from elementary through high school.",
    grades: ["Elementary", "Middle", "High"],
  },
]

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedGrade, setSelectedGrade] = useState("All")

  useEffect(() => {
    fetch("/api/podcasts")
      .then((r) => r.json())
      .then((data) => setPodcasts(data.podcasts || []))
      .catch(() => setPodcasts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return podcasts
    const q = query.toLowerCase()
    return podcasts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.host?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    )
  }, [podcasts, query])

  const learningCategories = useMemo(
    () => ["All", ...new Set(learningResources.map((resource) => resource.category))],
    []
  )
  const learningGrades = useMemo(
    () => ["All", ...new Set(learningResources.flatMap((resource) => resource.grades))],
    []
  )

  const filteredLearningResources = useMemo(() => {
    return learningResources.filter((resource) => {
      const matchesCategory =
        selectedCategory === "All" || resource.category === selectedCategory
      const matchesGrade = selectedGrade === "All" || resource.grades.includes(selectedGrade)
      return matchesCategory && matchesGrade
    })
  }, [selectedCategory, selectedGrade])

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="px-4 py-20 sm:py-28 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <Mic className="w-4 h-4 text-purple-300" />
            <span className="text-purple-200 text-sm font-medium">Pamavambo Podcasts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Listen & Learn
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Explore inspiring conversations, insights, and stories from our school community
          </p>
        </div>
      </section>

      {/* Search + Cards */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Search Bar */}
          <div className="relative mb-10 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search podcasts by title, host, or category..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition"
            />
          </div>

          {/* Loading Skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[1.8rem] border border-slate-100 bg-white p-3 animate-pulse shadow-xl shadow-slate-200/40">
                  <div className="h-48 rounded-2xl bg-slate-100 mb-4" />
                  <div className="px-3 space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-1/4" />
                    <div className="h-5 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Mic className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700">No podcasts found</h3>
              <p className="text-slate-500 mt-2">
                {query ? "Try a different search term" : "Check back soon for new episodes"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((podcast) => (
                <Link key={podcast.id} href={`/podcasts/${podcast.slug}`}>
                  <div className="bg-white group rounded-[1.8rem] shadow-xl shadow-slate-200/40 p-3 border border-slate-50 h-full hover:shadow-2xl transition-shadow duration-300">
                    {/* Cover Image */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-purple-100 to-indigo-100">
                      {podcast.coverImage ? (
                        <img
                          src={podcast.coverImage}
                          alt={podcast.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Mic className="w-16 h-16 text-purple-300" />
                        </div>
                      )}
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                          <svg className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    {podcast.category && (
                      <span className="bg-purple-50 hover:bg-purple-500 hover:text-white transition-all duration-300 text-purple-600 px-3 py-1.5 rounded-lg text-sm font-bold mb-4 inline-block">
                        {podcast.category}
                      </span>
                    )}

                    {/* Meta Row */}
                    <div className="flex gap-6 px-3 mb-3 text-slate-500 text-sm justify-between font-semibold">
                      {podcast.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-slate-400" /> {podcast.duration}
                        </div>
                      )}
                      {podcast.host && (
                        <div className="flex items-center gap-1.5">
                          <UserIcon className="w-4 h-4 text-slate-400" /> {podcast.host}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl px-3 font-bold text-slate-800 mb-3 leading-snug line-clamp-2">
                      {podcast.title}
                    </h4>

                    {/* Description */}
                    {podcast.description && (
                      <p className="text-sm text-slate-500 px-3 mb-4 line-clamp-2">
                        {podcast.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between px-3 pb-3 pt-3 border-t border-slate-50 text-sm">
                      <span className="text-slate-400 text-xs">
                        {new Date(podcast.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-purple-600 font-semibold text-sm group-hover:underline">
                        Listen Now →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Learning Video Resources</h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Free, trusted resources for students and families. Explore by category and grade level.
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {learningCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {learningGrades.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                    selectedGrade === grade
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-slate-500">
              Showing {filteredLearningResources.length} of {learningResources.length} resources
            </div>
          </div>

          {filteredLearningResources.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-slate-700">No resources match those filters</h3>
              <p className="text-slate-500 mt-2">Try a different category or grade level.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLearningResources.map((resource) => (
                <a
                  key={`${resource.category}-${resource.title}`}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40 hover:shadow-2xl transition"
                >
                  <span className="inline-flex text-xs font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-3">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {resource.ages}
                    </span>
                    {resource.grades.map((grade) => (
                      <span
                        key={`${resource.title}-${grade}`}
                        className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold"
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="mt-10 text-center text-sm text-slate-500">
            All resources are free and from trusted educational organizations.
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
