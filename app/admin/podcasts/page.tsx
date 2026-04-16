"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Search, Mic, ExternalLink } from "lucide-react"

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

export default function AdminPodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Podcast | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    coverImage: "",
    audioUrl: "",
    iframeEmbed: "",
    duration: "",
    host: "",
    category: "",
    status: "Draft",
  })

  const fetchPodcasts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/podcasts?all=true&q=${encodeURIComponent(search)}`)
      const data = await res.json()
      setPodcasts(data.podcasts || [])
    } catch {
      setPodcasts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [search])

  const resetForm = () => {
    setForm({ title: "", description: "", coverImage: "", audioUrl: "", iframeEmbed: "", duration: "", host: "", category: "", status: "Draft" })
    setEditing(null)
    setShowForm(false)
  }

  const openEdit = (p: Podcast) => {
    setForm({
      title: p.title,
      description: p.description || "",
      coverImage: p.coverImage || "",
      audioUrl: p.audioUrl || "",
      iframeEmbed: p.iframeEmbed || "",
      duration: p.duration || "",
      host: p.host || "",
      category: p.category || "",
      status: p.status,
    })
    setEditing(p)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)

    try {
      if (editing) {
        await fetch(`/api/podcasts/${editing.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      } else {
        await fetch("/api/podcasts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      }
      resetForm()
      fetchPodcasts()
    } catch (err) {
      console.error("Failed to save podcast:", err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this podcast?")) return
    try {
      await fetch(`/api/podcasts/${slug}`, { method: "DELETE" })
      fetchPodcasts()
    } catch (err) {
      console.error("Failed to delete podcast:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Podcast Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage podcast episodes</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Podcast
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search podcasts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 text-foreground">
              {editing ? "Edit Podcast" : "Add New Podcast"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  placeholder="Episode title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground resize-none"
                  placeholder="Podcast description"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Host</label>
                  <input
                    type="text"
                    value={form.host}
                    onChange={(e) => setForm({ ...form, host: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    placeholder="Host name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    placeholder="e.g. Education, Technology"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    placeholder="e.g. 45:30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Audio File URL</label>
                <input
                  type="url"
                  value={form.audioUrl}
                  onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  placeholder="https://example.com/episode.mp3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Iframe Embed Code <span className="text-muted-foreground font-normal">(Spotify, SoundCloud, etc.)</span>
                </label>
                <textarea
                  value={form.iframeEmbed}
                  onChange={(e) => setForm({ ...form, iframeEmbed: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground resize-none font-mono text-sm"
                  placeholder='<iframe src="https://open.spotify.com/embed/..." ...></iframe>'
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste the embed code from Spotify, SoundCloud, Apple Podcasts, or any platform
                </p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : editing ? "Update Podcast" : "Create Podcast"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Podcast List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : podcasts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <Mic className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No podcasts yet</h3>
          <p className="text-muted-foreground text-sm mt-1">Create your first podcast episode to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {podcasts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition">
              {/* Cover */}
              <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                {p.coverImage ? (
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Mic className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{p.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.status === "Published"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {p.status}
                  </span>
                </div>
                {p.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1">{p.description}</p>
                )}
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  {p.host && <span>Host: {p.host}</span>}
                  {p.category && <span>Category: {p.category}</span>}
                  {p.duration && <span>Duration: {p.duration}</span>}
                  {p.iframeEmbed && (
                    <span className="flex items-center gap-1 text-blue-500">
                      <ExternalLink className="w-3 h-3" /> Embed
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
