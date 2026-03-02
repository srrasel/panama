import Image from "next/image";

export default function HarknessSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      {/* Top Part: Text and Image */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/2 relative aspect-4/3">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            alt="Students in classroom"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1a1a1a] leading-tight">
            Ready to Learn.
            <br />
            Ready for Life.
          </h2>
          <div className="text-xs sm:text-sm md:text-sm text-gray-600 space-y-3 sm:space-y-4 leading-relaxed">
            <p>
              A Pamavambo graduate is ready. Ready to embrace higher education
              and engage in the professional world; to create cultures of
              belonging...
            </p>
            <p>
              Students come to Pamavambo with their own stories and lenses. When
              they are generous with themselves, they enrich the lives of their
              classmates...
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Part: Video and Foundation Text */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/3">
          <p className="text-xs sm:text-sm md:text-sm text-gray-700 leading-relaxed sm:leading-relaxed">
            This is the foundation of , a collaborative form of learning that
            encourages intellectual effort and social-emotional learning...
          </p>
        </div>
        <div className="w-full md:w-2/3 aspect-video relative bg-black">
          {/* YouTube Embed */}
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Pamavambo: Why do we use Harkness?"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
