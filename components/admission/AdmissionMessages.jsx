"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const messages = [
  {
    id: 1,
    date: "NOV '25",
    title: "The Magic of the House System",
    content: (
      <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base leading-relaxed text-[#222222] font-light">
        <p>
          The Pamavambo Private School is best experienced through the lens of the
          House System. Having gone to boarding school and worked at three other
          boarding schools, I can attest that the differentiating factor of
          Pamavambo is the magic within the House System. Not Harry Potter
          magic but the magical power of support, friendship, encouragement,
          trust, and growth that happens within a Pamavambo student's House
          experience.
        </p>
        <p>
          In addition to my role in the admission office, I serve as a Head of
          House for 49 tenth and eleventh grade students in the Stephens House.
          Additionally, my spouse teaches and coaches at Pamavambo. Every
          day, we actively choose to raise our family in Stephens.
        </p>
        <div className="pt-4 border-t border-[#D4A437]/20">
          <p className="font-bold text-[#1F2A44] font-['Playfair_Display'] text-lg">Christi Ding</p>
          <p className="text-[#D4A437] text-xs font-bold uppercase tracking-widest mt-1">Director of Admission Communications</p>
          <p className="text-[#222222]/60 text-[10px] uppercase font-semibold">Associate Dean of Admission</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    date: "OCT '25",
    title: "The Heart of Pamavambo: Learn. Live. Grow.",
    content: (
      <p className="text-sm text-[#222222]/70 italic">Content for October message...</p>
    ),
  },
  {
    id: 3,
    date: "SEP '25",
    title: "It's Not a Competition. It's Finding Home.",
    content: (
      <p className="text-sm text-[#222222]/70 italic">Content for September message...</p>
    ),
  },
];

export default function AdmissionMessages() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="w-full  py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 font-['Montserrat']">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#1F2A44] border-l-4 border-[#D4A437] pl-6">
          Messages from the <span className="italic font-medium">Admission Team</span>
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {messages.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border border-[#D4A437]/10 bg-white shadow-sm transition-all duration-500"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`w-full flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-5 transition-all duration-300 ${
                    isOpen
                      ? "bg-[#1F2A44] text-[#F7F6F3]"
                      : "bg-white text-[#1F2A44] hover:bg-[#F7F6F3]"
                  }`}
                >
                  <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "text-[#D4A437]" : "text-[#1F2A44]"}`}>
                    {isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase flex flex-wrap items-center gap-2">
                    <span
                      className={isOpen ? "text-[#D4A437]" : "text-[#D4A437] opacity-80"}
                    >
                      {item.date}
                    </span>
                    <span className={`mx-1 opacity-30 ${isOpen ? "text-white" : "text-[#1F2A44]"}`}>|</span>
                    <span className="text-left font-['Montserrat'] tracking-widest">{item.title}</span>
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-[1000px] opacity-100 py-6 sm:py-10 px-6 sm:px-12"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="max-w-3xl">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}