"use client";

import Image from "next/image";

const EnvironmentalSections = () => {
  return (
    <section className="bg-[#F3F4F6] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
        
        {/* Top Section: Environmental Studies (Text Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="order-2 md:order-1 flex flex-col space-y-4 sm:space-y-5 md:space-y-6 md:pr-8 lg:pr-12">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F2A44] font-bold leading-tight uppercase tracking-tight">
              Environmental <br /> <span className="text-[#D4A437] italic font-medium lowercase">studies</span>
            </h2>
            <div className="w-16 h-1 bg-[#D4A437] mb-2" />
            <p className="text-[#222222] font-light leading-relaxed max-w-full sm:max-w-sm text-base md:text-lg opacity-90 border-l-2 border-[#D4A437]/30 pl-6 italic">
              Excellence with purpose isn&apos;t taught—it&apos;s experienced, lived, and embraced beyond the classroom
            </p>
          </div>

          <div className="order-1 md:order-2 relative aspect-[4/3] w-full group">
            <div className="relative w-full h-full overflow-hidden ">
              <Image
                src="/new/image15.jpeg"
                alt="Student with seedlings"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Sustainability (Image Left, Text Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-32">
          <div className="relative aspect-[4/3] w-full group">
            <div className="relative w-full h-full overflow-hidden ">
              <Image
                src="/new/image12.jpeg"
                alt="Scenic lake view"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-6 md:pl-8 lg:pl-12">
            <h3 className="text-[#D4A437] text-xs font-bold uppercase tracking-[0.3em]">Leading with purpose</h3>
            <p className="text-[#1F2A44] font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed italic border-r-4 border-[#D4A437] pr-8 text-right">
              &ldquo;Learning with integrity. Growing through experience. Leading with purpose.&rdquo;
            </p>
            <div className="flex justify-end">
              <div className="w-24 h-px bg-[#D4A437]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalSections;