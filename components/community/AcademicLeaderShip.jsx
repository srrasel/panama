import Image from "next/image";

const leaders = [
  {
    name: "Zaheer Ali",
    title:
      "Executive Director, Hutchins Center for Civic Tracker, History Department",
    email: "zali@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
  },
  {
    name: "Miguel Bayona P'12 '18",
    title:
      "Department Chair, Mathematics Department, The John C. Wellemeyer '55 P'18 Teaching Chair for Math and Science",
    email: "mbayona@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
  },
  {
    name: "Etienne Bilodeau",
    title: "Acting Dean of Academics, Teacher, Mathematics Department",
    email: "ebilodeau@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
  },
  {
    name: "Matthew Campbell",
    title:
      "Department Chair and Director of Theatre, Performing Arts Department, Allan P. Kirby Chair for Performing Arts",
    email: "mcampbell@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000",
  },
  {
    name: "Craig Cetulo",
    title:
      "Director of Teaching and Learning, Office of the Dean of Academics; Teacher, English Department",
    email: "ccetulo@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000",
  },
  {
    name: "Brian Jacobs H'22 P'29",
    title:
      "Department Chair and French Teacher, Language Department; Faculty Interviewer, Office of Admission, Independence Foundation Chair of 1960",
    email: "bjacobs@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000",
  },
  {
    name: "Phil Jordan",
    title:
      "Chair, Religion and Philosophy Department; Leader for Buddhism, Religious Life, The Dana C. Rumpf and Josiah Bunting III Distinguished Teaching Chair",
    email: "pjordan@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
  },
  {
    name: "Chloe Kalna",
    title:
      "Department Chair, Visual Arts Department; Modern Dance Instructor, Performing Arts Department",
    email: "ckalna@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000",
  },
  {
    name: "Jessica Magnuson",
    title: "Director of Academic Support, Office of the Dean of Academics",
    email: "jmagnuson@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000",
  },
  {
    name: "Julie Mellor",
    title:
      "Director of the Experiential Education, Office of the Dean of Academics; Teacher, History Department",
    email: "jmellor@pamavambo.org",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1000",
  },
];

export default function AcademicLeadership() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white font-sans">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column: Icon/Logo */}
        <div className="w-full md:w-1/4 flex justify-center md:justify-start pt-2">
          <div className="relative w-32 h-32 opacity-40">
            {/* Simple SVG icon representing the school building logo in the screenshot */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="#b08d57"
              strokeWidth="1.5"
            >
              <path d="M10 90 L90 90 M20 90 L20 40 L50 20 L80 40 L80 90 M50 20 L50 90 M35 90 L35 70 L65 70 L65 90" />
              <circle cx="50" cy="35" r="5" />
            </svg>
          </div>
        </div>

        {/* Right Column: Title and Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-3xl font-serif text-[#1a2b3c] mb-12">
            Academic Leadership
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Profile Image with Crimson Border */}
                <div className="relative w-32 h-32 mb-6 rounded-full border-2 border-[#8c122a] p-1 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Leader Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-[15px] text-gray-900 leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-gray-600 font-light px-2">
                    {leader.title}
                  </p>
                  <a
                    href={`mailto:${leader.email}`}
                    className="block text-[11px] text-[#8c122a] border-b border-[#8c122a] w-fit mx-auto mt-2 hover:opacity-70 transition-opacity"
                  >
                    {leader.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
