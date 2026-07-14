"use client";

import Image from "next/image";

const ExploreSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-20  font-['Montserrat']">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text Content Column */}
        <div className="order-2 md:order-1">
          <h2 className="font-['Playfair_Display'] text-5xl lg:text-7xl text-[#1F2A44] leading-[1.1] mb-8 font-bold">
            Explore
            <br />
            <span className="text-[#D4A437]">pamavambo</span>
          </h2>

          <div className="space-y-6 max-w-lg">
            <p className="text-xl text-[#222222] font-light leading-relaxed opacity-90">
              Pamavambo Private School is an independent day and boarding school
              in Zvishavane, Zimbabwe, founded in January 2012 with a clear
              mission: to provide exceptional education accessible to families
              who value both academic excellence and character development. We
              comprise a nursery, primary, and high school, offering quality
              education from Early Childhood Development (ECD A and B) through
              secondary level, fully registered under the Ministry of Primary
              and Secondary Education.
            </p>

            <p className="text-xl text-[#222222] font-light leading-relaxed opacity-90 italic">
              Our Cambridge-aligned curriculum prepares students not only for
              academic success but for lives of meaning and impact, rooted in
              cultural identity and moral clarity. Welcome to Pamavambo, where
              excellence meets purpose and every child belongs.
            </p>
          </div>
        </div>

        {/* Next.js Image Column */}
        <div className="order-1 md:order-2 relative aspect-[4/3] w-full overflow-hidden shadow-2xl group">
          <Image
            src="/image18.webp"
            alt="The Pamavambo Private School Campus Architecture"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;