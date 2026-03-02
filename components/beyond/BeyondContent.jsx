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
      {/* Main Text Content */}
      <div className="max-w-full sm:max-w-5xl space-y-4 sm:space-y-6 md:space-y-8">
        <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed sm:leading-relaxed text-gray-600">
          Whether exploring the majesty of Victoria Falls, uncovering ancient
          history at Great Zimbabwe, experiencing wildlife on safari, or
          deepening their understanding of world cultures through community
          engagement, Pamavambo students know there's no limit to what they can
          learn beyond the classroom walls.
        </p>

        <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed sm:leading-relaxed text-gray-600">
          Experiential learning allows students to witness the real-life
          application of their studies during the school day and beyond. From
          local field trips to our nation's most treasured sites to
          international travel opportunities, students connect theoretical
          knowledge with lived experience. These adventures offer students a
          legitimate opportunity to learn from challenges, develop resilience
          through problem-solving, and feel the validation of success in ways
          that aren't possible through textbooks alone. At Pamavambo, learning
          comes alive when students engage directly with the world around them.
        </p>
      </div>
    </div>
  );
};

export default BeyondContent;
