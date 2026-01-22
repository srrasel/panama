"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Health and Wellness",
    description:
      "Wellness and inclusion work are inextricably tied with the thread of belonging - bringing people together in thoughtful and deliberate ways to reinforce a sense of community. With a hub at the Al Rashid Health and Wellness Center, student wellness is considered through all aspects of life.",
    icon: "/student_life/icon_first-aid.png",
    href: "/health",
  },
  {
    title: "Public Safety",
    description:
      "The School's strategic approach to security planning integrates best practices in training, policy development, physical security, drills, technology, and coordination with local first responders. Officers are on duty 24 hours a day, 7 days a week.",
    icon: "/student_life/icons8-safety-500.png",
    href: "/safety",
  },
  {
    title: "Dining",
    description:
      "The Lawrenceville community is healthy and strong. We approach dining as a time to build relationships just as much as a time to nourish and sustain ourselves. We accommodate dietary restrictions, offer culturally responsive options, and create opportunities for learning and connection.",
    icon: "/student_life/icon_peopleattable.png",
    href: "/dining",
  },
  {
    title: "Diversity and Belonging",
    description:
      "Learning is enriched when it happens among students with different backgrounds, experiences, and perspectives. We are proud of our diverse and welcoming community and we mindfully support each student's identity.",
    icon: "/student_life/icon_venn-diagram.png",
    href: "/diversity",
  },
];

export default function SpecialitySection() {
  return (
    <section className="w-full bg-gray-100 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Icon Container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 72px"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-black tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-sm md:text-[15px] leading-relaxed sm:leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>

              {/* Learn More Button */}
              <Link
                href={feature.href}
                className="inline-block bg-black text-white text-[10px] sm:text-[10px] md:text-[10px] font-bold tracking-widest uppercase px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 hover:bg-[#bc1a31] transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
