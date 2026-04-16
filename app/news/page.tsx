"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SocialFeed from "@/components/news/SocialFeed"
import Link from "next/link"
import { Mic, Clock, User as UserIcon, Search, Newspaper, FileText, Tag, Calendar, HelpCircle } from "lucide-react"
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
  createdAt: string
}

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  category: string | null
  quiz: string | null
  createdAt: string
}

export default function NewsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [activeSection, setActiveSection] = useState<"all" | "blogs" | "podcasts">("all")

  useEffect(() => {
    Promise.all([
      fetch("/api/podcasts").then((r) => r.json()).catch(() => ({ podcasts: [] })),
      fetch("/api/blogs").then((r) => r.json()).catch(() => ({ posts: [] })),
    ]).then(([podData, blogData]) => {
      setPodcasts(podData.podcasts || [])
      setBlogs(blogData.posts || [])
    }).finally(() => setLoading(false))
  }, [])

  const filteredPodcasts = useMemo(() => {
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

  const filteredBlogs = useMemo(() => {
    if (!query.trim()) return blogs
    const q = query.toLowerCase()
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q)
    )
  }, [blogs, query])

  const showBlogs = activeSection === "all" || activeSection === "blogs"
  const showPodcasts = activeSection === "all" || activeSection === "podcasts"

  return (
    <main>
      <Navigation />

      {/* Hero */}
      <section className="px-4 py-20 sm:py-28 bg-gradient-to-br from-[#002d24] via-[#003d30] to-[#001a14] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168d6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-200 text-sm font-medium">News & Events</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            News & Events
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Stay updated with the latest news, blog posts, and podcasts from the Pamavambo community
          </p>
        </div>
      </section>

      {/* Social Media Feed */}
      <SocialFeed />

      {/* Blog & Podcast Content */}
      <section className="px-4 py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl">

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs and podcasts..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition"
              />
            </div>
            <div className="flex gap-1 bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
              {(["all", "blogs", "podcasts"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                    activeSection === tab
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Section */}
          {showBlogs && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Latest Blog Posts</h2>
                    <p className="text-slate-500 text-sm">Read, learn, and test your knowledge</p>
                  </div>
                </div>
                {filteredBlogs.length > 0 && (
                  <Link href="/news" className="text-emerald-600 font-semibold text-sm hover:underline hidden sm:inline-flex items-center gap-1">
                    View All →
                  </Link>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-[1.8rem] border border-slate-100 bg-white p-3 animate-pulse shadow-xl shadow-slate-200/40">
                      <div className="h-48 rounded-2xl bg-slate-100 mb-4" />
                      <div className="px-3 space-y-3">
                        <div className="h-4 bg-slate-100 rounded w-1/4" />
                        <div className="h-5 bg-slate-100 rounded w-3/4" />
                        <div className="h-4 bg-slate-100 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                  <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">
                    {query ? "No blog posts match your search" : "No blog posts available yet"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => {
                    let quizCount = 0
                    if (blog.quiz) {
                      try { quizCount = JSON.parse(blog.quiz).length } catch {}
                    }
                    return (
                      <Link key={blog.id} href={`/news/${blog.slug}`}>
                        <div className="bg-white group rounded-[1.8rem] shadow-xl shadow-slate-200/40 p-3 border border-slate-50 h-full hover:shadow-2xl transition-shadow duration-300">
                          {/* Cover Image */}
                          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-emerald-50 to-teal-50">
                            <img
                              src={blog.coverImage || "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Category + Quiz Badge */}
                          <div className="flex items-center gap-2 mb-3 px-1">
                            {blog.category && (
                              <span className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-all duration-300 text-emerald-600 px-3 py-1.5 rounded-lg text-sm font-bold inline-block">
                                {blog.category}
                              </span>
                            )}
                            {quizCount > 0 && (
                              <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1">
                                <HelpCircle className="w-3 h-3" /> {quizCount} Questions
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className="text-xl px-3 font-bold text-slate-800 mb-2 leading-snug line-clamp-2">
                            {blog.title}
                          </h4>

                          {/* Excerpt */}
                          {blog.excerpt && (
                            <p className="text-sm text-slate-500 px-3 mb-4 line-clamp-2">
                              {blog.excerpt}
                            </p>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between px-3 pb-3 pt-3 border-t border-slate-50 text-sm">
                            <span className="text-slate-400 text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-emerald-600 font-semibold text-sm group-hover:underline">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Podcasts Section */}
          {showPodcasts && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Latest Podcasts</h2>
                    <p className="text-slate-500 text-sm">Listen to inspiring conversations and stories</p>
                  </div>
                </div>
                <Link href="/podcasts" className="text-purple-600 font-semibold text-sm hover:underline hidden sm:inline-flex items-center gap-1">
                  Go to Podcasts →
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-[1.8rem] border border-slate-100 bg-white p-3 animate-pulse shadow-xl shadow-slate-200/40">
                      <div className="h-48 rounded-2xl bg-slate-100 mb-4" />
                      <div className="px-3 space-y-3">
                        <div className="h-4 bg-slate-100 rounded w-1/4" />
                        <div className="h-5 bg-slate-100 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPodcasts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                  <Mic className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">
                    {query ? "No podcasts match your search" : "No podcasts available yet"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPodcasts.slice(0, 6).map((podcast) => (
                      <Link key={podcast.id} href={`/podcasts/${podcast.slug}`}>
                        <div className="bg-white group rounded-[1.8rem] shadow-xl shadow-slate-200/40 p-3 border border-slate-50 h-full hover:shadow-2xl transition-shadow duration-300">
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
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                <svg className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {podcast.category && (
                            <span className="bg-purple-50 hover:bg-purple-500 hover:text-white transition-all duration-300 text-purple-600 px-3 py-1.5 rounded-lg text-sm font-bold mb-4 inline-block">
                              {podcast.category}
                            </span>
                          )}

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

                          <h4 className="text-xl px-3 font-bold text-slate-800 mb-3 leading-snug line-clamp-2">
                            {podcast.title}
                          </h4>

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

                  <div className="text-center mt-12">
                    <Link
                      href="/podcasts"
                      className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
                    >
                      View All Podcasts →
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
