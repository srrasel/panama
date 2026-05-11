import Image from "next/image";

const Founder = () => {
  return (
    <section className="bg-gray-200 py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Founder Image */}
        <div className="relative w-full h-70 md:h-80 lg:h-90 rounded-md overflow-hidden shadow-md">
          <Image
            src="/admission/Founder.jpeg"
            alt="Founder"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Tribute Content */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-amber-600 mb-4">
            In memory of the founder and director of the school 2012–2021
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            Mrs. Joyce Raradza, “a woman of legacy”, a beloved soul that many
            names Mai Rozario, Mama, Ambuya, Shamwari, director… among many
            more. What she was best known for in life was for being a generous
            person who gave her time, knowledge, energy, and money. She imparted
            the gift of knowledge to hundreds of children that went through
             Infants and Primary School that she founded in 2012.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            She loved her community and always opened her heart and home to
            anyone in need. She put others first and always had time to impart
            wisdom and encouragement with each interaction. Pamavambo Infants
            represent her love for providing top-quality
            education for children and creating employment for her community.
          </p>

          <p className="text-gray-700 italic mb-6">
            These borrowed words sum up the life she lived: “A woman for all
            times and seasons, for all people, and for all occasions. She is
            God’s shining light in the darkness.”
          </p>

          <p className="text-amber-600 text-sm font-medium">
            Late Director and Founder Joyce Raradza
          </p>
        </div>
      </div>
    </section>
  );
};

export default Founder;
