"use client"

import Navbar from "@/components/Navbar"
import SecondHero from "@/components/common/SecondHero"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, FileText, Calendar, Tag, CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { useEffect, useState, use } from "react"

type QuizQuestion = {
  question: string
  options: string[]
  answer: number
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
  createdAt: string
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found")
        return r.json()
      })
      .then((data) => {
        setPost(data.post)
        if (data.post?.quiz) {
          try {
            setQuizQuestions(JSON.parse(data.post.quiz))
          } catch {}
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const selectAnswer = (qIdx: number, oIdx: number) => {
    if (submitted) return
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx })
  }

  const handleSubmitQuiz = () => {
    setSubmitted(true)
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setSubmitted(false)
  }

  const score = submitted
    ? quizQuestions.reduce((acc, q, idx) => acc + (selectedAnswers[idx] === q.answer ? 1 : 0), 0)
    : 0

  // Render content with basic formatting
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim()
      if (!trimmed) return null

      // Heading
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold text-slate-800 mt-10 mb-4">
            {trimmed.replace(/^## /, "")}
          </h2>
        )
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-3">
            {trimmed.replace(/^### /, "")}
          </h3>
        )
      }

      // Emoji heading (like 🔍 Word Watch)
      if (/^[^\w\s]/.test(trimmed) && trimmed.length < 200 && !trimmed.includes("\n")) {
        return (
          <h3 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-3">
            {trimmed}
          </h3>
        )
      }

      // List items
      if (trimmed.includes("\n") && trimmed.split("\n").every(l => /^[-•]/.test(l.trim()) || l.trim() === "")) {
        return (
          <ul key={i} className="list-disc list-inside space-y-1 text-slate-600 leading-relaxed my-4 pl-2">
            {trimmed.split("\n").filter(l => l.trim()).map((line, j) => (
              <li key={j}>{line.replace(/^[-•]\s*/, "")}</li>
            ))}
          </ul>
        )
      }

      // Regular paragraph
      return (
        <p key={i} className="text-slate-600 leading-relaxed mb-4 text-[17px]">
          {trimmed}
        </p>
      )
    })
  }

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-6 w-full max-w-3xl px-4">
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (notFound || !post) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <FileText className="w-20 h-20 text-slate-300 mb-4" />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Post Not Found</h1>
          <p className="text-slate-500 mb-6">This blog post may have been removed or doesn&apos;t exist.</p>
          <Link href="/news" className="text-emerald-600 font-semibold hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <SecondHero
        title={post.title}
        subtitle={post.category ? `${post.category} • ${new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : undefined}
        backgroundImage={post.coverImage || "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
        ]}
      />

      {/* Content */}
      <section className="px-4 py-12 sm:py-16">
        <article className="mx-auto max-w-3xl">
          {renderContent(post.content)}
        </article>
      </section>

      {/* Quiz Section */}
      {quizQuestions.length > 0 && (
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-3xl">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Quiz Time!</h2>
                  <p className="text-slate-500 text-sm">Test your knowledge after reading</p>
                </div>
              </div>

              {/* Score banner */}
              {submitted && (
                <div className={`mb-6 p-4 rounded-xl text-center font-semibold ${
                  score === quizQuestions.length
                    ? "bg-emerald-100 text-emerald-800"
                    : score >= quizQuestions.length / 2
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  You scored {score} out of {quizQuestions.length}!
                  {score === quizQuestions.length && " 🎉 Perfect!"}
                </div>
              )}

              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-3">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[qIdx] === oIdx
                        const isCorrect = q.answer === oIdx
                        let optionClass = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                        if (submitted) {
                          if (isCorrect) {
                            optionClass = "border-emerald-400 bg-emerald-50"
                          } else if (isSelected && !isCorrect) {
                            optionClass = "border-red-400 bg-red-50"
                          } else {
                            optionClass = "border-slate-200 opacity-60"
                          }
                        } else if (isSelected) {
                          optionClass = "border-indigo-500 bg-indigo-50"
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => selectAnswer(qIdx, oIdx)}
                            disabled={submitted}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 flex items-center gap-3 transition text-sm ${optionClass}`}
                          >
                            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                              isSelected && !submitted
                                ? "border-indigo-500 bg-indigo-500 text-white"
                                : submitted && isCorrect
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : submitted && isSelected && !isCorrect
                                ? "border-red-500 bg-red-500 text-white"
                                : "border-slate-300 text-slate-400"
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1 text-slate-700">{opt}</span>
                            {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                            {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quiz Actions */}
              <div className="mt-6 flex gap-3 justify-center">
                {!submitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                    className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
