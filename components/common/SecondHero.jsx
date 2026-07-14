"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SecondHero({
  backgroundImage = "/admission-hero.jpg",
  title = "Admission",
  subtitle,
  breadcrumbs = [{ label: "Home", href: "/" }],
}) {
  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[75vh] flex items-end sm:items-center overflow-hidden font-['Montserrat'] pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={typeof title === "string" ? title : "Hero"}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1F2A44]/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
        <div className="max-w-full md:max-w-4xl">
          <nav className="mb-3 sm:mb-4">
            <ul className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[#F7F6F3]/90 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-widest">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <li>
                    <Link
                      href={crumb.href || "#"}
                      className="hover:text-[#D4A437] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-[#D4A437]/70">/</span>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>

          <div className="relative inline-block mb-3 sm:mb-4 md:mb-6 max-w-full">
            <h1 className="text-[#F7F6F3] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Playfair_Display'] font-bold leading-[1.05] pr-0 sm:pr-8 md:pr-12 uppercase tracking-tight break-words">
              {title}
            </h1>
            <div className="absolute -bottom-1 sm:bottom-0 md:bottom-4 left-full w-[15vw] sm:w-[25vw] md:w-[35vw] h-px sm:h-[2px] bg-[#D4A437]/60 hidden md:block">
              <div className="absolute right-0 top-0 w-px sm:w-[2px] h-24 md:h-40 lg:h-56 bg-[#D4A437]/60" />
            </div>
          </div>

          {subtitle && (
            <p className="text-[#F7F6F3] text-sm sm:text-base md:text-xl lg:text-2xl mt-2 sm:mt-4 max-w-2xl font-light italic opacity-90 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 sm:h-[6px] bg-[#1F2A44] z-20" />
    </section>
  );
}
