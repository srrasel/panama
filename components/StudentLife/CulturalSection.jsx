"use client";

import Image from "next/image";

const supportCategories = [
  {
    id: 1,
    name: "A CULTURE OF SUPPORT",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "CLASSROOM TEACHERS",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
  },
  { id: 3, name: "COACHES", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop" },
  {
    id: 4,
    name: "RESIDENTIAL FACULTY",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
  },
  { id: 5, name: "ADVISORS", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop" },
  {
    id: 6,
    name: "PROGRAM LEADERS",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop",
  },
  { id: 7, name: "CHAPERONES", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
  {
    id: 8,
    name: "ADMINISTRATION",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
  },
  { id: 9, name: "PARENTS", image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop" },
];

export default function CulturalSection() {
  return (
    <section className="w-full bg-[#fdfaf3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* 1. Left Side: Interactive Grid Navigation */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3">
          {supportCategories.map((category) => (
            <div
              key={category.id}
              className="relative aspect-square overflow-hidden"
            >
              {/* Image with Color Overlay */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              {/* Category Label */}
            </div>
          ))}
        </div>

        {/* 2. Right Side: Dynamic Content Display */}
        <div className="w-full lg:w-1/2">
          <div className="mb-6 sm:mb-7 md:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-serif text-[#1a1a1a] mb-3 sm:mb-4">
              A Culture of Support
            </h3>
            <p className="text-xs sm:text-xs md:text-sm text-gray-600 leading-relaxed sm:leading-relaxed font-light mb-6 sm:mb-7 md:mb-8 max-w-xl">
              While the students create value for themselves and each other,
              Harkness is facilitated by the thoughtful and intentional
              leadership of our teachers and coaches. Each teacher, coach, and
              leader seeks to cultivate an environment of trust to ensure
              appropriate navigation of complex situations and conversations.
            </p>
          </div>

          {/* Large Preview Image */}
          <div className="relative aspect-4/3 w-full shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop"
              alt="community"
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative "GO BIG RED!" Frame Overlay logic if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}
