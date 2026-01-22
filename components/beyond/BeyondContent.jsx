const BeyondContent = () => {
  const navLinks = [
    "TRAVEL PROGRAMS",
    "OUTDOOR CLASSROOM",
    "BIG RED FARM",
    "SUSTAINABILITY",
    "LAWRENCEVILLE RESEARCH INSTITUTES",
  ];

  return (
    <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      {/* Top Navigation Bar */}
      <nav className="border-b border-[#C5A059] py-3 sm:py-4 mb-8 sm:mb-12 md:mb-16">
        <ul className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-3 md:gap-4 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-gray-800">
          {navLinks.map((link) => (
            <li
              key={link}
              className="cursor-pointer hover:text-red-800 transition-colors px-1 sm:px-0 text-center sm:text-left"
            >
              {link}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Text Content */}
      <div className="max-w-full sm:max-w-5xl space-y-4 sm:space-y-6 md:space-y-8">
        <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed sm:leading-relaxed text-gray-600">
          Whether connecting with the land at the Big Red Farm, deepening their
          understanding of world cultures, or embarking on a trip abroad,
          Lawrenceville students know there's no limit to what they can learn.
        </p>

        <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed sm:leading-relaxed text-gray-600">
          Experiential learning allows students to witness the real-life
          application of their studies during the school day. In addition to
          lending a sense of closure to theoretical learning, these experiences
          offer students a legitimate opportunity to learn from failure — and
          feel validation from success — in a way that isn't possible in
          classroom learning.
        </p>
      </div>
    </div>
  );
};

export default BeyondContent;
