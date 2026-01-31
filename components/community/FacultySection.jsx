import Image from "next/image";

const facultyFeatures = [
  {
    text: "Our faculty provides mentorship and guidance to help students discover and develop their intellectual interests, think critically and creatively about the world around them, and embrace the challenges and opportunities before them.\n\nFrom classroom learning and academic advisement, to athletic coaching and co-curriculars, to House life and hallway hellos, our talented and experienced faculty support students throughout each day. Often taking on many roles, they take pride in being a resource for each and every Lawrentian.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    alt: "Faculty mentor with students",
    reverse: false,
  },
  {
    text: "A strong campus community embraces all of our faculty members, many of whom live on campus and serve on House Duty Teams - spending time with and providing support for students in the evenings. The immersive, supportive, focused framework of a day on campus clears a path for collaborative thinking, professional development, and strong empathetic relationships built on trust, common experiences, and teamwork.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    alt: "Students smiling on campus",
    reverse: true,
  },
  {
    text: "We're always looking for the best young teachers and the mid- and late-career experts who can bring a diverse and ever-evolving perspective to the community. Each year, the School engages Teaching Fellows enrolled in the University of Pennsylvania's Boarding School Teacher Residency program, in which they work toward a master's degree in education. Teaching Fellows teach in an academic department, live on campus, and fully participate in the residential and co-curricular life of the School. By doing so, they not only bring their fresh perspective to the Pamavambo experience, they also learn from our experienced teaching and subject-matter experts.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    alt: "Graduation or formal event",
    reverse: false,
  },
];

export default function FacultySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      {facultyFeatures.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${
            feature.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-4">
            <div className="text-gray-600 text-sm leading-relaxed font-light whitespace-pre-line">
              {feature.text}
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm">
              <Image
                src={feature.image}
                alt={feature.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
