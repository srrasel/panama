import type React from "react"

export default function BlogSection(): React.ReactElement {
  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 reveal-on-scroll is-visible">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Latest Updates</h2>
            <div className="h-1 w-20 bg-brand-900 mt-4 rounded-full"></div>
          </div>
          <a href="#" className="hidden sm:inline-block text-stone-500 hover:text-brand-900 font-medium transition-colors">View all news</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 group relative h-96 rounded-2xl overflow-hidden shadow-lg reveal-on-scroll is-visible">
            <div className="w-full h-full bg-stone-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              <svg className="w-32 h-32 text-stone-700 group-hover:text-amber-500 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"></path>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold uppercase rounded mb-3">Achievement</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Class of 2024 Achieves Record Pass Rates</h3>
              <p className="text-stone-300 mb-4 line-clamp-2">Our students have once again demonstrated excellence with a 98% pass rate in national examinations.</p>
              <span className="text-white/80 text-sm font-medium">Dec 12, 2024</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4 group reveal-on-scroll is-visible" style={{ transitionDelay: "100ms" }}>
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-stone-100 flex items-center justify-center group-hover:bg-brand-50 transition-colors duration-500">
                  <svg className="w-10 h-10 text-stone-400 group-hover:text-brand-900 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.6 20L9.6 18L14.4 18L14.4 20L9.6 20ZM5 5L19 5L19 13C19 14.7 18.5 16.2 17.5 17.4C16.6 18.5 15.3 19.3 13.7 19.6C16.1 19 18 17 19.4 14.3C20.6 11.6 21.2 8.4 21.2 5L21.2 3L2.8 3L2.8 5C2.8 8.4 3.4 11.6 4.6 14.3C6 17 7.9 19 10.3 19.6C8.7 19.3 7.4 18.5 6.5 17.4C5.5 16.2 5 14.7 5 13L5 5Z"></path>
                    <rect x="8" y="7" width="8" height="2"></rect>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-brand-900 text-xs font-bold uppercase">Sports</span>
                <h4 className="text-lg font-bold text-stone-900 leading-tight mb-2 group-hover:text-brand-900 transition-colors">Rugby First XV Advances to Finals</h4>
                <span className="text-stone-500 text-sm">Nov 28, 2024</span>
              </div>
            </div>

            <div className="flex gap-4 group reveal-on-scroll is-visible" style={{ transitionDelay: "200ms" }}>
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-stone-100 flex items-center justify-center group-hover:bg-brand-50 transition-colors duration-500">
                  <svg className="w-10 h-10 text-stone-400 group-hover:text-brand-900 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7,2V4H8V18A4,4 0 0,0 12,22A4,4 0 0,0 16,18V4H17V2H7M11,16C10.4,16 10,15.6 10,15A1,1 0 0,1 11,14C11.6,14 12,14.4 12,15A1,1 0 0,1 11,16M13,12C12.4,12 12,11.6 12,11A1,1 0 0,1 13,10C13.6,10 14,10.4 14,11A1,1 0 0,1 13,12M14,7H10V4H14V7Z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-brand-900 text-xs font-bold uppercase">Science</span>
                <h4 className="text-lg font-bold text-stone-900 leading-tight mb-2 group-hover:text-brand-900 transition-colors">New STEM Laboratory Opening Ceremony</h4>
                <span className="text-stone-500 text-sm">Nov 15, 2024</span>
              </div>
            </div>

            <div className="flex gap-4 group reveal-on-scroll is-visible" style={{ transitionDelay: "300ms" }}>
              <div className="w-24 h-24 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400 shrink-0">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <span className="text-amber-600 text-xs font-bold uppercase">Events</span>
                <h4 className="text-lg font-bold text-stone-900 leading-tight mb-2 group-hover:text-brand-900 transition-colors">Annual Art Exhibition &amp; Showcase</h4>
                <span className="text-stone-500 text-sm">Upcoming • Jan 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
