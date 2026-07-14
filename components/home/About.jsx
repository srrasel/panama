"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden font-['Montserrat']">
      {/* Decorative Gold Border Box - Top Section */}
      <div className="max-w-7xl mx-auto relative border border-[#D4A437] p-5 sm:p-8 md:p-12 lg:p-16 bg-white ">
        {/* Small patterned box on the left line */}
        <div
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-24 bg-[#F7F6F3] hidden md:block border border-[#D4A437]"
          style={{
            backgroundImage: "radial-gradient(#D4A437 1.5px, transparent 0)",
            backgroundSize: "6px 6px",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side: Text */}
          <div className="z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] text-[#1F2A44] mb-5 sm:mb-6 md:mb-8 leading-tight font-bold">
              This is where <br/>it begins... 
            </h2>
            <p className="text-[#222222] text-sm sm:text-base max-w-sm mb-6 sm:mb-8 md:mb-10 leading-relaxed italic opacity-90">
              A tight-knit community, a support system, a place of growth. A team, a foundation, a journey to excellence. 
              At Pamavambo, your story starts here.
            </p>
            <Button asChild className="bg-[#1F2A44] cursor-pointer hover:bg-[#0F1B2D] text-white rounded-none px-6 sm:px-10 py-5 sm:py-7 uppercase tracking-[0.2em] text-xs flex items-center gap-4 transition-all duration-300">
              <Link href={"/life"} className="flex items-center gap-3">
                Learn More <ArrowRight size={18} className="text-[#D4A437]" />
              </Link>
            </Button>
          </div>

          {/* Right Side: Overlapping Images */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem]">
            {/* Background Block with Brand Navy */}
            <div className="absolute top-0 right-0 w-full h-3/5 bg-[#1F2A44] overflow-hidden rounded-sm">
              <Image
                src="/new/image22.jpeg"
                alt="Architectural pattern"
                fill
                className="object-cover opacity-30 mix-blend-luminosity"
              />
            </div>
            {/* Foreground Main Image */}
            <div className="absolute bottom-0 left-4 md:left-12 w-[95%] md:w-[85%] aspect-video ">
              <Image
                src="/new/build.jpeg"
                alt="Students on porch"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 95vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Connector and Logo */}
      <div className="flex flex-col items-center mb-16">
        <div className="border border-[#D4A437] py-3 px-8 -mt-12 bg-white z-20 shadow-md">
          <div className="relative w-16 h-16">
            <Image
              src="/texture-02.svg"
              alt="Decorative texture"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-[1.5px] h-32 bg-linear-to-b from-[#D4A437] to-transparent"></div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl -mt-10 sm:-mt-14 md:-mt-20 mx-auto pb-6 sm:pb-10 pt-8 sm:pt-12 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side: Classroom Image */}
          <div className="relative w-full aspect-[4/3] shadow-xl ">
            <Image
              src="/new/image11.jpeg"
              alt="Harkness table discussion"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Side: Text */}
          <div className="md:pl-8 lg:pl-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] text-[#1F2A44] mb-5 sm:mb-6 md:mb-8 leading-tight font-bold">
              ...and a Table <br/>That Transforms<br/> You... 
            </h2>
            <p className="text-[#222222] text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 leading-relaxed italic max-w-md opacity-90">
              <span className="text-[#D4A437] font-bold not-italic">Ubuntu</span> is the table around which we gather and grow, and so much more. 
              It&apos;s the spirit that every Pamavambo student brings to the classroom: a sense of community, 
              shared purpose, and collective discovery.
            </p>
            <Button className="bg-[#1F2A44] cursor-pointer hover:bg-[#0F1B2D] text-white rounded-none px-6 sm:px-10 py-5 sm:py-7 uppercase tracking-[0.2em] text-xs flex items-center gap-4 group transition-all">
              <Link href={"/life"}>Learn More</Link> 
              <ArrowRight size={18} className="text-[#D4A437] group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}