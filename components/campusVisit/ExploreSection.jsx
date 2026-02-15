import Image from "next/image";

const ExploreSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text Content Column */}
        <div className="order-2 md:order-1">
          <h2 className="font-serif text-5xl lg:text-7xl text-[#1a1a1a] leading-[1.1] mb-8">
            Explore
            <br />
            pamavambo
          </h2>

          <div className="space-y-6 max-w-lg">
            <p className="text-xl text-gray-700 font-light leading-relaxed">
              Just a short trip from Princeton, New York City, and Philadelphia,
              our campus is surrounded by woods, farmland, and a charming
              downtown. Come see Pamavambo through the eyes of our students!
            </p>

            <p className="text-xl text-gray-700 font-light leading-relaxed">
              On a student-led tour, you&apos;ll explore campus, hear real
              stories about life at Pamavambo, and have plenty of chances to
              ask questions.
            </p>
          </div>
        </div>

        {/* Next.js Image Column */}
        <div className="order-1 md:order-2 relative aspect-4/3 w-full overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200"
            alt="The Pamavambo School Campus Architecture"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
