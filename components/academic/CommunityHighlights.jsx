"use client";

import Image from "next/image";

const highlights = [
  {
    title: "Our Faculty",
    icon: "/academic/child.png",
    desc: "Pamavambo educators are committed to building a community based on academic excellence achieved through the synergy of diverse perspectives and the boundless potential of their students.",
  },
  {
    title: "Our Students",
    icon: "/academic/raised-arm.png",
    desc: "Pamavambo students are good citizens, ambitious learners, and servant leaders. They make each other better and lift each other up. Our students are willing to make mistakes.",
  },
  {
    title: "Our Home",
    icon: "/academic/architecture-04.svg",
    desc: "Pamavambo Private School is an independent day school in Zvishavane, Zimbabwe, founded in January 2012. Whether you're exploring our school for the first time or are already part of our community, you'll discover an education that transforms.",
  },
];

export function CommunityHighlights() {
  return (
    <section id="community" className="bg-[#0F1B2D] text-[#F7F6F3] py-12 sm:py-16 md:py-24 px-4 sm:px-5 md:px-6 font-['Montserrat']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 md:gap-20">
        {highlights.map((item, i) => (
          <div key={i} className="space-y-6 group">
            {/* Icon with Gold Tint */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-transform duration-500 group-hover:-translate-y-2">
              <Image
                src={item.icon}
                alt={item.title}
                fill
                className="object-contain brightness-0 invert-[0.8] sepia-[1] saturate-[3] hue-rotate-[10deg] opacity-90"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
              />
              {/* Decorative Gold Underline for Icon */}
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#D4A437] opacity-60 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Title using Playfair Display */}
            <h3 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold tracking-tight text-[#D4A437]">
              {item.title}
            </h3>

            {/* Description with Montserrat */}
            <p className="text-sm md:text-base leading-relaxed text-[#F7F6F3] font-light opacity-80 italic">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}