import type React from "react"

export default function AcademicSection(): React.ReactElement {
  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll is-visible">
          <h2 className="text-brand-900 font-bold tracking-wide uppercase text-sm mb-3">Academic Excellence</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Our Curriculum &amp; Programs</h3>
          <div className="h-1 w-20 bg-brand-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal-on-scroll is-visible">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
              <div className="w-16 h-16 bg-brand-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-stone-900 mb-4">Cambridge Curriculum</h4>
              <p className="text-stone-600 leading-relaxed mb-6">
                We follow the prestigious Cambridge International curriculum, recognized worldwide for its academic rigor and comprehensive approach to education. Our curriculum is designed to develop critical thinking, creativity, and problem-solving skills.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-stone-700">Internationally Recognized</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-stone-700">University Preparation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 reveal-on-scroll is-visible" style={{ transitionDelay: "200ms" }}>
            <div className="bg-gradient-to-br from-brand-900 to-brand-800 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Pass Rate</div>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-amber-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Subject Choices</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">15:1</div>
              <div className="text-sm opacity-90">Student-Teacher Ratio</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">University Placement</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-on-scroll is-visible" style={{ transitionDelay: "400ms" }}>
          <div className="group bg-stone-50 p-8 rounded-2xl border border-stone-200 hover:border-brand-300 transition-all duration-300">
            <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-200 transition-colors">
              <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Primary Program (Ages 5-11)</h4>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cambridge Primary Curriculum</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>English, Mathematics, Science</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Art, Music, Physical Education</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Project-Based Learning</span>
              </li>
            </ul>
          </div>

          <div className="group bg-stone-50 p-8 rounded-2xl border border-stone-200 hover:border-amber-300 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
              <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Secondary Program (Ages 11-16)</h4>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cambridge Lower Secondary</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Core Subjects + Electives</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Languages, Humanities, STEM</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Career Guidance &amp; Counseling</span>
              </li>
            </ul>
          </div>

          <div className="group bg-stone-50 p-8 rounded-2xl border border-stone-200 hover:border-blue-300 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Advanced Program (Ages 16-18)</h4>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cambridge International AS/A Levels</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>University-Level Courses</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Research &amp; Independent Study</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Leadership &amp; Community Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16 reveal-on-scroll is-visible" style={{ transitionDelay: "600ms" }}>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-900 text-white font-semibold rounded-lg hover:bg-brand-800 transition-all shadow-lg hover:shadow-brand-900/20">
            View Complete Curriculum Guide
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
