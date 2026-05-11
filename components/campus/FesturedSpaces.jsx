"use client";

import React from 'react';
import Image from 'next/image';

const FeaturedSpaces = () => {
  const spaces = [
    {
      title: "TSAI FIELD HOUSE",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "GRUSS CENTER FOR ART AND DESIGN",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "HUTCHINS GALLERIES",
      image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=1000&auto=format&fit=crop",
    }
  ];

  return (
    <section className="bg-[#F7F6F3] py-24 px-6 md:px-20 lg:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-[2px] bg-[#D4A437]" />
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-[#1F2A44] tracking-tight uppercase">
            Featured <span className="text-[#D4A437] italic font-medium">Spaces</span>
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {spaces.map((space, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container with Brand Border/Shadow */}
              <div className="relative aspect-[3/2] mb-6 overflow-hidden bg-white border border-[#E5E7EB] shadow-sm group-hover:shadow-xl transition-all duration-500">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-[#1F2A44]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Space Title with Animated Underline */}
              <div className="inline-block relative">
                <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#1F2A44] uppercase group-hover:text-[#D4A437] transition-colors duration-300">
                  {space.title}
                </h3>
                <div className="h-[1px] w-0 bg-[#D4A437] transition-all duration-500 group-hover:w-full mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;