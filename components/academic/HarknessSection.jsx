"use client";

import Image from "next/image";

export default function HarknessSection() {
  return (
    <section className=" py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 font-['Montserrat']">
      
      {/* Top Part: Text and Image */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/2 relative aspect-[4/3] group">
          {/* Editorial Frame Styling */}
          <div className="absolute -inset-2 z-0 pointer-events-none translate-x-2 translate-y-2" />
          <div className="relative w-full h-full overflow-hidden  z-10">
            <Image
              src="/new/Picture15.png"
              alt="Students in classroom"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#1F2A44] leading-tight">
            Ready to Learn.
            <br />
            <span className="text-[#D4A437] italic font-medium">Ready for Life.</span>
          </h2>
          <div className="text-sm md:text-base text-[#222222] space-y-4 leading-relaxed opacity-90">
            <p className="font-semibold text-[#1F2A44]">
              A Pamavambo graduate is ready. Ready to embrace higher
              education and engage in the professional world; to create cultures
              of belonging...
            </p>
            <p className="font-light italic">
              Students come to Pamavambo with their own stories and lenses.
              When they are generous with themselves, they enrich the lives of
              their classmates...
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Part: Video and Foundation Text */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/3 border-l-4 border-[#D4A437] pl-6">
          <p className="text-sm md:text-base text-[#1F2A44] leading-relaxed font-medium uppercase tracking-wider">
            This is the foundation of{" "}
            <span className="text-[#D4A437] italic font-bold tracking-normal capitalize">Harkness</span>
            , a collaborative form of learning that encourages intellectual
            effort and social-emotional learning...
          </p>
        </div>
        
        {/* Video Container with Sharp Editorial Styling */}
        <div className="w-full md:w-2/3 aspect-video relative bg-[#0F1B2D]  group">
          <iframe
            className="absolute inset-0 w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
            src="/new/video.mp4"
            title="Pamavambo: Why do we use Harkness?"
            allowFullScreen
          ></iframe>
          {/* Subtle accent line below video */}
          <div className="absolute -bottom-4 right-0 h-1 w-32 bg-[#D4A437] opacity-60" />
        </div>
      </div>
    </section>
  );
}