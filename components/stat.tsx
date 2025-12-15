export default function Stat() {
  return (
    <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll is-visible">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-brand-900 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300">
          <span className="text-4xl font-bold text-stone-900 mb-2">1,200+</span>
          <span className="text-stone-500 font-medium uppercase text-xs tracking-wider">Students Enrolled</span>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-amber-600 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300">
          <span className="text-4xl font-bold text-stone-900 mb-2">100%</span>
          <span className="text-stone-500 font-medium uppercase text-xs tracking-wider">University Acceptance</span>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-brand-900 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300">
          <span className="text-4xl font-bold text-stone-900 mb-2">25+</span>
          <span className="text-stone-500 font-medium uppercase text-xs tracking-wider">Sports &amp; Clubs</span>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-amber-600 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300">
          <span className="text-4xl font-bold text-stone-900 mb-2">15:1</span>
          <span className="text-stone-500 font-medium uppercase text-xs tracking-wider">Student-Teacher Ratio</span>
        </div>
      </div>
    </section>
  )
}
