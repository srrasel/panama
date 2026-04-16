"use client"

import { useState, useEffect, useRef } from "react"
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  File as FileIcon, 
  Download, 
  Trash2, 
  BookOpen,
  Clock,
  Plus, 
  Search,
  Filter,
  X,
  Upload
} from "lucide-react"
import { toast } from "sonner"
import Preloader from "@/components/preloader"

export default function LibraryView({ currentUserRole }: { currentUserRole?: string }) {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<any[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"resources" | "articles">("resources")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isArticleOpen, setIsArticleOpen] = useState(false)
  const [isPostingArticle, setIsPostingArticle] = useState(false)
  const [articleTitle, setArticleTitle] = useState("")
  const [articleSummary, setArticleSummary] = useState("")
  const [articleContent, setArticleContent] = useState("")
  const [articleAccess, setArticleAccess] = useState("all")
  const [readingArticle, setReadingArticle] = useState<any | null>(null)
  const [isReadingArticle, setIsReadingArticle] = useState(false)
  
  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDesc, setUploadDesc] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadAccess, setUploadAccess] = useState("all")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canUpload = ["admin", "teacher"].includes(currentUserRole || "")

  const fetchResources = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/library")
      if (res.ok) {
        const data = await res.json().catch(() => null)
        setResources(Array.isArray(data) ? data : [])
      } else {
        console.error("Failed to fetch resources")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchArticles = async () => {
    try {
      setArticlesLoading(true)
      const res = await fetch("/api/library/articles")
      if (res.ok) {
        const data = await res.json().catch(() => null)
        setArticles(Array.isArray(data) ? data : [])
      } else {
        console.error("Failed to fetch articles")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setArticlesLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
    fetchArticles()
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadFile || !uploadTitle) {
      toast.error("Please provide a title and select a file")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", uploadFile)
    formData.append("title", uploadTitle)
    formData.append("description", uploadDesc)
    formData.append("accessLevel", uploadAccess)

    try {
      const res = await fetch("/api/library", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        toast.success("File uploaded successfully")
        setIsUploadOpen(false)
        setUploadTitle("")
        setUploadDesc("")
        setUploadFile(null)
        setUploadAccess("all")
        fetchResources()
      } else {
        const data = await res.json()
        toast.error(data.error || "Upload failed")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      const res = await fetch(`/api/library/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        toast.success("File deleted")
        setResources(resources.filter(r => r.id !== id))
      } else {
        const data = await res.json()
        toast.error(data.error || "Delete failed")
      }
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  const estimateReadingTimeMinutes = (content: string) => {
    const text = content.replace(/\s+/g, " ").trim()
    const words = text ? text.split(" ").length : 0
    return Math.max(1, Math.ceil(words / 200))
  }

  const handlePostArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!articleTitle.trim() || !articleContent.trim()) {
      toast.error("Please provide a title and content")
      return
    }

    setIsPostingArticle(true)
    try {
      const res = await fetch("/api/library/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: articleTitle,
          summary: articleSummary,
          content: articleContent,
          accessLevel: articleAccess,
        }),
      })

      const data = await res.json().catch(() => null)
      if (res.ok) {
        toast.success("Article posted")
        setIsArticleOpen(false)
        setArticleTitle("")
        setArticleSummary("")
        setArticleContent("")
        setArticleAccess("all")
        fetchArticles()
      } else {
        toast.error(data?.error || "Failed to post article")
      }
    } catch (error) {
      toast.error("Failed to post article")
    } finally {
      setIsPostingArticle(false)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const res = await fetch(`/api/library/articles/${id}`, { method: "DELETE" })
      const data = await res.json().catch(() => null)
      if (res.ok) {
        toast.success("Article deleted")
        setArticles(articles.filter(a => a.id !== id))
      } else {
        toast.error(data?.error || "Delete failed")
      }
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  const openArticle = async (id: string) => {
    setIsReadingArticle(true)
    try {
      const res = await fetch(`/api/library/articles/${id}`)
      const data = await res.json().catch(() => null)
      if (res.ok) {
        setReadingArticle(data)
      } else {
        toast.error(data?.error || "Failed to load article")
        setReadingArticle(null)
      }
    } catch (error) {
      toast.error("Failed to load article")
      setReadingArticle(null)
    } finally {
      setIsReadingArticle(false)
    }
  }

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false

    if (activeTab === "all") return true
    if (activeTab === "pdf") return r.fileType === "PDF"
    if (activeTab === "image") return r.fileType === "Image"
    if (activeTab === "video") return r.fileType === "Video"
    return true
  })

  const filteredArticles = articles.filter(a => {
    const title = typeof a?.title === "string" ? a.title : ""
    const summary = typeof a?.summary === "string" ? a.summary : ""
    const q = searchQuery.toLowerCase()
    return title.toLowerCase().includes(q) || summary.toLowerCase().includes(q)
  })

  const getIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="h-8 w-8 text-blue-700" />
      case "Image": return <ImageIcon className="h-8 w-8 text-blue-500" />
      case "Video": return <Video className="h-8 w-8 text-purple-500" />
      default: return <FileIcon className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Digital Library</h1>
          <p className="text-muted-foreground">Access learning resources and materials</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="inline-flex items-center bg-muted rounded-full p-1 w-fit">
            <button
              type="button"
              onClick={() => setViewMode("resources")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                viewMode === "resources"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Resources
            </button>
            <button
              type="button"
              onClick={() => setViewMode("articles")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                viewMode === "articles"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Articles
            </button>
          </div>

          {canUpload && viewMode === "resources" && (
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Upload className="h-4 w-4" />
              Upload Resource
            </button>
          )}

          {canUpload && viewMode === "articles" && (
            <button
              onClick={() => setIsArticleOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <BookOpen className="h-4 w-4" />
              Post Article
            </button>
          )}
        </div>
      </div>

      {viewMode === "resources" ? (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border border-border">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["all", "pdf", "image", "video"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{filteredArticles.length} articles</span>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      )}

      {viewMode === "resources" ? (
        loading ? (
          <Preloader />
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border">
            <FileIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium text-foreground">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="group bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-muted/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {getIcon(resource.fileType)}
                  </div>
                  {canUpload && (
                    <button 
                      onClick={() => handleDelete(resource.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <h3 className="font-semibold text-foreground line-clamp-1 mb-1" title={resource.title}>{resource.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">{resource.description || "No description"}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    <span className="block font-medium text-foreground/80">{resource.uploadedBy?.name || "Unknown"}</span>
                    <span suppressHydrationWarning>{new Date(resource.createdAt).toLocaleDateString()}</span>
                  </div>
                  <a 
                    href={resource.fileUrl} 
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      ) : articlesLoading ? (
        <Preloader />
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-medium text-foreground">No articles found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => openArticle(article.id)}
              className="group bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openArticle(article.id)
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{article.readingTimeMinutes || 1} min</span>
                  </div>
                </div>

                {canUpload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteArticle(article.id)
                    }}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">{article.summary || "No summary"}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  <span className="block font-medium text-foreground/80">{article.author?.name || "Unknown"}</span>
                  <span suppressHydrationWarning>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Read</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold">Upload Resource</h2>
              <button onClick={() => setIsUploadOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input"
                  placeholder="e.g., Mathematics Syllabus 2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input min-h-[80px]"
                  placeholder="Brief description of the resource..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Access Level</label>
                <select
                  value={uploadAccess}
                  onChange={(e) => setUploadAccess(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input"
                >
                  <option value="all">Everyone (Public)</option>
                  <option value="student">Students Only</option>
                  <option value="parent">Parents Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">File</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {uploadFile ? (
                    <div className="flex items-center justify-center gap-2 text-primary font-medium">
                      <FileIcon className="h-5 w-5" />
                      {uploadFile.name}
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Click to select a file</p>
                      <p className="text-xs mt-1">PDF, Images, Videos supported</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload File"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isArticleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold">Post Article</h2>
              <button onClick={() => setIsArticleOpen(false)} className="text-muted-foreground hover:text-foreground" type="button">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePostArticle} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  required
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input"
                  placeholder="e.g., How to Prepare for Exams"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <input
                  value={articleSummary}
                  onChange={(e) => setArticleSummary(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input"
                  placeholder="Short summary shown in the list"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Access Level</label>
                  <select
                    value={articleAccess}
                    onChange={(e) => setArticleAccess(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input"
                  >
                    <option value="all">Everyone (Public)</option>
                    <option value="student">Students Only</option>
                    <option value="parent">Parents Only</option>
                  </select>
                </div>
                <div className="flex items-end text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{estimateReadingTimeMinutes(articleContent)} min read</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  required
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input min-h-[220px]"
                  placeholder="Write the article content here..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsArticleOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPostingArticle}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isPostingArticle ? "Posting..." : "Post Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(isReadingArticle || readingArticle) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl w-full max-w-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">{readingArticle?.title || "Loading..."}</h2>
                {readingArticle && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {readingArticle.readingTimeMinutes || 1} min read
                    </span>
                    <span>{readingArticle.author?.name || "Unknown"}</span>
                    <span suppressHydrationWarning>{new Date(readingArticle.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="text-muted-foreground hover:text-foreground"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {isReadingArticle && !readingArticle ? (
                <Preloader />
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                  {readingArticle?.content || ""}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
