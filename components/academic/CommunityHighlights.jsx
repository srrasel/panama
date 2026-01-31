import Image from "next/image";

const highlights = [
  {
    title: "Our Faculty",
    icon: "/academic/child.png",
    desc: "Pamavambo educators are committed to building a community based on academic excellence achieved through the synergy of diverse perspectives and the boundless potential of their students.",
  },
  {
    title: "Our Students",
    icon: "/academic/raised-arm.png",
    desc: "Pamavambo students are good citizens, ambitious learners, and servant leaders. They make each other better and lift each other up. Our students are willing to make mistakes.",
  },
  {
    title: "Our Home",
    icon: "/academic/architecture-04.svg",
    desc: "The Pamavambo School sits on more than 700 acres in suburban New Jersey. A mix of natural beauty, modern technology, and traditional brick buildings brings us together.",
  },
];

export function CommunityHighlights() {
  return (
    <section className="bg-[#23242a] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {highlights.map((item, i) => (
          <div key={i} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
              <Image
                src={item.icon}
                alt={item.title}
                fill
                className="object-contain sepia saturate-[2] hue-rotate-15"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
              />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-sm leading-relaxed sm:leading-relaxed text-white font-light">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
