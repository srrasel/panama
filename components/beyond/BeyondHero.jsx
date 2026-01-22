const BeyondHero = () => {
  return (
    // Responsive height
    <section className="relative h-80 sm:h-96 md:h-screen w-full overflow-hidden bg-red-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale"
        style={{
          backgroundImage: `url('/beyond/BeyondHero.jpg')`,
        }}
      />

      {/* Red Tint Overlay - mix-blend-multiply creates that deep red effect */}
      <div className="absolute inset-0 z-10 bg-red-900/90 mix-blend-multiply" />

      {/* Content Container */}
      <div className="relative z-20 flex h-full flex-col justify-center px-4 sm:px-5 md:px-8 lg:px-20 xl:px-32">
        {/* Breadcrumbs */}
        <nav className="mb-3 sm:mb-4 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-white/90">
          <span className="hover:text-white cursor-pointer">Home</span>
          <span className="text-white/50">/</span>
          <span className="hover:text-white cursor-pointer">Academics</span>
        </nav>

        {/* Heading */}
        <h1 className="max-w-full sm:max-w-4xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium leading-[1.1] sm:leading-[1.1] text-white">
          Beyond the <br /> Classroom
        </h1>
      </div>
    </section>
  );
};

export default BeyondHero;
