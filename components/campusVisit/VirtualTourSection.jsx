"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, Play } from "lucide-react";
import Image from "next/image";

export default function VirtualTourSection() {
  const tourData = [
    {
      title: "Houses",
      intro:
        "Your House is not just a place to live — it's where you start your journey, form lifelong bonds, and develop values you will carry for life. Each House has its own unique identity, events, and spirit. Whether you are a day or boarding student, your assigned House will become your home.",
      videos: [
        {
          label: "DAWES HOUSE, GIRLS' LOWER",
          image: "https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=1000",
        },
        {
          label: "RAYMOND HOUSE, BOYS' LOWER",
          image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000",
        },
        {
          label: "STEPHENS HOUSE, THE CRESCENT",
          image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000",
        },
        {
          label: "DICKINSON HOUSE, THE CIRCLE",
          image: "https://images.unsplash.com/photo-1498243639359-2ead1ca70f45?q=80&w=1000",
        },
      ],
    },
    {
      title: "Classrooms and Library",
      intro:
        "Our academic spaces are designed for the Harkness method, fostering discussion, collaboration, and deep intellectual inquiry across all disciplines.",
      videos: [
        {
          label: "BUNN LIBRARY",
          image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000",
        },
        {
          label: "HARKNESS CLASSROOMS",
          image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
        },
      ],
    },
    {
      title: "Athletics",
      intro:
        "With world-class facilities and a philosophy of 'athletics for all,' our students develop leadership and resilience on and off the field.",
      videos: [
        {
          label: "LAVINO FIELD HOUSE",
          image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
        },
        {
          label: "KEUFFEL STADIUM",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000",
        },
      ],
    },
    {
      title: "Performing and Visual Arts",
      intro:
        "Creativity thrives here. From the main stage to the studio, students find their voice through a diverse range of artistic expressions.",
      videos: [
        {
          label: "KIRBY ARTS CENTER",
          image: "https://images.unsplash.com/photo-1503095394537-8c54d136b04d?q=80&w=1000",
        },
        {
          label: "GRUSS CENTER FOR ART AND DESIGN",
          image: "https://images.unsplash.com/photo-1460518451285-cd7afdf195de?q=80&w=1000",
        },
      ],
    },
    {
      title: "Dining and Community",
      intro:
        "Breaking bread together is a cornerstone of our community. Our dining halls are places of fellowship, laughter, and shared stories.",
      videos: [
        {
          label: "IRWIN DINING CENTER",
          image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1000",
        },
        {
          label: "ABBOTT DINING HALL",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
        },
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 font-['Montserrat']">
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#1F2A44] mb-12 border-l-4 border-[#D4A437] pl-6 uppercase tracking-tight">
          Too excited to wait? Take our virtual tour!
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {tourData.map((section, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="bg-white hover:bg-[#F7F6F3] data-[state=open]:bg-[#1F2A44] data-[state=open]:text-[#F7F6F3] px-6 py-5 hover:no-underline group transition-all duration-300 rounded-none shadow-sm">
                <div className="flex items-center gap-6">
                  <ChevronRight
                    size={18}
                    className="text-[#D4A437] transition-all duration-300 group-data-[state=open]:rotate-90"
                  />
                  <span className="text-xs font-bold tracking-[0.25em] uppercase">
                    {section.title}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="bg-white border-x border-b border-[#D4A437]/10 p-8 md:p-16">
                <div className="space-y-12">
                  {/* Introductory Text */}
                  <div className="border-l-2 border-[#D4A437] pl-8">
                    <p className="text-base leading-relaxed text-[#222222] font-light italic max-w-5xl opacity-80">
                      {section.intro}
                    </p>
                  </div>

                  {/* Video/Image Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {section.videos.map((video, vIdx) => (
                      <div key={vIdx} className="group cursor-pointer">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-[#1F2A44] uppercase mb-4 border-b border-[#D4A437]/20 pb-2">
                          {video.label}
                        </p>
                        <div className="relative aspect-video w-full overflow-hidden shadow-xl">
                          <Image
                            src={video.image}
                            alt={video.label}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-[#1F2A44]/10 group-hover:bg-[#1F2A44]/30 transition-all duration-500">
                            <div className="w-14 h-10 bg-[#D4A437] rounded-none flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                              <Play
                                size={20}
                                className="text-[#0F1B2D] fill-[#0F1B2D] ml-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bottom Hero Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center border-t border-[#D4A437]/20 pt-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl  group">
          <Image
            src="/new/image16.jpeg"
            alt="Campus Life"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="space-y-10">
          <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#1F2A44] leading-[1.1] tracking-tight">
            Step Into <br /> <span className="text-[#D4A437] italic font-medium">Pamavambo</span>
          </h2>
          <div className="w-20 h-1 bg-[#D4A437] mb-8" />
          <p className="text-[#222222] text-lg md:text-xl leading-relaxed font-light opacity-90 italic">
            Visiting Pamavambo is just the beginning of discovering what&apos;s
            possible. Walking through campus, you&apos;ll start to imagine yourself
            diving into classes that challenge you, joining teammates on the
            field, rehearsing on stage, or making an impact through service.
          </p>
        </div>
      </div>
    </section>
  );
}