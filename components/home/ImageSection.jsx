"use client";

import Image from "next/image";
import Link from "next/link";

const gridItems = [
  {
    title: "Academics",
    image: "/new/image37.jpeg",
    link: "/academics",
  },
  {
    title: "Sports",
    image: "/new/image38.jpeg",
    link: "",
  },
  {
    title: "Admissions",
    image: "/new/image39.jpeg",
    link: "/admission",
  },
  {
    title: "Beyond the Classroom",
    image: "/new/image40.jpeg",
    link: "/beyond-the-classroom",
  },
];

export default function ImageSection() {
  return (
    <section
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(247, 246, 243, 0.9), rgba(247, 246, 243, 0.9)), url("https://images.unsplash.com/photo-1453749024868-697480531b72?q=80&w=2007&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* The 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 shadow-[0_20px_50px_rgba(31,42,68,0.15)] relative ">
          
          {/* Central Logo Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden sm:block">
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 flex items-center justify-center">
              {/* Radiating circles with Brand Gold (#D4A437) */}
              <div
                className="absolute inset-0 w-full h-full opacity-20 animate-pulse"
                style={{
                  backgroundImage: 'url("/radiating-circles.svg")',
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              
              {/* Central White Circular Base for Logo */}
              <div className="relative w-32 h-32  rounded-full flex items-center justify-center shadow-xl border-2 border-[#D4A437]/20">
                <div className="relative w-20 h-20">
                  <Image
                    src="/new/logo.png"
                    alt="School Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {gridItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="group relative aspect-square overflow-hidden border border-white/20"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Navy Blue Overlay on Hover (#1F2A44) */}
              <div className="absolute inset-0 bg-[#1F2A44]/30 group-hover:bg-[#1F2A44]/70 transition-all duration-500" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-start p-5 sm:p-8 md:p-10">
                <div className="overflow-hidden">
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-bold tracking-wide uppercase transition-transform duration-500 group-hover:-translate-y-2">
                    {item.title}
                  </h3>
                  {/* Decorative underline that expands on hover */}
                  <div className="h-0.5 bg-[#D4A437] w-12 group-hover:w-24 transition-all duration-500 mt-2" />
                </div>
                
                {/* Subtle description or "Explore" text visible on hover */}
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[#D4A437] font-['Montserrat'] font-bold text-xs tracking-[0.2em] uppercase flex items-center gap-2">
                    Explore <div className="w-8 h-px bg-[#D4A437]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Decorative Crest */}
        <div className="flex flex-col items-center mt-12 sm:mt-16 md:mt-20">
          <div className="w-px h-10 sm:h-16 bg-linear-to-b from-[#D4A437] to-transparent mb-6 sm:mb-8" />
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
            <Image
              src="/texture-02.svg"
              alt="crest"
              fill
              className="opacity-30 object-contain saturate-0 brightness-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}