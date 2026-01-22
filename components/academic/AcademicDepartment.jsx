import Image from "next/image";

const departments = [
  { name: "English", icon: "/academic/english.svg" },
  { name: "History", icon: "/academic/history.svg" },
  { name: "Interdisciplinary Studies", icon: "/academic/interdisiplinary.svg" },
  { name: "Language", icon: "/academic/language.svg" },
  { name: "Mathematics", icon: "/academic/mathematics.svg" },
  { name: "Performing Arts", icon: "/academic/performing-arts.svg" },
  { name: "Religion and Philosophy", icon: "/academic/religion.svg" },
  { name: "Science", icon: "/academic/science.svg" },
  { name: "Visual Arts", icon: "/academic/visual-arts.svg" },
];

export default function AcademicDepartments() {
  return (
    <section className="relative min-h-80 sm:min-h-96 md:min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/academic/background.jpg"
          alt="Campus Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-full sm:max-w-3xl mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#1a2b3c] mb-4 sm:mb-5 md:mb-6">
            Academic Departments
          </h2>
          <p className="text-[#444] text-xs sm:text-sm md:text-base leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl">
            Through a robust selection of courses, community service, and
            personal development, students discover who they are and what they
            stand for, strive to support a School culture of belonging, and
            contribute their unique intellect, passion, and drive to advance
            their communities.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#c5a367]">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="
                group
                relative
                aspect-square
                p-6 sm:p-8 md:p-10
                border-r border-b border-[#c5a367]
                flex flex-col justify-between
                overflow-hidden
                cursor-pointer
              "
            >
              {/* Red Hover Overlay */}
              <div
                className="
                  absolute inset-0 
                  bg-[#8b0000] 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity duration-300
                  z-0
                "
              />

              {/* Title */}
              <h3
                className="
                  relative z-10
                  text-base sm:text-lg md:text-xl font-bold text-[#1a2b3c]
                  group-hover:text-white
                  transition-colors duration-300
                "
              >
                {dept.name}
              </h3>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110">
                <Image
                  src={dept.icon}
                  alt={dept.name}
                  fill
                  className="
                    object-contain
                    filter
                    brightness-0
                    group-hover:invert
                    group-hover:brightness-100
                    transition-all duration-300
                  "
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
