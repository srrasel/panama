"use client";

import Image from "next/image";
import Link from "next/link";

const cardData = [
  {
    title: "Ready to Learn. Ready for Life.",
    description:
      "A Lawrenceville graduate is ready. Ready to embrace higher education and engage in the professional world; to create cultures of belonging; to enter any conversation with confidence and an open mind.",
    buttonText: "Academics at Lawrenceville",
    href: "/academics",
    backgroundImage: "/student_life/cards1.jpg", // Replace with your image path
  },
  {
    title: "The Classroom Extends.",
    description:
      "When participating in co-curriculars, students learn through shared experience, varying perspectives, and a mutual accountability that encourages tenacity, resilience, empathy, and compassionate objectivity.",
    buttonText: "Co-Curriculars",
    href: "/co-curriculars",
    backgroundImage: "/student_life/cards2.jpg", // Replace with your image path
  },
];

export default function DualActionCards() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-8 md:p-12"
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={card.backgroundImage}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Decorative Gold Border Frame */}
            <div className="absolute inset-4 md:inset-10 border-2 border-[#b89149] z-10 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-start text-left space-y-4 md:space-y-6 max-w-sm md:max-w-md">
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                {card.title}
              </h2>

              <p className="text-white text-xs md:text-sm font-light leading-relaxed opacity-90">
                {card.description}
              </p>

              <Link
                href={card.href}
                className="inline-block bg-[#bc1a31] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-6 py-3 md:px-8 md:py-4 hover:bg-[#9a1628] transition-colors duration-300"
              >
                {card.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
