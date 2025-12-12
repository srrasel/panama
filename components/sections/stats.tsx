"use client"

export default function Stats() {
  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "150+", label: "Expert Courses" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "50+", label: "Expert Instructors" },
  ]

  return (
    <section className="px-4 py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <p className="text-foreground/60 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
