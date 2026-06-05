"use client";
import { ChevronRight } from "lucide-react";

const StudentClubs = () => {
  const clubData = [
    {
      category: "Pamavambo School Clubs",
      clubs: [
        {
          name: "Dance",
          desc: "Students express creativity and rhythm through coordinated dance performances at school events, competitions, and cultural celebrations.",
        },
        {
          name: "Drum Majorettes",
          desc: "A proud tradition of precision, discipline, and teamwork — our drum majorettes represent Pamavambo at parades, sports days, and community gatherings.",
        },
        {
          name: "Scripture Union",
          desc: "A faith-based club where students gather for Bible study, prayer, worship, and fellowship, growing in spiritual character and Christian values.",
        },
        {
          name: "Debate and Public Speaking",
          desc: "Students build confidence, critical thinking, and eloquence through debates, speeches, and inter-school public speaking competitions.",
        },
        {
          name: "Chess",
          desc: "Members develop strategic thinking, patience, and problem-solving skills through regular practice sessions and friendly tournaments.",
        },
      ],
    },
  ];

  return (
    <section className="bg-[#F7F6F3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-[#1F2A44] font-bold mb-6 sm:mb-8 tracking-tight border-l-4 border-[#D4A437] pl-6">
          School Clubs <span className="text-[#D4A437] italic font-medium">Pamavambo</span>
        </h2>

        <p className="text-[#222222] font-light leading-relaxed mb-16 max-w-4xl text-sm sm:text-base md:text-lg opacity-90 border-b border-[#D4A437]/20 pb-8">
          Beyond the classroom, Pamavambo students grow through clubs that build
          talent, faith, leadership, and teamwork — from dance and drum majorettes
          to debate, chess, and Scripture Union.
        </p>

        {/* Content */}
        <div className="space-y-16">
          {clubData.map((item, index) => (
            <div key={index}>
              {/* Category Title */}
              <div className="flex items-center mb-8 border-b border-[#D4A437]/10 pb-4">
                <ChevronRight className="mr-3 text-[#D4A437]" size={20} />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1F2A44] tracking-wide">
                  {item.category}
                </h3>
              </div>

              {/* Clubs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {item.clubs.map((club, i) => (
                  <div key={i} className="group">
                    <h4 className="font-bold text-[#1F2A44] text-base sm:text-lg md:text-xl mb-2 transition-colors duration-300 group-hover:text-[#D4A437]">
                      {club.name}
                    </h4>
                    <p className="text-[#222222] text-xs sm:text-sm md:text-base leading-relaxed font-light opacity-80 border-l border-transparent group-hover:border-[#D4A437] pl-0 group-hover:pl-4 transition-all duration-300 italic">
                      {club.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentClubs;