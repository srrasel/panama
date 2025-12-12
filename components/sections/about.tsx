import type React from "react"

export default function AboutSection(): React.ReactElement {
  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-600 font-bold tracking-wide uppercase text-sm mb-3">Why Choose Thornhill</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Academic Excellence &amp; Character Development</h3>
          <p className="text-stone-600 text-lg leading-relaxed">
            We believe in an education style that challenges the mind while nurturing the spirit. Our curriculum is designed to create well-rounded individuals ready for the challenges of the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-900/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <div className="w-14 h-14 bg-brand-900/10 rounded-xl flex items-center justify-center text-brand-900 mb-6 group-hover:bg-brand-900 group-hover:text-white transition-colors">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mb-3">Cambridge Curriculum</h4>
            <p className="text-stone-600 mb-6 line-clamp-3">
              We follow the prestigious Cambridge International curriculum, recognized worldwide for its academic rigor and comprehensive approach to education.
            </p>
            <a href="#" className="text-brand-900 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Learn More <span aria-hidden="true">→</span>
            </a>
          </div>

          <div
            className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative overflow-hidden"
            style={{ transitionDelay: "100ms" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <div className="w-14 h-14 bg-amber-600/10 rounded-xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mb-3">Serene Campus</h4>
            <p className="text-stone-600 mb-6 line-clamp-3">
              Located in a tranquil environment perfect for focus, our campus boasts state-of-the-art labs, sports fields, and modern boarding facilities.
            </p>
            <a href="#" className="text-amber-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Explore Campus <span aria-hidden="true">→</span>
            </a>
          </div>

          <div
            className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative overflow-hidden"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-900/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
            <div className="w-14 h-14 bg-brand-900/10 rounded-xl flex items-center justify-center text-brand-900 mb-6 group-hover:bg-brand-900 group-hover:text-white transition-colors">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mb-3">Holistic Growth</h4>
            <p className="text-stone-600 mb-6 line-clamp-3">
              Beyond grades, we cultivate character. Our leadership programs, arts, and athletics ensure every student finds their unique passion.
            </p>
            <a href="#" className="text-brand-900 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View Activities <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
