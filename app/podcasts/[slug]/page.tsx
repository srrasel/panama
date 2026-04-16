"use client"

import Navbar from "@/components/Navbar"
import SecondHero from "@/components/common/SecondHero"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Mic, Clock, User as UserIcon, Calendar } from "lucide-react"
import { useEffect, useState, use } from "react"
import DOMPurify from "dompurify"

type Podcast = {
  id: string
  title: string
  slug: string
  description: string | null
  coverImage: string | null
  audioUrl: string | null
  iframeEmbed: string | null
  duration: string | null
  host: string | null
  category: string | null
  status: string
  createdAt: string
}

function sanitizeIframe(html: string): string {
  if (typeof window === "undefined") return ""
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["iframe"],
    ALLOWED_ATTR: ["src", "width", "height", "frameborder", "allow", "allowfullscreen", "style", "title", "loading"],
  })
}

export default function PodcastPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/podcasts/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found")
        return r.json()
      })
      .then((data) => setPodcast(data.podcast))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-6 w-full max-w-3xl px-4">
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
            <div className="h-16 bg-slate-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (notFound || !podcast) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <Mic className="w-20 h-20 text-slate-300 mb-4" />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Podcast Not Found</h1>
          <p className="text-slate-500 mb-6">This episode may have been removed or doesn&apos;t exist.</p>
          <Link href="/podcasts" className="text-purple-600 font-semibold hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Podcasts
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      {/* Hero Header */}
      <SecondHero
        title={podcast.title}
        subtitle={[podcast.host, podcast.duration, podcast.category].filter(Boolean).join(" • ")}
        backgroundImage={podcast.coverImage || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Podcasts", href: "/podcasts" },
        ]}
      />

      {/* Player Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Audio Player */}
          {podcast.audioUrl && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 text-purple-500" /> Audio Player
              </h2>
              <audio controls className="w-full" preload="metadata">
                <source src={podcast.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Iframe Embed */}
          {podcast.iframeEmbed && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Embedded Player</h2>
              <div
                className="w-full [&>iframe]:w-full [&>iframe]:rounded-xl [&>iframe]:min-h-[160px]"
                dangerouslySetInnerHTML={{ __html: sanitizeIframe(podcast.iframeEmbed) }}
              />
            </div>
          )}

          {/* No player available */}
          {!podcast.audioUrl && !podcast.iframeEmbed && (
            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
              <Mic className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">No audio player available for this episode yet.</p>
            </div>
          )}

          {/* Description */}
          {podcast.description && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">About This Episode</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{podcast.description}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
