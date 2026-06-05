"use client";

import Image from "next/image";

const Founder = () => {
  return (
    <section className="bg-[#F7F6F3] py-20 px-6 md:px-16 lg:px-24 font-['Montserrat']">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Founder Image with Brand Frame Styling */}
        <div className="relative group">
          {/* Decorative Background Frame (#D4A437) */}
          <div className="absolute -inset-4  z-0 pointer-events-none translate-x-3 translate-y-3" />
          
          <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-none overflow-hidden  z-10">
            <Image
              src="/admission/Founder.jpeg"
              alt="Founder Mrs. Joyce Raradza"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Subtle Navy Overlay */}
            <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>

        {/* Right: Tribute Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#D4A437] font-bold">
              In memory of the founder and director of the school 2012–2021
            </h3>
            <div className="h-[2px] w-16 bg-[#D4A437]" />
          </div>

          <div className="space-y-5 text-[#222222] leading-relaxed opacity-90 text-sm md:text-base">
            <p>
              Mrs. Joyce Raradza, <span className="text-[#1F2A44] font-bold">“a woman of legacy”</span>, a beloved soul that many
              names Mai Raradza, Mama, Ambuya, Shamwari, director… among many
              more. What she was best known for in life was for being a generous
              person who gave her time, knowledge, energy, and money. She imparted
              the gift of knowledge to hundreds of children that went through
              Infants and Primary School that she founded in 2012.
            </p>

            <p>
              She loved her community and always opened her heart and home to
              anyone in need. She put others first and always had time to impart
              wisdom and encouragement with each interaction. Pamavambo Infants
              represent her love for providing top-quality
              education for children and creating employment for her community.
            </p>

            <p className="text-[#1F2A44] font-['Playfair_Display'] italic text-lg md:text-xl border-l-4 border-[#D4A437] pl-6 py-2">
              “A woman for all times and seasons, for all people, and for all occasions. She is
              God’s shining light in the darkness.”
            </p>
          </div>

          <div className="pt-4">
            <p className="text-[#1F2A44] text-xs font-bold uppercase tracking-[0.2em] border-b border-[#D4A437]/40 pb-2 inline-block">
              Late Director and Founder Joyce Raradza
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;