"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const messages = [
  {
    id: 1,
    date: "NOV '25",
    title: "The Magic of the House System",
    content: (
      <div className="space-y-4 sm:space-y-5 md:space-y-6 text-xs sm:text-[13px] leading-relaxed text-gray-800 font-light">
        <p>
          The Lawrenceville School is best experienced through the lens of the
          House System. Having gone to boarding school and worked at three other
          boarding schools, I can attest that the differentiating factor of
          Lawrenceville is the magic within the House System. Not Harry Potter
          magic but the magical power of support, friendship, encouragement,
          trust, and growth that happens within a Lawrenceville student's House
          experience.
        </p>
        <p>
          In addition to my role in the admission office, I serve as a Head of
          House for 49 tenth and eleventh grade students in the Stephens House.
          Additionally, my spouse teaches and coaches at Lawrenceville. Every
          day, we actively choose to raise our family in Stephens.
        </p>
        <div className="pt-3 sm:pt-4">
          <p className="font-bold text-gray-900">Christi Ding</p>
          <p className="text-gray-600">Director of Admission Communications</p>
          <p className="text-gray-600">Associate Dean of Admission</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    date: "OCT '25",
    title: "The Heart of Lawrenceville: Learn. Live. Grow.",
    content: (
      <p className="text-sm text-gray-600">Content for October message...</p>
    ),
  },
  {
    id: 3,
    date: "SEP '25",
    title: "It's Not a Competition. It's Finding Home.",
    content: (
      <p className="text-sm text-gray-600">Content for September message...</p>
    ),
  },
];

export default function AdmissionMessages() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a]">
          Messages from the Admission Team
        </h2>

        <div className="space-y-2 sm:space-y-4">
          {messages.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-gray-100 last:border-none"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 transition-colors ${
                    isOpen
                      ? "bg-[#8a1524] text-white"
                      : "bg-[#f9f9f9] text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="shrink-0">
                    {isOpen ? (
                      <ChevronDown size={16} className="sm:size-[18px]" />
                    ) : (
                      <ChevronRight size={16} className="sm:size-[18px]" />
                    )}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 sm:gap-2">
                    <span
                      className={isOpen ? "text-white/80" : "text-gray-400"}
                    >
                      {item.date}
                    </span>
                    <span className="mx-1">|</span>
                    <span className="text-left">{item.title}</span>
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-screen opacity-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
