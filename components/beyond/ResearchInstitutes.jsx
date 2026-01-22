import Image from "next/image";

const ResearchInstitutes = () => {
  return (
    <section className="bg-white py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 order-2 md:order-1">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 leading-[1.1] sm:leading-[1.1]">
            Research <br /> Institutes
          </h2>

          <div className="space-y-3 sm:space-y-4 max-w-full sm:max-w-md">
            <p className="text-gray-700 leading-relaxed sm:leading-relaxed font-light text-sm sm:text-base">
              The Lawrenceville School offers five research institutes that
              offer students extraordinary opportunities for hands-on learning
              in different disciplines.
            </p>
            <p className="text-gray-700 leading-relaxed sm:leading-relaxed font-light text-sm sm:text-base">
              Each institute includes a two-week summer residential program and
              additional coursework during the academic year.
            </p>
          </div>

          <a
            href="#"
            className="group w-fit flex items-center text-gray-900 font-semibold text-xs sm:text-sm tracking-wide"
          >
            <span className="border-b-2 border-transparent group-hover:border-red-800 transition-all duration-300 pb-1">
              Find an Opportunity
            </span>
          </a>
        </div>

        {/* Right Column: Image using Next.js Image component */}
        <div className="relative aspect-square w-full overflow-hidden order-1 md:order-2">
          <Image
            src="/beyond/leopold-scholars.jpg"
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
