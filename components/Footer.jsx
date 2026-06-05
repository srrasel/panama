"use client";

import { ArrowRight, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mainNavLinks = [
  { name: "SCHOOL NEWS", href: "/life/news" },

  { name: "EMPLOYMENT", href: "/life/employment" },
];


export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white py-16 px-6 md:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Seal, Address, and Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 pb-16">
          {/* Left Group: Seal and Address */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-28 h-28 opacity-60">
              <Image
                src="/logo-school.png"
                alt="The Pamavambo Private School Seal"
                fill
                className="object-contain grayscale brightness-200"
              />
            </div>
            <div className="text-center md:text-left space-y-1">
              <p className="text-xs tracking-wide opacity-80">
                2500 Main Street
              </p>
              <p className="text-xs tracking-wide opacity-80">
                Pamavambo, NJ 08648
              </p>
              <p className="text-xs tracking-wide opacity-80">
                Admission: (609) 895-2030
              </p>
              <p className="text-xs tracking-wide opacity-80">
                Main: (609) 896-0400
              </p>
            </div>
          </div>

          {/* Right Group: CTAs and Social Icons */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex flex-col space-y-3 w-full max-w-60">
              <Link
                href="/inquire"
                className="flex justify-between items-center border border-[#FFD166]/50 px-5 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-[#FFD166] hover:text-black transition-all group"
              >
                INQUIRE
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/give"
                className="flex justify-between items-center border border-[#FFD166]/50 px-5 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-[#FFD166] hover:text-black transition-all group"
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
                className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
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
                className="text-[10px] font-bold tracking-[0.2em] opacity-80 hover:text-[#FFD166] hover:opacity-100 transition-all uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Legal Links and Branding */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
         

          <div className="flex flex-col items-center md:items-end">
            <p className="text-[9px] opacity-30 uppercase tracking-[0.2em] flex items-center gap-1">
              <span className="text-base leading-none">©</span> Powered by
              Finalsite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

