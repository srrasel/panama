import Link from "next/link"

export default function Overview() {
  return (
    <section id="schools" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 reveal-on-scroll is-visible">
          <div className="bg-navy-900 h-80 p-8 sm:p-10 flex flex-col justify-between items-start relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-3xl font-serif font-bold text-white uppercase leading-tight tracking-wide z-10">
              Panama<br />Boys
            </h3>
            <Link href="#" className="bg-brand-600 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-brand-700 transition-colors z-10">
              Learn More
            </Link>
          </div>

          <div className="bg-brand-600 h-80 p-8 sm:p-10 flex flex-col justify-between items-start relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-3xl font-serif font-bold text-white uppercase leading-tight tracking-wide z-10">
              Panama<br />Prep
            </h3>
            <Link href="#" className="bg-white text-brand-600 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors z-10">
              Learn More
            </Link>
          </div>

          <div className="bg-navy-900 h-80 p-8 sm:p-10 flex flex-col justify-between items-start relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-3xl font-serif font-bold text-white uppercase leading-tight tracking-wide z-10">
              Panama<br />Girls
            </h3>
            <Link href="#" className="bg-brand-600 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-brand-700 transition-colors z-10">
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 reveal-on-scroll is-visible">
          <div className="bg-stone-200 p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-full md:w-32 space-y-6 md:space-y-8">
              <h3 className="text-3xl font-serif font-bold text-navy-900 uppercase leading-none tracking-wide">
                Who<br />We Are
              </h3>
              <Link href="#" className="inline-block bg-brand-600 text-white px-5 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-brand-700 transition-colors">
                Our Vision
              </Link>
            </div>
            <div className="text-stone-700 text-sm leading-relaxed font-medium">
              <p className="mb-4">
                Panama School is a family of learning communities consisting of Panama Boys, Panama Girls, Panama Prep and the Nursery school.
                These schools are set in beautiful country environments, and will see your child through their entire schooling career.
              </p>
              <p>
                Located in the tranquil farming community of Marondera, Panama School is widely regarded as one of the top independent boarding schools
                and premier educational institutions in the region.
              </p>
            </div>
          </div>

          <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=2069&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              alt="School Building"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
