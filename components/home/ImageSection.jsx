"use client";

import Image from "next/image";
import Link from "next/link";

const gridItems = [
  {
    title: "Academics",
    image: "/home_academics.jpg",
    link: "/academics",
  },
  {
    title: "Athletics",
    image: "/home_athletics.jpg",
    link: "/athletics",
  },
  {
    title: "Admissions",
    image: "/pa_dance_frobeats-horiz.jpg",
    link: "/arts",
  },
  {
    title: "Beyond the Classroom",
    image: "/home_exp.jpg",
    link: "/beyond",
  },
];

export default function ImageSection() {
  return (
    <section
      style={{
        backgroundImage: 'url("/whiteout_pop-hall.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* 1. Background Pattern / Watermark */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* 2. The 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl relative">
          {/* Central Logo Overlay (The small crest in the middle of the 4 images) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              {/* Background */}
              <div
                style={{
                  backgroundImage: 'url("/radiating-circles.svg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 w-full h-full"
              />

              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24 ">
                  <Image
                    src="/logo-school.png"
                    alt="School Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              </div>
            </div>
          </div>

          {gridItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="group relative aspect-square overflow-hidden "
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

              <div className="absolute top-8 left-8">
                <h3 className="text-white text-2xl font-bold tracking-tight uppercase">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. Bottom Decorative Crest */}
        <div className="flex justify-center mt-16">
          <div className="  flex items-center justify-center">
            <Image
              src="/texture-02.svg"
              alt="crest"
              width={150}
              height={150}
              className="opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
