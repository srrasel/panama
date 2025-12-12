import type React from "react"

export default function LeadershipSection(): React.ReactElement {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-stone-50 rounded-br-full -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Headmaster"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-900 rounded-lg flex items-center justify-center text-white shadow-xl hidden md:flex">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-amber-600 font-bold tracking-wide uppercase text-sm mb-3">Leadership</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-6">Welcome from the Administration</h3>
            <div className="prose prose-lg text-stone-600 mb-8">
              <p className="mb-4">
                "Welcome to Thornhill High School, where excellence meets opportunity. Our institution has been a cornerstone of academic achievement and character development in Gweru for generations."
              </p>
              <p>
                "At Thornhill, we combine rigorous academic standards with a supportive community environment, preparing students to become confident, compassionate leaders of tomorrow."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-brand-900"></div>
              <div>
                <p className="font-bold text-stone-900 text-lg">Thornhill High School Administration</p>
                <p className="text-stone-500 text-sm">Leadership Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
