"use client";

import Image from "next/image";

const OurLocation = () => {
  return (
    <section className="relative py-24 px-6 md:px-20 lg:px-32 overflow-hidden font-['Montserrat']">
      {/* 1 column on mobile, 2 equal columns on large screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text and Statistics */}
        <div className="space-y-12">
          <div>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl text-[#1F2A44] mb-10 leading-tight font-bold uppercase tracking-tight">
              Our <br /> <span className="text-[#D4A437] italic font-medium lowercase">location</span>
            </h2>

            <div className="space-y-6">
              {[
                { l: "184 km from ", v: "Bulawayo" },
                { l: "119 km from ", v: "Gweru" },
                { l: "97 km from ", v: "Masvingo" },
              ].map((stat, i) => (
                <div key={i} className="flex gap-5 items-start group">
                  {/* Brand Accent Bar (#D4A437) */}
                  <div className="w-1.5 h-10 bg-[#D4A437] shrink-0 transition-transform duration-300 group-hover:scale-y-125" />
                  <p className="text-[#222222] font-light pt-1 text-xl tracking-wide">
                    {stat.l}
                    <span className="font-bold text-[#1F2A44] ml-1 uppercase">{stat.v}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Brand Element */}
          <div className="w-24 h-px bg-[#D4A437]/40" />
        </div>

        {/* Right Side: Image with Editorial Styling */}
        <div className="relative group">
          {/* Subtle Background Frame */}
          <div className="absolute -inset-4  z-0 pointer-events-none translate-x-3 translate-y-3" />
          
          <div className="relative w-full h-[400px] md:h-[500px] rounded-none overflow-hidden shadow-2xl z-10">
            <Image
              src="/admission/location.jpeg"
              alt="Campus Location"
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;