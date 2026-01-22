"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

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
    <div className="w-full bg-white pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      {/* 1. Sub-Navigation Bar */}
      <nav className="border-t border-b border-[#b89149]/30 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6">
          <ul className="flex flex-wrap justify-center sm:justify-center md:justify-between gap-3 sm:gap-4 md:gap-4 lg:gap-6">
            {subNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[10px] sm:text-[10px] md:text-xs lg:text-xs font-bold tracking-wider sm:tracking-widest text-gray-800 hover:text-[#bc1a31] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 2. Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6 py-10 sm:py-12 md:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Side: Text Content */}
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#1a1a1a] leading-tight mb-6 sm:mb-7 md:mb-8">
            Communal Learning Brings Purpose to Academic Challenge
          </h2>
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 leading-relaxed font-light">
            <p className="text-base sm:text-lg md:text-lg font-medium text-gray-900">
              The outcome of a Lawrenceville education — the most lasting and
              impactful outcome — is a set of values, a way of being, an ability
              to create belonging.
            </p>
            <p className="text-sm sm:text-base md:text-base">
              Foundational to that outcome is Harkness learning; it is the
              organizing principle of our community. We engage each other with
              curiosity and inquiry, we listen, and we give each other grace —
              all without fear or pretense — and we make space for others to
              exercise that privilege.
            </p>
          </div>
        </div>

        {/* Right Side: Overlapping Image Stack */}
        <div className="relative flex justify-center lg:justify-end py-8 sm:py-12 md:py-14 lg:py-16">
          {/* Decorative Gold Frame (Bottom Layer) */}
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:top-0 lg:right-12 w-[85%] sm:w-[85%] md:w-[85%] lg:w-[80%] aspect-4/5 border border-[#b89149] z-0" />

          {/* Solid Red Texture Block (Middle Layer) */}
          <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-0 w-[75%] sm:w-[75%] md:w-[75%] lg:w-[70%] aspect-square bg-[#bc1a31] overflow-hidden z-10 shadow-lg sm:shadow-xl lg:shadow-xl">
            {/* Architectural pattern overlay using Next.js Image for optimization */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image
                src="/example-image-12.jpg"
                alt="pattern"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 75vw, 35vw"
              />
            </div>
          </div>

          {/* Main Action Photo (Top Layer) */}
          <div className="relative z-20 w-[90%] sm:w-[90%] md:w-[85%] lg:w-[75%] mr-4 sm:mr-6 md:mr-8 lg:mr-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10 aspect-4/3 shadow-xl sm:shadow-2xl lg:shadow-2xl">
            <Image
              src="/student_life/gps_communal-learning.jpg"
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
