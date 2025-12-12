"use client"

import { BookOpen, Users, Award, Clock } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Expert-Crafted Courses",
    description: "Learn from industry professionals with years of real-world experience",
  },
  {
    icon: Clock,
    title: "Learn on Your Schedule",
    description: "Access content anytime, anywhere. No rigid schedules or time constraints",
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn recognized certificates upon course completion",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with thousands of learners and get support when you need it",
  },
]

export default function Features() {
  return (
    <section className="px-4 py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Why Choose EduLMS</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-foreground/20 transition"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
