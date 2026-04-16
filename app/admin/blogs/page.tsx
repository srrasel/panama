"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Search, FileText, Eye } from "lucide-react"
import Link from "next/link"

type QuizQuestion = {
  question: string
  options: string[]
  answer: number // index of correct option
}

type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  category: string | null
  quiz: string | null
  status: string
  createdAt: string
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "content" | "quiz">("details")

  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    category: "",
    status: "Draft",
  })

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/blogs?all=true&q=${encodeURIComponent(search)}`)
      const data = await res.json()
      setPosts(data.posts || [])
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  const resetForm = () => {
    setForm({ title: "", content: "", excerpt: "", coverImage: "", category: "", status: "Draft" })
    setQuizQuestions([])
    setEditing(null)
    setShowForm(false)
    setActiveTab("details")
  }

  const openEdit = (p: BlogPost) => {
    setForm({
      title: p.title,
      content: p.content,
      excerpt: p.excerpt || "",
      coverImage: p.coverImage || "",
      category: p.category || "",
      status: p.status,
    })
    if (p.quiz) {
      try {
        setQuizQuestions(JSON.parse(p.quiz))
      } catch {
        setQuizQuestions([])
      }
    } else {
      setQuizQuestions([])
    }
    setEditing(p)
    setShowForm(true)
    setActiveTab("details")
  }

  const addQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: "", options: ["", "", "", ""], answer: 0 }])
  }

  const updateQuestion = (idx: number, field: string, value: any) => {
    const updated = [...quizQuestions]
    ;(updated[idx] as any)[field] = value
    setQuizQuestions(updated)
  }

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    const updated = [...quizQuestions]
    updated[qIdx].options[oIdx] = value
    setQuizQuestions(updated)
  }

  const removeQuestion = (idx: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) return
    setSaving(true)

    const quizJson = quizQuestions.length > 0 ? JSON.stringify(quizQuestions) : null

    try {
      if (editing) {
        await fetch(`/api/blogs/${editing.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, quiz: quizJson }),
        })
      } else {
        await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, quiz: quizJson }),
        })
      }
      resetForm()
      fetchPosts()
    } catch (err) {
      console.error("Failed to save blog post:", err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    try {
      await fetch(`/api/blogs/${slug}`, { method: "DELETE" })
      fetchPosts()
    } catch (err) {
      console.error("Failed to delete blog post:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage blog posts with quizzes</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editing ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              {/* Tabs */}
              <div className="flex gap-1 mt-4 bg-muted rounded-lg p-1">
                {(["details", "content", "quiz"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium capitalize transition ${
                      activeTab === tab
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "quiz" ? `Quiz (${quizQuestions.length})` : tab}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      placeholder="Blog post title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Excerpt / Summary</label>
                    <textarea
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground resize-none"
                      placeholder="Short summary for card display"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                      <input
                        type="text"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                        placeholder="e.g. History, Science"
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
                      placeholder="https://example.com/image.jpg"
                    />
                    {form.coverImage && (
                      <div className="mt-2 rounded-lg overflow-hidden h-32 bg-muted">
                        <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === "content" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Content *</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={20}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground resize-none font-mono text-sm leading-relaxed"
                    placeholder="Write your blog post content here. You can use paragraphs separated by blank lines."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate paragraphs with blank lines. Use headings with ## prefix.
                  </p>
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === "quiz" && (
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Add multiple-choice questions that readers can answer after reading the blog post.
                  </p>

                  {quizQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="border border-border rounded-xl p-4 space-y-3 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">Question {qIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIdx)}
                          className="text-destructive hover:text-destructive/80 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => updateQuestion(qIdx, "question", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                        placeholder="Enter question..."
                      />
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuestion(qIdx, "answer", oIdx)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                                q.answer === oIdx
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-border text-transparent hover:border-muted-foreground"
                              }`}
                            >
                              ✓
                            </button>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm"
                              placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Click the circle to mark the correct answer (green = correct)
                      </p>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary transition text-sm font-medium"
                  >
                    + Add Question
                  </button>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-border">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || !form.title.trim() || !form.content.trim()}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-24 h-20 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No blog posts yet</h3>
          <p className="text-muted-foreground text-sm mt-1">Create your first blog post to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => {
            let quizCount = 0
            if (p.quiz) {
              try { quizCount = JSON.parse(p.quiz).length } catch {}
            }
            return (
              <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition">
                {/* Cover */}
                <div className="w-24 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                  {p.coverImage ? (
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground" />
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
                  {p.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{p.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    {p.category && <span>Category: {p.category}</span>}
                    {quizCount > 0 && <span className="text-blue-500 font-medium">{quizCount} quiz questions</span>}
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/news/${p.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
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
            )
          })}
        </div>
      )}
    </div>
  )
}
