import type React from "react"

export default function CampusSection(): React.ReactElement {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-900 font-bold tracking-wide uppercase text-sm mb-3">Campus Life</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">A Day at Thornhill High School</h3>
          <div className="h-1 w-20 bg-brand-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-brand-50 to-stone-100">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-64 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-brand-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-800 transition-colors">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-stone-900 font-bold text-xl mb-2 group-hover:text-white transition-colors">Our Campus</h4>
              <p className="text-stone-600 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                25-acre campus with modern facilities, green spaces, and state-of-the-art buildings designed for optimal learning and growth.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-stone-100" style={{ transitionDelay: "100ms" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-64 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-stone-900 font-bold text-xl mb-2 group-hover:text-white transition-colors">Modern Classrooms</h4>
              <p className="text-stone-600 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                Smart classrooms with interactive displays, comfortable seating, and technology-enabled learning environments.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-stone-100" style={{ transitionDelay: "200ms" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-64 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-stone-900 font-bold text-xl mb-2 group-hover:text-white transition-colors">Science Labs</h4>
              <p className="text-stone-600 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                Fully equipped laboratories for Physics, Chemistry, and Biology with advanced instruments for practical experiments.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-stone-100" style={{ transitionDelay: "300ms" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-64 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-stone-900 font-bold text-xl mb-2 group-hover:text-white transition-colors">Sports Facilities</h4>
              <p className="text-stone-600 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                Olympic-sized swimming pool, football field, basketball courts, tennis courts, and indoor sports complex.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-stone-100" style={{ transitionDelay: "400ms" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-64 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <h4 className="text-stone-900 font-bold text-xl mb-2 group-hover:text-white transition-colors">Library &amp; Resources</h4>
              <p className="text-stone-600 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                10,000+ books, digital resources, study zones, and research facilities with 24/7 access for students.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-stone-100" style={{ transitionDelay: "500ms" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-64 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0l1 16h8l1-16M10 9v6m4-6v6" />
                </svg>
              </div>
              <h4 className="text-stone-900 font-bold text-xl mb-2 group-hover:text-white transition-colors">Student Activities</h4>
              <p className="text-stone-600 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">
                25+ clubs, arts programs, music bands, drama society, and student government for holistic development.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12" style={{ transitionDelay: "600ms" }}>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-900 text-white font-semibold rounded-lg hover:bg-brand-800 transition-all shadow-lg hover:shadow-brand-900/20">
            View Full Gallery
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
