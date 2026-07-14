"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Christy Aponte",
    title: "Director of Data Management Strategy and Operations, Office of Admission",
    email: "caponte@pamavambo.org",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dana E. Brown",
    title: "Director, Office of Admission",
    email: "dbrown@pamavambo.org",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Yangyang Daniell",
    title: "Senior Assistant Director, Office of Admission",
    email: "ydaniell@pamavambo.org",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Christi Ding",
    title: "Director of Admission Communications Associate Director, Office of Admission",
    email: "cding@pamavambo.org",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Cindy Ehret '95 H'03 P'28",
    title: "Interviewer, Office of Admission",
    email: "cehret@pamavambo.org",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Lisa Ewanchyna",
    title: "Senior Associate Director, Office of Admission",
    email: "lewanchyna@pamavambo.org",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Lauren Gold",
    title: "Director of Scholarship Aid, Office of Admission",
    email: "lgold@pamavambo.org",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Brian Jacobs H'22 P'29",
    title: "Department Chair and French Teacher, Language Department; Faculty Interviewer",
    email: "bjacobs@pamavambo.org",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
  },
];

export default function AdmissionTeam() {
  return (
    <section className="w-full bg-[#F7F6F3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-[#1F2A44] mb-10 sm:mb-14 md:mb-20 border-b border-[#D4A437]/20 pb-4 sm:pb-6">
          Meet the <span className="text-[#D4A437] italic font-medium">Admission Team</span>
        </h2>

        {/* Team Container using Flex Wrap */}
        <div className="flex flex-wrap -mx-2 sm:-mx-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-4 mb-8 sm:mb-10 md:mb-12 flex flex-col items-center text-center group"
            >
              <div className="relative w-36 sm:w-40 md:w-48 aspect-square mb-4 sm:mb-6">
                {/* Gold border ring (#D4A437) */}
                <div className="absolute inset-0 rounded-full border-4 border-[#D4A437] pointer-events-none z-20 group-hover:scale-105 transition-transform duration-500" />

                {/* Image container */}
                <div className="absolute inset-2 rounded-full overflow-hidden z-10 bg-white shadow-inner">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="192px"
                    className="rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index < 4}
                  />
                </div>
              </div>

              {/* Text Information Area */}
              <div className="flex flex-col items-center space-y-3 mb-4 h-full">
                <h3 className="text-lg font-bold text-[#1F2A44] leading-tight font-['Playfair_Display']">
                  {member.name}
                </h3>
                <p className="text-[11px] leading-relaxed text-[#222222] opacity-70 max-w-[200px] font-semibold uppercase tracking-wider">
                  {member.title}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-[12px] font-bold text-[#D4A437] hover:text-[#1F2A44] transition-colors border-b border-transparent hover:border-[#1F2A44] pb-0.5"
                >
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}