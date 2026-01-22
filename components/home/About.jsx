"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative w-full py-20 px-4 md:px-20 bg-white overflow-hidden">
      {/* Decorative Gold Border Box - Top Section */}
      <div className="max-w-7xl mx-auto relative border border-[#b89149] p-8 md:p-16 ">
        {/* Small patterned box on the left line */}
        <div
          className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-20 bg-[#f3efe4] hidden md:block border-l border-r border-[#b89149]"
          style={{
            backgroundImage: "radial-gradient(#b89149 1px, transparent 0)",
            backgroundSize: "4px 4px",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text */}
          <div className="z-10">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2a3c4a] mb-6 leading-tight">
              With a House to <br /> Call Home...
            </h2>
            <p className="text-gray-600 max-w-sm mb-8 leading-relaxed italic">
              A tight-knit community, a support system, a place of respite, a
              team, a flag, a cheer, a legacy to make your own.
            </p>
            <Button className="bg-[#bc1a31] cursor-pointer hover:bg-[#9a1528] text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs flex items-center gap-4">
              <Link href={"/life"}>Learn More</Link> <ArrowRight size={16} />
            </Button>
          </div>

          {/* Right Side: Overlapping Images */}
          <div className="relative h-75 md:h-100">
            {/* Red Architectural Detail Background */}
            <div className="absolute top-0 right-0 w-full h-3/5 bg-[#bc1a31] overflow-hidden rounded-sm">
              <Image
                src="/example-image-12.jpg"
                alt="Architectural pattern"
                fill
                className="object-cover opacity-40 mix-blend-multiply"
              />
            </div>
            {/* People on Porch Image */}
            {/* 16:9 Aspect Ratio */}
            <div className="absolute bottom-0 left-10 md:left-20 w-[90vw] md:w-[40vw] aspect-video shadow-2xl">
              <Image
                src="/home_house.jpg"
                alt="Students on porch"
                fill
                className="object-cover "
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Connector and Logo */}
      <div className="flex flex-col items-center mb-12">
        <div className="border border-[#b89149] py-2 px-6 -mt-12 bg-white z-50">
          <div className="relative w-20 h-20 ">
            <Image
              src="/texture-02.svg"
              alt="Decorative texture"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-0.5 h-28  bg-[#b89149]"></div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl -mt-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side: Classroom Image */}
          <div className="relative w-full aspect-4/3">
            <Image
              src="/home_harkness.jpg"
              alt="Harkness table discussion"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Side: Text */}
          <div className="md:pl-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2a3c4a] mb-8 leading-tight">
              ...and a Table <br /> That Transforms <br /> You...
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed italic max-w-md">
              Harkness is the table around which we teach and learn, and so much
              more. It’s the state of mind that every Lawrentian brings to the
              classroom: a spirit of openness, curiosity, and discovery.
            </p>
            <Button className="bg-[#bc1a31] cursor-pointer hover:bg-[#9a1528] text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs flex items-center gap-4">
              <Link href={"/life"}>Learn More</Link> <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
