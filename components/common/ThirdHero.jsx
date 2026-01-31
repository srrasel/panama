import Link from "next/link";

const ThirdHero = ({
  backgroundImage,
  breadcrumbs,
  title,
  description, // Optional prop
  tintColor = "#7e0b1a",
  tintOpacity = 95,
}) => {
  return (
    // Responsive height
    <section className="relative h-80 sm:h-96 md:h-screen w-full overflow-hidden bg-red-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Red Tint Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-90"
        style={{
          backgroundColor: tintColor,
          opacity: `${tintOpacity}%`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 flex h-full flex-col justify-center px-4 sm:px-5 md:px-8 lg:px-20 xl:px-32">
        {/* Breadcrumbs */}
        <nav className="mb-3 sm:mb-4 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-white/90">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {crumb.href ? (
                <Link
                  href={crumb?.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="cursor-default">{crumb.label}</span>
              )}

              {/* Separator (not for the last item) */}
              {index < breadcrumbs.length - 1 && (
                <span className="text-white/50 mx-1 sm:mx-2">/</span>
              )}
            </div>
          ))}
        </nav>

        {/* Heading - Handle line breaks if included in title string */}
        <h1 className="max-w-full sm:max-w-4xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium leading-[1.1] sm:leading-[1.1] text-white">
          {typeof title === "string"
            ? title.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < title.split("\n").length - 1 && <br />}
                </span>
              ))
            : title}
        </h1>

        {/* Description - Only render if description exists */}
        {description && (
          <p className="mt-4 sm:mt-6 md:mt-8 max-w-full sm:max-w-2xl md:max-w-3xl text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default ThirdHero;
