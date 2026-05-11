"use client";

import Image from "next/image";
import Link from "next/link";

const DualActionCards = ({ 
  cardData = [
    {
      title: "Ready to Learn. Ready for Life.",
      description:
        "A Pamavambo graduate is ready. Ready to embrace higher education and engage in the professional world; to create cultures of belonging; to enter any conversation with confidence and an open mind.",
      buttonText: "Academics at Pamavambo",
      href: "/academics",
      backgroundImage: "/new/Picture4.png",
    },
    {
      title: "The Classroom Extends.",
      description:
        "When participating in co-curriculars, students learn through shared experience, varying perspectives, and a mutual accountability that encourages tenacity, resilience, empathy, and compassionate objectivity.",
      buttonText: "Co-Curriculars",
      href: "/academics",
      backgroundImage: "/new/Picture5.png",
    },
  ] 
}) => {
  return (
    <section className="w-full bg-[#F7F6F3] py-16 md:py-24 px-6 md:px-12 lg:px-20 font-['Montserrat']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-8 md:p-12 group"
          >
            {/* Background Image with Navy Overlay (#0F1B2D) */}
            <div className="absolute inset-0 z-0">
              <Image
                src={card.backgroundImage}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-[#0F1B2D]/60 group-hover:bg-[#0F1B2D]/75 transition-colors duration-500" />
            </div>

            {/* Decorative Gold Border Frame (#D4A437) */}
            <div className="absolute inset-4 md:inset-10 border-2 border-[#D4A437] z-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-start text-left space-y-4 md:space-y-6 max-w-sm md:max-w-md">
              <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold text-white leading-tight">
                {card.title}
              </h2>

              <p className="text-[#F7F6F3] text-xs md:text-sm font-light leading-relaxed opacity-90 italic">
                {card.description}
              </p>

              <Link
                href={card.href}
                className="inline-block bg-[#D4A437] text-[#0F1B2D] text-[10px] md:text-xs font-bold tracking-widest uppercase px-6 py-3 md:px-8 md:py-4 hover:bg-[#E6C26A] transition-colors duration-300 rounded-none shadow-lg"
              >
                {card.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DualActionCards;