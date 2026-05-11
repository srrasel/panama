import Image from "next/image";

const EnvironmentalSections = () => {
  return (
    <section className="bg-[#F3F4F6] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
        {/* Top Section: Environmental Studies (Text Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="order-2 md:order-1 flex flex-col space-y-4 sm:space-y-5 md:space-y-6 md:pr-8 lg:pr-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Environmental <br /> Studies
            </h2>
            <p className="text-gray-700 font-light leading-relaxed sm:leading-relaxed max-w-full sm:max-w-sm">
             Excellence with purpose isn't taught—it's experienced, lived, and embraced beyond the classroom
            </p>
           
          </div>

          <div className="order-1 md:order-2 relative aspect-4/3 w-full shadow-sm">
            <Image
              src="/new/image15.jpeg"
              alt="Student with seedlings"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Bottom Section: Sustainability (Image Left, Text Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-32">
          <div className="relative aspect-4/3 w-full shadow-sm">
            <Image
              src="/new/image12.jpeg"
              alt="Scenic lake view"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 md:pl-8 lg:pl-12">
            <p className="text-gray-700 font-light leading-relaxed sm:leading-relaxed">
             Leading: Learning with integrity. Growing through experience. Leading with purpose.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalSections;
