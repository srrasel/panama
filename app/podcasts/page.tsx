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

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

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

      <Footer />
    </main>
  )
}
