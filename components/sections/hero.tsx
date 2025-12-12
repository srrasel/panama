"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
              Learn at Your Own Pace
            </h1>
            <p className="mt-6 text-lg text-foreground/60 text-balance">
              Access world-class education from industry experts. Transform your skills with our comprehensive learning
              platform designed for modern professionals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
              >
                Explore Courses
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-foreground/20 text-foreground font-semibold rounded-lg hover:bg-foreground/5 transition">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground/20">+10K</div>
                <p className="text-foreground/40 mt-2">Active Learners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
