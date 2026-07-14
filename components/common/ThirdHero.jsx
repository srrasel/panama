"use client";

import Link from "next/link";

const ThirdHero = ({
  backgroundImage,
  breadcrumbs = [],
  title,
  description,
  tintColor = "#1F2A44",
  tintOpacity = 80,
}) => {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[75vh] w-full overflow-hidden font-['Montserrat'] flex items-end sm:items-center pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: tintColor,
          opacity: `${tintOpacity}%`,
        }}
      />

      <div className="relative z-20 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 w-full max-w-[100vw]">
        <nav className="mb-3 sm:mb-5 flex items-center flex-wrap gap-x-1 sm:gap-x-2 gap-y-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#D4A437]">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#F7F6F3]/80 cursor-default">{crumb.label}</span>
              )}

              {index < breadcrumbs.length - 1 && (
                <span className="text-[#D4A437]/50 mx-1.5 sm:mx-3">/</span>
              )}
            </div>
          ))}
        </nav>

        <h1 className="max-w-full sm:max-w-4xl font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-[#F7F6F3] break-words">
          {typeof title === "string"
            ? title.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < title.split("\n").length - 1 && <br />}
                </span>
              ))
            : title}
        </h1>

        {description && (
          <div className="mt-4 sm:mt-6 md:mt-8 max-w-full sm:max-w-2xl md:max-w-3xl border-l-2 border-[#D4A437] pl-4 sm:pl-6">
            <p className="text-[#F7F6F3]/90 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed italic">
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThirdHero;
