import Image from "next/image";

const OurLocation = () => {
  return (
    <section className="relative bg-white py-24 px-6 md:px-20 lg:px-32 overflow-hidden">
      {/* 1 column on mobile, 2 equal columns on large screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-12">
          <div>
            <h2 className="font-serif text-5xl text-gray-900 mb-10 leading-tight">
              Our <br /> Location
            </h2>

            <div className="space-y-6">
              {[
                { l: "184 km from ", v: "Bulawayo" },
                { l: "119 km from ", v: "Gweru" },
                { l: "97 km from ", v: "Masvingo" },
              ].map((stat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-1.5 h-10 bg-[#C5A059] shrink-0" />
                  <p className="text-gray-700 font-light pt-1 text-lg">
                    {stat.l}
                    <span className="font-bold text-gray-900">{stat.v}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="relative w-full h-100 md:h-125 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/new/Picture11.png"
              alt="Campus Location"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
