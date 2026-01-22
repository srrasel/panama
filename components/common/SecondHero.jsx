"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SecondHero({
  backgroundImage = "/admission-hero.jpg",
  title = "Admission",
  subtitle = "Are you ready to become a Lawrentian?",
  breadcrumbs = [{ label: "Home", href: "/" }],
}) {
  return (
    <section className="relative w-full min-h-80 sm:min-h-96 md:min-h-screen flex items-center overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Darkening overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-8 lg:px-12 w-full">
        <div className="max-w-full md:max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-3 sm:mb-4">
            <ul className="flex items-center flex-wrap gap-x-2 text-white/90 text-xs sm:text-sm font-medium">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <li>
                    <Link
                      href={crumb.href}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-white/70">/</span>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>

          {/* Main Title with Decorative Line */}
          <div className="relative inline-block mb-4 sm:mb-5 md:mb-6">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-none pr-6 sm:pr-8 md:pr-12">
              {title}
            </h1>

            {/* The Gold Decorative L-Shape Line */}
            <div className="absolute -bottom-1 sm:bottom-0 md:bottom-4 left-full w-[20vw] sm:w-[30vw] md:w-[40vw] h-px sm:h-1 bg-amber-500/60 hidden sm:block">
              {/* Vertical part of the line seen in screenshot */}
              <div className="absolute right-0 top-0 w-px sm:w-1 h-20 sm:h-40 md:h-50 lg:h-70 bg-amber-500/60" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-full sm:max-w-xl md:max-w-2xl drop-shadow-lg">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Optional: Thin Red Top Border seen in screenshot */}
      <div className="absolute top-0 left-0 w-full h-px sm:h-1 bg-[#bc1a31] z-20" />
    </section>
  );
}
