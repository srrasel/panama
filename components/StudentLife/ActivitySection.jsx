"use client";

import Image from "next/image";

export default function ActivitySection() {
  const items = [
    {
      image: "/new/image6.jpeg",
      textPrefix: "PAYING ATTENTION",
      highlightText: "TO THEMSELVES AND OTHERS",
    },
    {
      image: "/new/image7.jpeg",
      textPrefix: "SEARCHING FOR MEANING",
      highlightText: "IN PATTERNS AND CYCLES",
    },
    {
      image: "/new/image8.jpeg",
      textPrefix: "CURIOUS, COURAGEOUS,",
      highlightText: "AND EXPRESSIVE",
    },
  ];

  return (
    <section className="w-full bg-[#0F1B2D] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col group items-center">
              {/* Image Container with Brand Styling */}
              <div className="relative aspect-[5/4] w-full overflow-hidden mb-6 sm:mb-7 md:mb-8 shadow-2xl border-4 border-[#1F2A44] transition-all duration-500 group-hover:border-[#D4A437]/50">
                <Image
                  src={item.image}
                  alt={item.textPrefix}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>

              {/* Typography matching the School Branding */}
              <p className="text-[#F7F6F3] text-xs sm:text-[10px] md:text-[11px] lg:text-xs text-center tracking-[0.25em] leading-relaxed uppercase px-2 sm:px-0">
                <span className="font-black text-white">{item.textPrefix}</span>{" "}
                <span className="text-[#D4A437] font-bold italic">
                  {item.highlightText}
                </span>
                .
              </p>
              
              {/* Subtle underline indicator on hover */}
              <div className="h-[1px] w-0 bg-[#D4A437] transition-all duration-500 group-hover:w-2/3 mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}