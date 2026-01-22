export default function ApplicationProcess() {
  return (
    <section className="bg-[#5a0b16] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="border border-[#b89149] p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 flex flex-col items-start space-y-4 sm:space-y-5 md:space-y-6 relative overflow-hidden">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white">
          Application Process
        </h2>
        <p className="text-white/80 text-xs sm:text-sm md:text-sm max-w-full sm:max-w-lg md:max-w-xl leading-relaxed sm:leading-relaxed">
          From inquiry through enrollment, this guide will let you know what to
          expect when applying to The Lawrenceville School, including key dates,
          required submissions, and helpful links.
        </p>
        <button className="bg-[#bc1a31] hover:bg-[#a0162a] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-[10px] font-bold tracking-wider sm:tracking-widest flex items-center gap-2 sm:gap-3 md:gap-4 transition-all uppercase">
          Learn More
          <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
}
