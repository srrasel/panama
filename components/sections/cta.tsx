"use client"

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:py-28 bg-primary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
          Ready to Transform Your Future?
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 text-balance">
          Join thousands of successful learners who've already started their journey with EduLMS
        </p>
        <button className="px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition text-lg">
          Get Started Today
        </button>
      </div>
    </section>
  )
}
