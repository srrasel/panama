import Link from "next/link"
import "./school.css"
export default function School() {
  return (
    <section id="schools" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 reveal-on-scroll is-visible">
          <div className="school-card boys h-80 p-8 sm:p-10 flex flex-col justify-between items-start relative overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Panama Boys School" className="absolute inset-0 w-full h-full object-cover" />
            <div className="school-card-content w-full h-full flex flex-col justify-between">
              <h3 className="text-3xl font-serif font-bold text-white uppercase leading-tight tracking-wide">
                Student<br />Portal
              </h3>
              <Link href="/login" className="bg-blue-600 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors inline-block">
                Learn More
              </Link>
            </div>
          </div>

          <div className="school-card prep h-80 p-8 sm:p-10 flex flex-col justify-between items-start relative overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFyZW50fGVufDB8fDB8fHww" alt="Panama Prep School" className="absolute inset-0 w-full h-full object-cover" />
            <div className="school-card-content w-full h-full flex flex-col justify-between">
              <h3 className="text-3xl font-serif font-bold text-white uppercase leading-tight tracking-wide">
                Parent<br />Portal
              </h3>
              <Link href="/login" className="bg-white text-brand-600 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors inline-block">
                Learn More
              </Link>
            </div>
          </div>

          <div className="school-card girls h-80 p-8 sm:p-10 flex flex-col justify-between items-start relative overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1631203928493-a4e4eb2b8da1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D" alt="Panama Girls School" className="absolute inset-0 w-full h-full object-cover" />
            <div className="school-card-content w-full h-full flex flex-col justify-between">
              <h3 className="text-3xl font-serif font-bold text-white uppercase leading-tight tracking-wide">
                Teacher<br />Portal
              </h3>
              <Link href="/login" className="bg-purple-600 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-purple-700 transition-colors inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 reveal-on-scroll is-visible">
          <div className="bg-stone-200 p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-start rounded-lg">
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
                Panama School is a family of learning communities consisting of Panama Boys, Panama Girls, Panama Prep and the Nursery school. These schools are set in beautiful country environments, and will see your child through their entire schooling career.
              </p>
              <p>
                Located in the tranquil farming community of Marondera, Panama School is widely regarded as one of the top independent boarding schools and premier educational institutions in the region.
              </p>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=2069&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" alt="School Building" />
          </div>
        </div>
      </div>
    </section>
  )
}
