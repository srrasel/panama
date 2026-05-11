"use client";

import { Camera, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const SocialFeed = () => {
  const posts = [
    {
      id: 1,
      src: "/new/Picture6.png",
      alt: "Students working on laptops",
      description: "Students collaborate on innovative projects in our new tech lab",
      platform: "Instagram",
    },
    {
      id: 2,
      src: "/new/Picture7.png",
      alt: "Group shoveling snow",
      description: "Community comes together for annual winter service day",
      platform: "Instagram",
    },
    {
      id: 3,
      src: "/new/Picture8.png",
      alt: "Winter weather announcement",
      description: "Campus transforms into a winter wonderland",
      platform: "Instagram",
    },
    {
      id: 4,
      src: "/new/Picture9.png",
      alt: "Students around a campfire",
      description: "Evening gathering strengthens community bonds",
      platform: "Instagram",
    },
  ];

  return (
    <section className="bg-[#f2eade] py-20 px-4 md:px-12 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl text-[#1F2A44] mb-12 font-['Playfair_Display'] font-bold">
          Social Media <span className="text-[#D4A437] italic font-medium">@ Pamavambo school</span>
        </h2>

        {/* Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group overflow-hidden aspect-square rounded-none border border-[#E5E7EB] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Next.js Image Component */}
              <div className="relative w-full h-full">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  priority={post.id === 1}
                />
                {/* Subtle Navy Tint Overlay (Initial) */}
                <div className="absolute inset-0 bg-[#1F2A44]/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Hover Overlay with Description */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/95 via-[#0F1B2D]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                {/* Description */}
                <p className="text-[#F7F6F3] text-sm mb-4 line-clamp-3 leading-relaxed italic">
                  {post.description}
                </p>

                {/* Platform and Icon */}
                <div className="flex items-center justify-between border-t border-[#D4A437]/30 pt-4">
                  <span className="text-[#D4A437] text-[10px] font-bold uppercase tracking-[0.2em]">
                    {post.platform}
                  </span>
                  <div className="text-[#D4A437]">
                    <Instagram size={18} />
                  </div>
                </div>
              </div>

              {/* Static Icon (Non-hover) */}
              <div className="absolute bottom-4 right-4 text-white/90 group-hover:opacity-0 transition-opacity duration-300 drop-shadow-lg">
                <Instagram size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-16 flex flex-col items-center md:items-end space-y-6">
          <p className="text-[#1F2A44] text-xs font-bold uppercase tracking-[0.25em] opacity-70">
            Stay Connected with the Pamavambo Community
          </p>

          <div className="flex space-x-8 text-[#D4A437]">
            {[
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Camera, href: "https://flickr.com" },
              { Icon: Youtube, href: "https://youtube.com" },
              { Icon: Facebook, href: "https://facebook.com" },
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1F2A44] transition-all duration-300 transform hover:-translate-y-2"
              >
                <Icon size={28} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;