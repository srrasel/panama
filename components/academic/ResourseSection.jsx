"use client";

import Image from "next/image";

const resourceData = [
  {
    title: "Library",
    description: "Explore, research, and discover in our digital library.",
    image: "/new/image16.jpeg",
  },
  {
    title: "Community",
    description:
      "A vibrant community of students, families, and educators united by shared values, cultural pride, and commitment to excellence with purpose.",
    image: "/new/image10.jpeg",
  },
];

export default function ResourceSection() {
  return (
    <section className="bg-[#1F2A44] py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 font-['Montserrat']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24">
        {resourceData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col space-y-6 sm:space-y-8 group"
          >
            {/* Next.js Image wrapper with Sharp Editorial Styling */}
            <div className="relative aspect-[4/3] w-full overflow-hidden ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
              {/* Subtle Brand Overlay */}
              <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Text Content */}
            <div className="space-y-3 sm:space-y-4 text-[#F7F6F3]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[2px] bg-[#D4A437]" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold italic text-[#D4A437]">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed opacity-90 font-light border-l border-[#D4A437]/30 pl-4 italic">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}