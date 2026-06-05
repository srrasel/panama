"use client";

import Image from "next/image";

const ResearchInstitutes = () => {
  return (
    <section className="bg-[#F7F6F3] py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24 items-center">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 order-2 md:order-1">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F2A44] font-bold leading-[1.1]">
            Character Through Action 
          </h2>

          <div className="space-y-3 sm:space-y-4 max-w-full sm:max-w-md border-l-2 border-[#D4A437] pl-6">
            <p className="text-[#222222] leading-relaxed font-light text-sm sm:text-base italic opacity-90">
              Where character is built through challenge, values are tested through experience, and purpose is found through service.
            </p>
          </div>
        </div>

        {/* Right Column: Image with Editorial Frame */}
        <div className="relative aspect-square w-full overflow-hidden order-1 md:order-2 group">
          <div className="relative w-full h-full border-[10px] border-white shadow-2xl overflow-hidden">
            <Image
              src="/new/image181.jpeg"
              alt="Students in a creek conducting research"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority={false}
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchInstitutes;