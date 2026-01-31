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
            From Our Head of School
          </h2>
          <p className="text-gray-800 font-light italic text-lg">Welcome!</p>

          <div className="space-y-6 text-gray-700 font-light leading-relaxed text-lg">
            <p>
              The Pamavambo experience is more than 210 years in the making,
              and core to that heritage is the value we place on our close,
              caring community...
            </p>
            <p>
              At the heart of this great school is the belief that our students
              dig deeper, reach higher, and stretch further when they feel the
              embrace of supportive peers...
            </p>
          </div>

          {/* Script Signature */}
          <div className="pt-8">
            <p className="font-serif text-5xl text-gray-900 opacity-80">
              Stephen S. Murray
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadOfSchool;
