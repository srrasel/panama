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
    <section className="relative w-full min-h-80 sm:min-h-96 md:min-h-screen flex items-center overflow-hidden font-['Montserrat']">
      {/* 1. Background Image with Brand Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Navy Blue (#1F2A44) overlay for readability */}
        <div className="absolute inset-0 bg-[#1F2A44]/50" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-8 lg:px-12 w-full">
        <div className="max-w-full md:max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-3 sm:mb-4">
            <ul className="flex items-center flex-wrap gap-x-2 text-[#F7F6F3]/90 text-xs sm:text-sm font-medium uppercase tracking-widest">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <li>
                    <Link
                      href={crumb.href}
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

          {/* Main Title with Decorative Line */}
          <div className="relative inline-block mb-4 sm:mb-5 md:mb-6">
            <h1 className="text-[#F7F6F3] text-7xl font-['Playfair_Display'] font-bold leading-none pr-6 sm:pr-8 md:pr-12 uppercase tracking-tight">
              {title}
            </h1>

            {/* The Gold Decorative L-Shape Line (#D4A437) */}
            <div className="absolute -bottom-1 sm:bottom-0 md:bottom-4 left-full w-[20vw] sm:w-[30vw] md:w-[40vw] h-px sm:h-[2px] bg-[#D4A437]/60 hidden sm:block">
              {/* Vertical part of the line */}
              <div className="absolute right-0 top-0 w-px sm:w-[2px] h-20 sm:h-40 md:h-50 lg:h-70 bg-[#D4A437]/60" />
            </div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-[#F7F6F3] text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl font-light italic opacity-90">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Top Border with Brand Navy (#1F2A44) */}
      <div className="absolute top-0 left-0 w-full h-1 sm:h-[6px] bg-[#1F2A44] z-20" />
    </section>
  );
}