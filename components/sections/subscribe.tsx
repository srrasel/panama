export default function Subscribe() {
  return (
    <section className="py-32 bg-brand-900 relative overflow-hidden reveal-on-scroll is-visible">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center bg-no-repeat opacity-40"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Begin Your Journey Today</h2>
        <p className="text-white text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Admissions for the 2025 academic year are now open. Discover all that Panama School has to offer.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#" className="px-8 py-4 bg-white text-brand-900 font-bold rounded-lg hover:bg-stone-100 transition-colors shadow-lg">
            Apply Online
          </a>
          <a href="#" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
            Download Prospectus
          </a>
        </div>
      </div>
    </section>
  )
}
