"use client";

import Link from "next/link";

const ThirdHero = ({
  backgroundImage,
  breadcrumbs,
  title,
  description, // Optional prop
  tintColor = "#1F2A44", // Default updated to Brand Navy
  tintOpacity = 80,
}) => {
  return (
    // Responsive height
    <section className="relative h-80 sm:h-96 md:h-screen w-full overflow-hidden font-['Montserrat']">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Tint Overlay - Using Brand Navy as default */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: tintColor,
          opacity: `${tintOpacity}%`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 flex h-full flex-col justify-center px-4 sm:px-5 md:px-8 lg:px-20 xl:px-32">
        {/* Breadcrumbs */}
        <nav className="mb-4 sm:mb-6 flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4A437]">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {crumb.href ? (
                <Link
                  href={crumb?.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#F7F6F3]/80 cursor-default">{crumb.label}</span>
              )}

              {/* Separator (not for the last item) */}
              {index < breadcrumbs.length - 1 && (
                <span className="text-[#D4A437]/50 mx-2 sm:mx-3">/</span>
              )}
            </div>
          ))}
        </nav>

        {/* Heading - Playfair Display for Elegance */}
        <h1 className="max-w-full sm:max-w-4xl font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-[#F7F6F3]">
          {typeof title === "string"
            ? title.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < title.split("\n").length - 1 && <br />}
                </span>
              ))
            : title}
        </h1>

        {/* Description - Montserrat Light with Golden Left Border */}
        {description && (
          <div className="mt-6 sm:mt-8 md:mt-10 max-w-full sm:max-w-2xl md:max-w-3xl border-l-2 border-[#D4A437] pl-6">
            <p className="text-[#F7F6F3]/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed italic">
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThirdHero;