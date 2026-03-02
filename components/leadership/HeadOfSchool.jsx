import Image from "next/image";

const HeadOfSchool = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Sidebar Profile */}
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="relative w-64 h-64 mb-8">
            {/* Red border accent */}
            <div className="absolute inset-0 border-[3px] border-[#9b031f] rounded-full -m-2" />
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
                alt="Head of School"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-gray-900 text-sm">
              Stephen Murray H’54 ’55 ’63 ’65 ’16 P’16 ’21
            </p>
            <p className="text-[11px] font-medium text-gray-500 uppercase leading-relaxed max-w-50">
              The Shelby Cullom Davis, Class of 1926, Head of School
            </p>
          </div>
          <div className="mt-8">
            <button className="text-[10px] font-bold tracking-[0.2em] text-[#9b031f] uppercase border-b border-[#9b031f] pb-1">
              Read Steve's Biography
            </button>
          </div>
        </div>

        {/* Right Content Message */}
        <div className="lg:col-span-8 space-y-8">
          <h2 className="font-serif text-4xl text-gray-900">
            From Board of school
          </h2>
          <p className="text-gray-800 font-light italic text-lg">
            Welcome to Pamavambo Private School
          </p>

          <div className="space-y-6 text-gray-700 font-light leading-relaxed text-lg">
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
          <div className="pt-8">
            <p className="font-serif text-5xl text-gray-900 opacity-80">
              Pamavambo Directors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadOfSchool;
