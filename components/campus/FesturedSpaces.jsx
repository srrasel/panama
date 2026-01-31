import React from 'react';
import Image from 'next/image';

const FeaturedSpaces = () => {
  const spaces = [
    {
      title: "TSAI FIELD HOUSE",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "GRUSS CENTER FOR ART AND DESIGN",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "HUTCHINS GALLERIES",
      image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=1000&auto=format&fit=crop",
    }
  ];

  return (
    <section className="bg-white  px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">
          Featured Spaces
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((space, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container with aspect ratio */}
              <div className="relative aspect-[3/2] mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Space Title */}
              <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-800 uppercase">
                {space.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;