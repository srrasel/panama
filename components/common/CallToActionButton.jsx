import Image from "next/image";

export default function CallToActionButton({
  title,
  description,
  buttonText,
  imagePath,
  imageAlt,
}) {
  return (
    <section className="relative w-full min-h-100 sm:min-h-120 md:min-h-135 lg:min-h-150 flex items-center px-4 sm:px-5 md:px-6 py-12 sm:py-16 md:py-18 lg:py-20 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imagePath}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Darkening tint to make text pop */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-5 md:px-6">
        {/* Content Box */}
        <div className="max-w-full sm:max-w-xl md:max-w-2xl text-white space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg md:text-lg leading-relaxed sm:leading-relaxed font-medium">
            {description}
          </p>

          {/* Red Action Button - Fixed to respect border */}
          <button className="group flex items-center justify-between bg-[#b01a2e] hover:bg-[#8c1525] transition-colors duration-300 px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-3.5 md:py-4 w-full max-w-full sm:max-w-60 md:max-w-70 text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase">
            <span className="text-left truncate">{buttonText}</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Border positioned inside with safe area */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 border-2 sm:border-3 md:border-4 border-[#c5a367] pointer-events-none" />
    </section>
  );
}
