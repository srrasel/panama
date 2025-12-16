'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomeHero() {
  const slides = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${index === i ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-stone-900/50" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-left mt-5">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            Excellence Through Knowledge • Per Spinas Ad Culmina
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            Academic Excellence, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">Nurturing Minds.</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-200 mb-6 leading-relaxed max-w-2xl font-light">
            Welcome to Panama School, where excellence meets opportunity and we prepare students to become confident, compassionate leaders of tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-start mb-16">
            <Link
              href="/admission"
              className="px-8 py-4 bg-brand-900 text-white text-lg font-semibold rounded-lg hover:bg-brand-800 transition-all shadow-xl hover:shadow-brand-900/30 flex items-center justify-center gap-2 group w-[300px]"
            >
              Book Admission
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/academic"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center w-[300px]"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition"
        aria-label="Previous slide"
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition"
        aria-label="Next slide"
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${index === i ? "bg-white" : "bg-white/50"} transition`}
          />
        ))}
      </div>
    </section>
  )
}
