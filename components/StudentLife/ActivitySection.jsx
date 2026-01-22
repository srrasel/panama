import Image from "next/image";

export default function ActivitySection() {
  // Hardcoded data within the component
  const items = [
    {
      image: "/student_life/ropes-course.jpg",
      textPrefix: "PAYING ATTENTION",
      highlightText: "TO THEMSELVES AND OTHERS",
    },
    {
      image: "/student_life/cleaning.jpg",
      textPrefix: "SEARCHING FOR MEANING",
      highlightText: "IN PATTERNS AND CYCLES",
    },
    {
      image: "/student_life/house-olympics.jpg",
      textPrefix: "CURIOUS, COURAGEOUS,",
      highlightText: "AND EXPRESSIVE",
    },
  ];

  return (
    <section className="w-full bg-[#610716] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Grid: 1 column on mobile, 3 columns on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col group">
              {/* Image Container with responsive aspect ratio */}
              <div className="relative aspect-[5/4] w-full overflow-hidden mb-4 sm:mb-5 md:mb-6 shadow-lg sm:shadow-xl">
                <Image
                  src={item.image}
                  alt={item.textPrefix}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>

              {/* Typography matching the School Branding with responsive sizing */}
              <p className="text-white text-xs sm:text-[10px] md:text-[11px] lg:text-xs text-center tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed sm:leading-relaxed md:leading-relaxed uppercase px-2 sm:px-0">
                <span className="font-extrabold">{item.textPrefix}</span>{" "}
                <span className="text-amber-500 font-medium">
                  {item.highlightText}
                </span>
                .
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
