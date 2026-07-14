"use client";

import Image from "next/image";

const FeaturedSpaces = () => {
  const spaces = [
    {
      title: "TSAI FIELD HOUSE",
      image: "/TSAIFIELD.jpeg",
      objectPosition: "center top",
    },
    {
      title: "GRUSS CENTER FOR ART AND DESIGN",
      image: "/GRUSSCENTER.jpeg",
      objectPosition: "center center",
    },
    {
      title: "HUTCHINS GALLERIES",
      image: "/campusbg.jpeg",
      objectPosition: "center 30%",
    },
  ];

  return (
    <section className="bg-[#F7F6F3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="w-8 sm:w-12 h-[2px] bg-[#D4A437] shrink-0" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#1F2A44] tracking-tight uppercase">
            Featured <span className="text-[#D4A437] italic font-medium">Spaces</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-stretch">
          {spaces.map((space, index) => (
            <div key={index} className="group cursor-pointer flex flex-col h-full">
              <div className="relative aspect-[4/5] mb-4 sm:mb-6 overflow-hidden bg-[#F7F6F3] border border-[#E5E7EB] shadow-sm group-hover:shadow-xl transition-all duration-500">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: space.objectPosition }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#1F2A44]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="inline-block relative mt-auto">
                <h3 className="text-[11px] font-bold tracking-[0.25em] text-[#1F2A44] uppercase group-hover:text-[#D4A437] transition-colors duration-300">
                  {space.title}
                </h3>
                <div className="h-[1px] w-0 bg-[#D4A437] transition-all duration-500 group-hover:w-full mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;
