"use client";
import { ChevronRight } from "lucide-react";

const StudentClubs = () => {
  const clubData = [
    {
      category: "Academic Clubs",
      clubs: [
        {
          name: "20/20 Design Council",
          desc: "The 20/20 Design Council works closely with Head of School Murray and the architects from the Sasaki Architecture Firm to provide student input on new construction projects on campus.",
        },
        {
          name: "Learning Leadership at Pamavambo",
          desc: "Learning Leadership at Pamavambo teaches students how to establish positive leadership roles on campus and effectively create change within our community.",
        },
        {
          name: "3D Design Club",
          desc: "We aim to foster design thinking skills through introducing 3D design and modeling software to those who would like to learn and explore more.",
        },
        {
          name: "Linguistics Club",
          desc: "The Linguistics Club aims to introduce and educate students on the syntaxes and semantics of various languages through hosting entertaining documentary sessions to solving logical problems.",
        },
        {
          name: "Architecture Club",
          desc: "Our goal is to focus on learning the basics of Architecture by studying buildings around campus as well as buildings around the world.",
        },
        {
          name: "Making Philosophy Easy",
          desc: "Our club has one mission: to make philosophy accessible to everybody and to provide new outlooks for our club member's lives.",
        },
      ],
    },
    {
      category: "Game Clubs",
      clubs: [
        {
          name: "Varsity E-Sports",
          desc: "Focuses on competitive gaming and strategy development in a team-based environment.",
        },
        {
          name: "Chess Strategy Group",
          desc: "Dedicated to mastering opening theories and endgame tactics through weekly tournaments.",
        },
      ],
    },
    {
      category: "Creative Clubs",
      clubs: [
        {
          name: "Pamavambo Film Society",
          desc: "A group dedicated to the appreciation of cinema and the production of student-led short films.",
        },
        {
          name: "The Big Red Zine",
          desc: "A creative writing and visual arts publication highlighting student voices.",
        },
      ],
    },
    {
      category: "Religious Clubs",
      clubs: [
        {
          name: "Multicultural Student Union",
          desc: "Promotes awareness and celebration of the diverse backgrounds within our student body.",
        },
        {
          name: "Interfaith Council",
          desc: "A space for students of all spiritual backgrounds to discuss and share their traditions.",
        },
      ],
    },
  ];

  return (
    <section className="bg-[#F7F6F3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-[#1F2A44] font-bold mb-6 sm:mb-8 tracking-tight border-l-4 border-[#D4A437] pl-6">
          Student Clubs and <span className="text-[#D4A437] italic font-medium">Organizations</span>
        </h2>

        <p className="text-[#222222] font-light leading-relaxed mb-16 max-w-4xl text-sm sm:text-base md:text-lg opacity-90 border-b border-[#D4A437]/20 pb-8">
          Student Clubs and Organizations offer the opportunity for students to
          discover and pursue personal interests — from academic topics to
          performance to community development and service — and to meet and
          learn from like-minded Pamavambo students.
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