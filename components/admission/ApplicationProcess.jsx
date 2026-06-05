"use client";

export default function ApplicationProcess() {
  return (
    <section className="bg-[#0F1B2D] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 font-['Montserrat']">
      <div className="border border-[#D4A437]/40 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 flex flex-col items-start space-y-4 sm:space-y-5 md:space-y-6 relative overflow-hidden">
        {/* Title using Playfair Display */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-[#F7F6F3]">
          Application Process
        </h2>
        
        {/* Description using Montserrat */}
        <p className="text-[#F7F6F3]/80 text-xs sm:text-sm md:text-base max-w-full sm:max-w-lg md:max-w-xl leading-relaxed italic">
          From inquiry through enrollment, this guide will let you know what to
          expect when applying to The Pamavambo Private School, including key dates,
          required submissions, and helpful links.
        </p>
        
        {/* Button using Brand Navy and Gold highlight */}
        <button className="bg-[#D4A437] hover:bg-[#E6C26A] text-[#0F1B2D] px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-[10px] md:text-xs font-bold tracking-[0.25em] flex items-center gap-3 md:gap-5 transition-all duration-300 uppercase rounded-none group">
          Learn More
          <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
        </button>

        {/* Decorative Watermark Effect (Optional Brand Detail) */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-[#D4A437]/10 rounded-full pointer-events-none" />
      </div>
    </section>
  );
}