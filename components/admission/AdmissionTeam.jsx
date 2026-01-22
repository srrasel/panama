import Image from "next/image"; // Import Next.js Image component

const teamMembers = [
  {
    name: "Christy Aponte",
    title:
      "Director of Data Management Strategy and Operations, Office of Admission",
    email: "caponte@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Dana E. Brown",
    title: "Director, Office of Admission",
    email: "dbrown@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Yangyang Daniell",
    title: "Senior Assistant Director, Office of Admission",
    email: "ydaniell@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Christi Ding",
    title:
      "Director of Admission Communications Associate Director, Office of Admission",
    email: "cding@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Cindy Ehret '95 H'03 P'28",
    title: "Interviewer, Office of Admission",
    email: "cehret@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Lisa Ewanchyna",
    title: "Senior Associate Director, Office of Admission",
    email: "lewanchyna@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Lauren Gold",
    title: "Director of Scholarship Aid, Office of Admission",
    email: "lgold@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Brian Jacobs H'22 P'29",
    title:
      "Department Chair and French Teacher, Language Department; Faculty Interviewer",
    email: "bjacobs@lawrenceville.org",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
  },
];

export default function AdmissionTeam() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-20">
          Meet the Admission Team
        </h2>

        {/* Team Container using Flex Wrap */}
        <div className="flex flex-wrap -mx-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-10 flex flex-col items-center text-center group"
            >
              <div className="relative w-48 aspect-square mb-6">
                {/* Red border ring */}
                <div className="absolute inset-0 rounded-full border-4 border-[#bc1a31] pointer-events-none z-20" />

                {/* Image container */}
                <div className="absolute inset-1 rounded-full overflow-hidden z-10 bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="192px"
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Text Information Area */}
              <div className="flex flex-col items-center space-y-2 mb-4 h-full min-h-35">
                <h3 className="text-[15px] font-bold text-[#1a1a1a] leading-tight">
                  {member.name}
                </h3>
                <p className="text-[11px] leading-relaxed text-gray-700 max-w-50">
                  {member.title}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-[11px] font-medium text-[#bc1a31] hover:underline px-2"
                >
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
