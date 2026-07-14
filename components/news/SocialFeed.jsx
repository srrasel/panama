"use client";

import { Camera, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    id: 1,
    src: "/new/Picture6.png",
    alt: "Students working on laptops",
    description: "Students collaborate on innovative projects in our new tech lab",
  },
  {
    id: 2,
    src: "/new/Picture7.png",
    alt: "Group shoveling snow",
    description: "Community comes together for annual winter service day",
  },
  {
    id: 3,
    src: "/new/Picture8.png",
    alt: "Winter weather announcement",
    description: "Campus transforms into a winter wonderland",
  },
  {
    id: 4,
    src: "/new/Picture9.png",
    alt: "Pamavambo Private School logo",
    description: "Educating tomorrow's leaders",
  },
];

const SocialFeed = () => {
  return (
    <section className="bg-[#f2eade] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 font-['Montserrat']">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1F2A44] mb-6 sm:mb-8 md:mb-12 font-['Playfair_Display'] font-bold leading-tight text-center md:text-left">
          Social Media{" "}
          <span className="text-[#D4A437] italic font-medium">
            @ Pamavambo Private School
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col h-full bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden w-full"
            >
              {/* Instagram-style header */}
              <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-[#E5E7EB]">
                <div className="shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src="/new/logo.png"
                      alt="Pamavambo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-[#1F2A44] truncate">
                    pamavambo_private_school
                  </p>
                  <p className="text-[9px] text-[#222222]/50 uppercase tracking-wider">
                    Instagram
                  </p>
                </div>
                <Instagram size={16} className="text-[#D4A437] shrink-0" />
              </div>

              {/* Image — fixed equal height, full image visible */}
              <div className="relative w-full h-44 sm:h-48 md:h-52 bg-[#FAFAFA] shrink-0">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  priority={post.id === 1}
                />
              </div>

              {/* Caption — equal min height */}
              <div className="flex-1 px-3 py-3 min-h-[4.5rem] flex items-start">
                <p className="text-[#222222] text-[11px] md:text-xs leading-relaxed line-clamp-3">
                  <span className="font-semibold text-[#1F2A44] mr-1.5">
                    pamavambo_private_school
                  </span>
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center md:items-end space-y-5">
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
                className="hover:text-[#1F2A44] transition-all duration-300 transform hover:-translate-y-1"
                aria-label={Icon.name}
              >
                <Icon size={26} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
