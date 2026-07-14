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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 font-['Montserrat']">
   
      {/* Bottom Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center border-t border-[#D4A437]/20 pt-10 sm:pt-14 md:pt-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl  group">
          <Image
            src="/new/image16.jpeg"
            alt="Campus Life"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Playfair_Display'] font-bold text-[#1F2A44] leading-[1.1] tracking-tight">
            Step Into <br /> <span className="text-[#D4A437] italic font-medium">Pamavambo</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-[#D4A437] mb-4 sm:mb-6 md:mb-8" />
          <p className="text-[#222222] text-base sm:text-lg md:text-xl leading-relaxed font-light opacity-90 italic">
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