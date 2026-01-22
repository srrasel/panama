import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-4xl mx-auto">
        {/* 1. Top Section: Title */}
        <div className="-ml-6 sm:-ml-8 md:-ml-10 mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif text-[#1a1a1a] leading-tight">
            Welcoming
          </h2>
        </div>

        {/* 2. Down Section: Description and Icon */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 leading-relaxed md:leading-relaxed font-light text-sm sm:text-base md:text-[15px] lg:text-base">
            <p>
              Developing a positive and welcoming environment gives students the
              courage to participate in true Harkness discussion in class and in
              life. Every learning experience at Lawrenceville is a deliberate
              and consistent effort to create a sense of belonging and
              affirmation for each and every student.
            </p>

            <p>
              Along with that foundation of inclusion comes the expectation that
              each student will be fully involved and engaged, maintaining a
              high degree of ownership and participation. Students teach each
              other through shared experience, varying perspectives, and a
              mutual accountability that encourages tenacity and resilience
              paired with empathy and compassionate objectivity. Every class and
              every conversation is enriched by the ever-increasing knowledge
              and aptitude of its members.
            </p>

            <p>
              As students see that learning happens in all environments and
              applies to every part of life, they embrace the academic rigor
              setting them on a path to a life of meaningful and rich
              relationships as driven, critical citizens.
            </p>
          </div>

          {/* Replaced SVG with Next.js Image Component */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 self-start sm:self-auto">
            <Image
              src="/student_life/icons8-community-500.png"
              alt="Welcoming Icon"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
