import Image from "next/image";

const ResearchInstitutes = () => {
  return (
    <section className="bg-white py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 order-2 md:order-1">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 leading-[1.1] sm:leading-[1.1]">
            Character <br /> Through Action
          </h2>

          <div className="space-y-3 sm:space-y-4 max-w-full sm:max-w-md">
            <p className="text-gray-700 leading-relaxed sm:leading-relaxed font-light text-sm sm:text-base">
              Where character is built through challenge, values are tested
              through experience, and purpose is found through service.
            </p>
          </div>
        </div>

        {/* Right Column: Image using Next.js Image component */}
        <div className="relative aspect-square w-full overflow-hidden order-1 md:order-2">
          <Image
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop"
            alt="Students in a creek conducting research"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ResearchInstitutes;
