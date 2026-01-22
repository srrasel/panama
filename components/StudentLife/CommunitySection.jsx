"use client";

import Image from "next/image";

const supportCategories = [
  {
    id: 1,
    name: "A CULTURE OF SUPPORT",
    image: "/student_life/grid_cultureofsupport.jpg",
  },
  {
    id: 2,
    name: "CLASSROOM TEACHERS",
    image: "/student_life/grid_classroomteachers.jpg",
  },
  { id: 3, name: "COACHES", image: "/student_life/grid_coaches.jpg" },
  {
    id: 4,
    name: "RESIDENTIAL FACULTY",
    image: "/student_life/grid_residentialfaculty.jpg",
  },
  { id: 5, name: "ADVISORS", image: "/student_life/grid_advisors.jpg" },
  {
    id: 6,
    name: "PROGRAM LEADERS",
    image: "/student_life/grid_programleaders.jpg",
  },
  { id: 7, name: "CHAPERONES", image: "/student_life/grid_chaperones.jpg" },
  {
    id: 8,
    name: "ADMINISTRATION",
    image: "/student_life/grid_administrators.jpg",
  },
  { id: 9, name: "PARENTS", image: "/student_life/grid_parents.jpg" },
];

export default function CommunitySection() {
  return (
    <section className="w-full bg-[#fdfaf3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* 1. Left Side: Interactive Grid Navigation */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3">
          {supportCategories.map((category) => (
            <div
              key={category.id}
              className="relative aspect-square overflow-hidden"
            >
              {/* Image with Color Overlay */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              {/* Category Label */}
            </div>
          ))}
        </div>
        {/* 2. Right Side: Dynamic Content Display */}
        <div className="w-full lg:w-1/2">
          <div className="mb-6 sm:mb-7 md:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-serif text-[#1a1a1a] mb-3 sm:mb-4">
              Community Spaces
            </h3>
            <p className="text-xs sm:text-xs md:text-sm text-gray-600 leading-relaxed sm:leading-relaxed font-light mb-6 sm:mb-7 md:mb-8 max-w-xl">
              While Houses are a student's home base, they are far from the only
              place that feels like home at Lawrenceville. Our campus is
              designed to facilitate socialization, wellness activities, and
              memorable gatherings. From large, outdoor areas to cozy study
              rooms, students always have spaces that support their needs.
            </p>
          </div>

          {/* Large Preview Image */}
          <div className="relative aspect-4/3 w-full shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden">
            <Image
              src="/student_life/tabs_fire.jpg"
              alt="community"
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative "GO BIG RED!" Frame Overlay logic if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}
