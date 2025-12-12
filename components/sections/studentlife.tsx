import type React from "react"

export default function StudentLifeSection(): React.ReactElement {
  return (
    <section id="student-life" className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal-on-scroll is-visible">
          <h2 className="text-brand-900 font-bold tracking-wide uppercase text-sm mb-3">Student Life</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Extracurricular Activities, Sports, and Clubs</h3>
          <p className="text-stone-600 max-w-3xl mx-auto">Beyond the classroom, students explore passions, build leadership, and form lifelong friendships through a vibrant co-curricular program.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="reveal-on-scroll is-visible">
            <div className="h-full bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-lg bg-brand-900 text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">Athletics &amp; Fitness</h4>
              <p className="text-stone-600">Competitive and recreational programs for all levels focusing on skill, teamwork, and well-being.</p>
            </div>
          </div>
          <div className="reveal-on-scroll is-visible" style={{ transitionDelay: "80ms" }}>
            <div className="h-full bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20h10" /></svg>
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">Clubs &amp; Societies</h4>
              <p className="text-stone-600">Academic, service, and special interest clubs that develop leadership and collaboration.</p>
            </div>
          </div>
          <div className="reveal-on-scroll is-visible" style={{ transitionDelay: "160ms" }}>
            <div className="h-full bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-2v13M3 10h6M3 15h6" /></svg>
              </div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">Arts &amp; Performance</h4>
              <p className="text-stone-600">Music, drama, and visual arts programs with showcases, concerts, and exhibitions year-round.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 reveal-on-scroll is-visible">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900">Sports Programs</h4>
            </div>
            <ul className="space-y-2 text-stone-700">
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Football, Rugby, Basketball</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Tennis, Volleyball, Athletics</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Swimming, Badminton, Table Tennis</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> CrossFit &amp; Fitness Club</li>
            </ul>
            <div className="mt-5"><a href="#" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:gap-3 transition-all">View Sports Schedule <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></a></div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 reveal-on-scroll is-visible" style={{ transitionDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20h10" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900">Clubs &amp; Societies</h4>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Debate &amp; Public Speaking</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Robotics &amp; Coding</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Environmental Club</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Model UN</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Entrepreneurship Club</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Community Service</li>
            </ul>
            <div className="mt-5"><a href="#" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all">Explore All Clubs <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></a></div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 reveal-on-scroll is-visible" style={{ transitionDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-2v13M3 10h6M3 15h6" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900">Arts &amp; Culture</h4>
            </div>
            <ul className="space-y-2 text-stone-700">
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Choir, Orchestra, Jazz Band</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Drama &amp; Theatre Productions</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Visual Arts &amp; Photography</li>
              <li className="flex items-start gap-2"><svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Cultural Day &amp; Showcases</li>
            </ul>
            <div className="mt-5"><a href="#" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all">See Upcoming Performances <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></a></div>
          </div>
        </div>

        <div className="text-center mt-12 reveal-on-scroll is-visible">
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-900 text-white font-semibold rounded-lg hover:bg-brand-800 transition-all shadow-lg hover:shadow-brand-900/20">
            Join a Club or Team
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
