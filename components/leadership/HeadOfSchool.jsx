"use client";

import Image from "next/image";

const HeadOfSchool = () => {
  return (
    <section className=" py-24 px-6 md:px-20 lg:px-32 font-['Montserrat']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Sidebar Profile */}
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="relative w-64 h-64 mb-8">
            {/* Gold border accent (#D4A437) */}
            <div className="absolute inset-0 border-[3px] border-[#D4A437] rounded-full -m-2" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/logo.png" // Replace with actual head of school image path
                alt="Head of School"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-[#1F2A44] text-sm tracking-wide">
              Stephen Murray H’54 ’55 ’63 ’65 ’16 P’16 ’21
            </p>
            <p className="text-[11px] font-bold text-[#222222]/60 uppercase tracking-[0.15em] leading-relaxed max-w-xs mx-auto">
              The Shelby Cullom Davis, Class of 1926, Head of School
            </p>
          </div>
          
        </div>

        {/* Right Content Message */}
        <div className="lg:col-span-8 space-y-8">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1F2A44] font-bold tracking-tight">
            From Board of school
          </h2>
          <p className="text-[#D4A437] font-['Playfair_Display'] italic text-2xl">
            Welcome to Pamavambo Private School
          </p>

          <div className="space-y-6 text-[#222222] font-light leading-relaxed text-lg opacity-90">
            <p>
              Welcome to a community built on purpose, rooted in values, and
              dedicated to excellence. At Pamavambo, we challenge a diverse
              community of promising young people to lead lives of learning,
              integrity, and high purpose. Our mission is to inspire the best in
              each to seek the best for all. We provide a high-quality,
              inclusive education that develops the whole child through rigorous
              academics, vibrant sports and arts programs, and a curriculum
              grounded in Christian values — equipping students with the moral
              clarity and cultural confidence to navigate an ever-changing world
            </p>
            <p>
              We are building a community where all members grow and thrive
              physically, emotionally, spiritually, and intellectually. Students
              feel safe, supported, and empowered in an environment that
              promotes kindness, respect, and joy. Our core values — integrity,
              accountability, spiritual development, and service — guide our
              decisions, shape our culture, and define our character.
            </p>
            <p>
              Whether you are exploring Pamavambo for the first time or are
              already part of our family, welcome to an education that
              transforms. Welcome home.
            </p>
          </div>

          {/* Script Signature */}
          <div className="pt-8 border-t border-[#D4A437]/20">
            <p className="font-['Playfair_Display'] text-5xl text-[#1F2A44] opacity-80 italic">
              Pamavambo Directors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadOfSchool;