"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const subNavItems = [
  { label: "CAMPUS", href: "/campus" },
  { label: "DINING", href: "/dining" },
  { label: "HEALTH AND WELLNESS", href: "/health" },
  { label: "PUBLIC SAFETY", href: "/safety" },
  { label: "DIVERSITY AND BELONGING", href: "/diversity" },
  { label: "NEWS AND MEDIA", href: "/news" },
];

export default function CommunalLearningSection() {
  return (
    <div className="w-full bg-[#F7F6F3] pb-16 sm:pb-20 md:pb-24 lg:pb-28 font-['Montserrat']">
      
      {/* 2. Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6 py-10 sm:py-12 md:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Side: Text Content */}
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] text-[#1F2A44] leading-tight mb-6 sm:mb-7 md:mb-8 font-bold">
            Excellence Rooted in Purpose: Education That Transforms
          </h2>
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-[#222222] leading-relaxed">
            <p className="text-base sm:text-lg md:text-lg font-semibold text-[#0F1B2D]">
              The outcome of a Pamavambo education — the most lasting and impactful outcome — is a student who knows their worth, honors their heritage, and serves their community with integrity and purpose.
            </p>
            <p className="text-sm sm:text-base md:text-base font-light opacity-90 leading-relaxed italic">
              Foundational to that outcome is our commitment to holistic development. We believe education extends far beyond academic achievement. At Pamavambo, we cultivate the whole child: intellectually curious minds, spiritually grounded hearts, physically capable bodies, and culturally rooted identities. We engage each student with high expectations and unwavering support, creating an environment where Christian values inform character, discipline shapes resilience, and cultural heritage provides belonging.
            </p>
          </div>
        </div>

        {/* Right Side: Overlapping Image Stack */}
        <div className="relative flex justify-center lg:justify-end py-8 sm:py-12 md:py-14 lg:py-16">
          {/* Decorative Gold Frame (Bottom Layer) - Using Primary Gold (#D4A437) */}
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:top-0 lg:right-12 w-[85%] sm:w-[85%] md:w-[85%] lg:w-[80%] aspect-4/5 border-2 border-[#D4A437] z-0" />

          {/* Solid Navy Block (Middle Layer) - Using Primary Navy (#1F2A44) */}
          <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-0 w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] aspect-square bg-[#1F2A44] overflow-hidden z-10 shadow-lg sm:shadow-xl lg:shadow-xl">
            {/* Architectural pattern overlay */}
            <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-soft-light">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="pattern"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 75vw, 35vw"
              />
            </div>
          </div>

          {/* Main Action Photo (Top Layer) - Added White Border for Elegance */}
          <div className="relative z-20 w-[90%] sm:w-[90%] md:w-[85%] lg:w-[75%] mr-4 sm:mr-6 md:mr-8 lg:mr-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10 aspect-4/3 ">
            <Image
              src="/new/image10.jpeg"
              alt="Students learning together"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 75vw, 35vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}