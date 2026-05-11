"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VisitUsSection() {
  return (
    <section className="w-full bg-[#F7F6F3] py-16 md:py-24 px-6 md:px-20 lg:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/3 space-y-8">
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-[#1F2A44] leading-tight">
            Visit Us
          </h2>

          <p className="text-[#222222] text-sm md:text-base font-light leading-relaxed max-w-sm opacity-80">
            Vibrant academics and arts spaces, cutting edge sports facilities,
            and historic Houses to call home. Our campus is the perfect setting
            for guided growth and self-discovery.
          </p>

          <Link
            href="/admission/visit"
            className="inline-flex items-center gap-3 text-[#D4A437] text-[10px] font-bold tracking-[0.3em] uppercase group border-b-2 border-transparent hover:border-[#D4A437] pb-1 transition-all"
          >
            Visit Our Campus
            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>

        {/* Right Column: Large Image Block with Frame Styling */}
        <div className="w-full lg:w-2/3 group">
          <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl ">
            <Image
              src="/new/image18.jpeg" // Aerial view of Campus
              alt="Aerial view of Pamavambo Campus"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Subtle Navy Tint Overlay */}
            <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}