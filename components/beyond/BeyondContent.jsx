"use client";

const BeyondContent = () => {
  
  return (
    <div className="bg-[#F7F6F3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
      {/* Main Text Content */}
      <div className="max-w-full sm:max-w-5xl space-y-8 sm:space-y-10">
        
        {/* Brand Accent Line */}
        <div className="w-16 h-1 bg-[#D4A437] mb-8" />

        <p className="text-lg sm:text-xl md:text-2xl font-['Playfair_Display'] italic leading-relaxed text-[#1F2A44] opacity-90">
          Whether exploring the majesty of Victoria Falls, uncovering ancient
          history at Great Zimbabwe, experiencing wildlife on safari, or
          deepening their understanding of world cultures through community
          engagement, Pamavambo students know there&apos;s no limit to what they can
          learn beyond the classroom walls.
        </p>

        <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#222222] border-l-2 border-[#D4A437]/30 pl-6 md:pl-10">
          Experiential learning allows students to witness the real-life
          application of their studies during the school day and beyond. From
          local field trips to our nation&apos;s most treasured sites to
          international travel opportunities, students connect theoretical
          knowledge with lived experience. These adventures offer students a
          legitimate opportunity to learn from challenges, develop resilience
          through problem-solving, and feel the validation of success in ways
          that aren&apos;t possible through textbooks alone. At Pamavambo, learning
          comes alive when students engage directly with the world around them.
        </p>
        
        {/* Subtle Decorative Indicator */}
        <div className="pt-4">
           <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4A437] uppercase">
             Excellence Beyond Boundaries
           </span>
        </div>
      </div>
    </div>
  );
};

export default BeyondContent;