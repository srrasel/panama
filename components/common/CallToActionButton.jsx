"use client";

import Image from "next/image";
import Link from "next/link";

export default function CallToActionButton({
  title,
  description,
  buttonText,
  buttonHref = "#",
  imagePath,
  imageAlt,
}) {
  return (
    <section className="relative w-full min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] flex items-center px-4 sm:px-5 md:px-6 py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden font-['Montserrat']">
      {/* Background Image with Brand Navy Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imagePath}
          alt={imageAlt}
          fill
          className="object-cover grayscale-[0.3]"
          priority
          sizes="100vw"
        />
        {/* Navy Tint for deep, professional look */}
        <div className="absolute inset-0 bg-[#1F2A44]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2D]/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-5 md:px-6 relative z-20">
        {/* Content Box */}
        <div className="max-w-full sm:max-w-xl md:max-w-2xl text-[#F7F6F3] space-y-6 sm:space-y-8">
          {/* Title using Playfair Display */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-['Playfair_Display'] font-bold leading-tight tracking-tight">
            {title}
          </h2>

          {/* Description with Gold accent line */}
          <div className="border-l-4 border-[#D4A437] pl-6">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed font-light italic opacity-90">
              {description}
            </p>
          </div>

          {/* Action Button using Brand Gold (#D4A437) */}
          <Link
            href={buttonHref}
            className="group flex items-center justify-between bg-[#D4A437] hover:bg-[#E6C26A] transition-all duration-500 px-6 sm:px-8 py-4 sm:py-5 w-full max-w-full sm:max-w-72 text-[#0F1B2D] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-2xl rounded-none"
          >
            <span className="text-left truncate">{buttonText}</span>
            <svg
              className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Signature Gold Border (#D4A437) positioned inside */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 border-2 sm:border-4 border-[#D4A437]/30 pointer-events-none z-10" />
    </section>
  );
}