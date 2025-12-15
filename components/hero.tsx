import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundAttachment: "scroll",
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center grayscale mix-blend-multiply opacity-75"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            Excellence Through Knowledge • Per Spinas Ad Culmina
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Academic Excellence, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">Nurturing Minds.</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-200 mb-10 leading-relaxed max-w-2xl font-light">
            Welcome to Panama School, where excellence meets opportunity and we prepare students to become confident, compassionate leaders of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#tours"
              className="px-8 py-4 bg-brand-900 text-white text-lg font-semibold rounded-lg hover:bg-brand-800 transition-all shadow-xl hover:shadow-brand-900/30 flex items-center justify-center gap-2 group"
            >
              Book a Virtual Tour
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#academics"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
