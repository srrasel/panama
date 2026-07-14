"use client";

import { ArrowRight, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mainNavLinks = [
  { name: "SCHOOL NEWS", href: "/life/news" },
  { name: "Employment", href: "/life/employment" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F1B2D] text-[#F7F6F3] py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-[#D4A437]/30 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Seal, Address, and Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 sm:gap-10 md:gap-12 pb-10 sm:pb-12 md:pb-16">
          {/* Left Group: Seal and Address */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44">
              <Image
                src="/new/logo.png"
                alt="The Pamavambo Private School Seal"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center md:text-left space-y-1">
              <p className="text-xs tracking-wide opacity-80">
                731 Drinkwater Avenue
              </p>
              <p className="text-xs tracking-wide opacity-80">Zvishavane</p>
              <p className="text-xs tracking-wide opacity-80">Zimbabwe</p>
            </div>
          </div>

          {/* Right Group: CTAs and Social Icons */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex flex-col space-y-3 w-full max-w-60">
              <Link
                href="/admission/inquire"
                className="flex justify-between items-center border border-[#D4A437]/50 px-5 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-[#D4A437] hover:text-[#0F1B2D] transition-all group"
              >
                INQUIRE
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/admission/application"
                className="flex justify-between items-center border border-[#D4A437]/50 px-5 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-[#D4A437] hover:text-[#0F1B2D] transition-all group"
              >
                GIVE NOW
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Social Icons - Clean Row */}
            <div className="flex space-x-6">
              <Facebook
                size={18}
                className="cursor-pointer text-[#D4A437] opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Main Site Navigation Links */}
        <div className="border-t border-white/10 pt-8 pb-4">
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.2em] opacity-80 hover:text-[#D4A437] hover:opacity-100 transition-all uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}