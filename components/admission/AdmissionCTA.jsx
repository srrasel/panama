"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const admissionLinks = [
  { name: "Inquire", href: "/admission/inquire" },
  { name: "Application Process", href: "/admission/application" },
  { name: "Campus Visits", href: "/admission/visit" },
];

export default function AdmissionsCTA() {
  return (
    <section className="w-full bg-[#F7F6F3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 sm:gap-12 md:gap-14 lg:gap-20 xl:gap-32 items-start">
        {/* Left Column: Mission & Content */}
        <div className="w-full lg:w-3/5 space-y-8 sm:space-y-10">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-['Playfair_Display'] font-bold text-[#1F2A44] leading-relaxed italic">
              Pamavambo challenges a diverse community of promising young people
              to lead lives of learning, integrity, and high purpose. Our
              mission is to inspire the best in each to seek the best for all.
            </p>

            <p className="text-[#222222] font-light leading-relaxed max-w-xl text-sm sm:text-base md:text-base opacity-80">
              If you&apos;re ready to take the next steps towards joining the
              Pamavambo community, start with our inquiry form. Next, schedule
              your visit with us to see all about.
            </p>
          </div>
        </div>

        {/* Right Column: Admission Links List */}
        <div className="w-full lg:w-2/5 flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
          {admissionLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group flex justify-between items-center gap-4 sm:gap-6 border-b border-[#D4A437]/20 hover:border-[#D4A437] pb-4 transition-all"
            >
              <span className="text-base sm:text-lg md:text-xl lg:text-xl font-['Playfair_Display'] font-bold text-[#1F2A44] group-hover:text-[#D4A437] transition-colors">
                {link.name}
              </span>
              <ArrowRight
                size={22}
                className="text-[#D4A437] group-hover:translate-x-2 transition-all shrink-0 opacity-60 group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}