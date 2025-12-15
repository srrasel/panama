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
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" alt="Graduation Ceremony" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                <img src="https://images.unsplash.com/photo-1596997000103-e597b3ca50df?q=80&amp;w=1074&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="School Playground" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <span className="text-brand-900 text-xs font-bold uppercase">Sports</span>
                <h4 className="text-lg font-bold text-stone-900 leading-tight mb-2 group-hover:text-brand-900 transition-colors">Rugby First XV Advances to Finals</h4>
                <span className="text-stone-500 text-sm">Nov 28, 2024</span>
              </div>
            </div>

            <div className="flex gap-4 group reveal-on-scroll is-visible" style={{ transitionDelay: "200ms" }}>
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80" alt="Science Laboratory" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <span className="text-brand-900 text-xs font-bold uppercase">Science</span>
                <h4 className="text-lg font-bold text-stone-900 leading-tight mb-2 group-hover:text-brand-900 transition-colors">New STEM Laboratory Opening Ceremony</h4>
                <span className="text-stone-500 text-sm">Nov 15, 2024</span>
              </div>
            </div>

            <div className="flex gap-4 group reveal-on-scroll is-visible" style={{ transitionDelay: "300ms" }}>
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=150&amp;q=80" alt="Art Exhibition" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
