"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VisitUsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/3 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">
            Visit Us
          </h2>

          <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-sm">
            Vibrant academics and arts spaces, cutting edge sports facilities,
            and historic Houses to call home. Our campus is the perfect setting
            for guided growth and self-discovery.
          </p>

          <Link
            href="/admission/visit"
            className="inline-flex items-center gap-2 text-[#bc1a31] text-[10px] font-bold tracking-[0.3em] uppercase group"
          >
            Visit Our Campus
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Right Column: Large Image Block */}
        <div className="w-full lg:w-2/3">
          <div className="relative aspect-4/3 w-full overflow-hidden shadow-xl">
            <Image
              src="/admission/visit.jpg" // Replace with your image path
              alt="Aerial view of Pamavambo Campus"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
