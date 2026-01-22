"use client";

import Image from "next/image";

const houseImages = [
  "/student_life/piyano.jpg",
  "/student_life/lodo.jpg",
  "/student_life/tabletanis.jpg",
  "/student_life/adda.jpg",
  "/student_life/onugame.jpg",
  "/student_life/outtenis.jpg",
  "/student_life/readingtable.jpg",
  "/student_life/room.jpg",
];

export default function CampusSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 leading-relaxed md:leading-relaxed font-light text-sm sm:text-base md:text-[15px] lg:text-base">
            <p>
              Each Lawrenceville student belongs to a House. A House is a
              residential building which also serves as home base for our day
              students. Our Houses are located in three areas of campus — one
              for second formers (ninth grade), one for Third and Fourth Formers
              (10th and 11th grade), and one for Fifth Form (12th grade).
            </p>

            <p>
              All students benefit from the guidance and protection of
              residential faculty. Heads of House live in the residences with
              students and, with the support of House Teams, provide an adult
              presence for students at all times. Our residential faculty are
              also classroom teachers, coaches, and administrators, making them
              familiar and available to students throughout their time at the
              School.
            </p>

            <p>
              House life is not considered separate from education —
              students&apos; academic advisors are members of their House Team
              as well; students are developing the full picture of their future
              at once — the student in the House is the same student in the
              classroom, at practice, in the dining hall, and out in the world.
              Being seen and acknowledged as a complex individual builds empathy
              and curiosity in our students and faculty.
            </p>

            <p className="pt-4 md:pt-6 italic text-gray-500">
              Continue to our Campus page to explore our Houses and other
              community spaces.
            </p>
          </div>

          {/* Call to Action with Custom Icon */}
          <div className="pt-6 sm:pt-8 space-y-3 sm:space-y-4">
            <button className="flex flex-col items-start group">
              <span className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-black mb-1">
                Explore Campus By
              </span>
              <span className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-black border-b border-black pb-1 group-hover:text-[#bc1a31] group-hover:border-[#bc1a31] transition-colors">
                Taking a Virtual Tour.
              </span>
            </button>

            {/* Decorative Map Icon */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-26 lg:h-26">
              <Image
                src="/student_life/icon_map.png"
                alt="Map Icon"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 88px, (max-width: 1024px) 96px, 104px"
              />
            </div>
          </div>
        </div>

        {/* Right Column: 2-Column Image Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {houseImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-4/3 w-full shadow-sm sm:shadow-md overflow-hidden"
            >
              <Image
                src={src}
                alt={`House life ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
