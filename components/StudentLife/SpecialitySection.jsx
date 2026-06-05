"use client";

import Link from "next/link";
import { Heart, ShieldCheck, Utensils, Users } from "lucide-react";

const features = [
  {
    title: "Health and Wellness",
    description:
      "Wellness and community are deeply connected at Pamavambo - bringing people together in meaningful and intentional ways to strengthen our sense of belonging. Student wellbeing is woven into every aspect of school life.",
    icon: Heart,
    href: "/life",
  },
  {
    title: "Public Safety",
    description:
      "A safe learning environment is maintained around the clock, every day of the year. Trained security personnel patrol the campus continuously, ensuring the safety and wellbeing of our students, staff, and visitors.",
    icon: ShieldCheck,
    href:  "/life",
  },
  {
    title: "Dining",
    description:
      "The Pamavambo community thrives when we are nourished and connected. We view dining as an opportunity to build relationships and foster ubuntu just as much as a time to fuel our bodies. We honor dietary needs, celebrate cultural traditions through food, and create meaningful moments of connection around the table.",
    icon: Utensils,
    href: "/life",
  },
  {
    title: "Diversity and Belonging",
    description:
      "Learning deepens when it happens among students with varied backgrounds, experiences, and perspectives. We celebrate our diverse and inclusive community and intentionally create space for each student's unique identity, voice, and story to be heard and valued.",
    icon: Users,
    href: "/life",
  },
];

export default function SpecialitySection() {
  return (
    <section className="w-full  py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Icon Container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center bg-white rounded-full shadow-sm border border-[#D4A437]/20">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4A437]" strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-xl font-['Playfair_Display'] font-bold text-[#1F2A44] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[#222222] text-sm sm:text-sm md:text-[15px] leading-relaxed font-light opacity-90">
                  {feature.description}
                </p>
              </div>

              {/* Learn More Button */}
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}