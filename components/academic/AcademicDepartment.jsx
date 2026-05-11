"use client";

import Image from "next/image";

const departments = [
  { name: "English", icon: "/academic/english.svg" },
  { name: "History", icon: "/academic/history.svg" },
  { name: "Accounts/Commerce", icon: "/academic/interdisiplinary.svg" },
  { name: "Combined Science", icon: "/academic/language.svg" },
  { name: "Mathematics", icon: "/academic/mathematics.svg" },
  { name: "Geography", icon: "/academic/performing-arts.svg" },
  { name: "Physics", icon: "/academic/religion.svg" },
  { name: "Biology", icon: "/academic/science.svg" },
  { name: "Chemistry", icon: "/academic/visual-arts.svg" },
];

export default function AcademicDepartments() {
  return (
    <section id="departments" className="relative min-h-80 sm:min-h-96 md:min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 overflow-hidden font-['Montserrat']">
      {/* Background Image with Brand Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/academic/background.jpg"
          alt="Campus Background"
          fill
          className="object-cover grayscale"
          priority
          sizes="100vw"
        />
        {/* Navy Tint for the whole section background */}
        <div className="absolute inset-0 bg-[#F7F6F3]/95 mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-full sm:max-w-3xl mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-[#1F2A44] mb-6">
            Academic <span className="text-[#D4A437] italic font-medium">Departments</span>
          </h2>
          <div className="w-20 h-1 bg-[#D4A437] mb-8" />
          <p className="text-[#222222] text-sm md:text-base leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl opacity-90 font-light">
            Through a robust selection of courses, community service, and
            personal development, students discover who they are and what they
            stand for, strive to support a School culture of belonging, and
            contribute their unique intellect, passion, and drive to advance
            their communities.
          </p>
        </div>

        {/* Grid using Brand Gold (#D4A437) for borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#D4A437]/30 bg-white/50 backdrop-blur-sm">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="
                group
                relative
                aspect-square
                p-8 sm:p-10 md:p-12
                border-r border-b border-[#D4A437]/30
                flex flex-col justify-between
                overflow-hidden
                cursor-pointer
                transition-all duration-500
              "
            >
              {/* Navy Hover Overlay (#1F2A44) */}
              <div
                className="
                  absolute inset-0 
                  bg-[#1F2A44] 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity duration-500
                  z-0
                "
              />

              {/* Title */}
              <h3
                className="
                  relative z-10
                  text-lg sm:text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#1F2A44]
                  group-hover:text-[#D4A437]
                  transition-colors duration-300
                "
              >
                {dept.name}
              </h3>

              {/* Icon Container with Gold Accent */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                <Image
                  src={dept.icon}
                  alt={dept.name}
                  fill
                  className="
                    object-contain
                    filter
                    brightness-0 opacity-80
                    group-hover:invert
                    group-hover:brightness-100
                    group-hover:opacity-100
                    transition-all duration-500
                  "
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                />
              </div>
              
              {/* Subtle Decorative corner for hover state */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#D4A437] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}