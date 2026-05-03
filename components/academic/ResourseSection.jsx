import Image from "next/image";

const resourceData = [
  {
    title: " Library",
    description:
      " Explore, research, and discover in our digital library. ",
    image: "/new/image9.jpeg",
    
  },
  {
    title: "Community",
    description:
      " A vibrant community of students, families, and educators united by shared values, cultural pride, and commitment to excellence with purpose.",
    image: "/new/image10.jpeg",

  },
];

export default function ResourceSection() {
  return (
    <section className="bg-[#34527d] py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24">
        {resourceData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Next.js Image wrapper */}
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-3 sm:space-y-4 text-white">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif italic">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm leading-relaxed sm:leading-relaxed opacity-90 font-medium">
                {item.description}
              </p>
            </div>

           
          </div>
        ))}
      </div>
    </section>
  );
}
