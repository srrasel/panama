import Link from "next/link";

export default function CampusToursSection() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-6 sm:mb-8 md:mb-10">
          Scholarship Aid
        </h2>

        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          <p className="text-gray-800 font-light leading-relaxed text-base sm:text-lg">
            A family's eligibility for aid is determined through careful
            analysis of information provided on the scholarship aid application,{" "}
            <span className="font-bold border-b border-gray-900">Clarity</span>,
            and through review of a family's current, complete, federal tax
            return. This analysis identifies the dollar amount of a family's
            discretionary income that is available for tuition and fees.
          </p>

          <p className="text-gray-700 font-light leading-relaxed text-sm sm:text-base">
            We strongly encourage families to apply for aid during the
            application process if they believe that, at any time during their
            child's tenure, they will need scholarship aid. Families who come as
            full-pay should expect to remain full-pay unless a significant life
            event occurs.
          </p>

          <p className="text-gray-900 font-medium text-sm sm:text-base">
            The deadline to apply for scholarship aid is{" "}
            <span className="font-bold">January 15</span>.
          </p>

          <Link
            href="/scholarship-aid"
            className="inline-block text-[#4A6FA5] font-bold text-xs sm:text-sm tracking-widest uppercase border-b-2 border-[#4A6FA5] pb-1 hover:text-[#4A6FA5] hover:border-[#4A6FA5] transition-all"
          >
            Learn More About Scholarship Aid
          </Link>
        </div>
      </div>
    </section>
  );
}
