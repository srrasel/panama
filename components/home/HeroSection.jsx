"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { src: "/new/image14.jpeg" },
  { src: "/new/image32.jpeg" },
  { src: "/new/image8.jpeg" },
];

const texts = ["Primary", "Secondary", "Boarding"];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoverText, setHoverText] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleHover = (index) => {
    setHoverText(index);
    setActiveSlide(index);
  };

  const currentSlide = hoverText !== null ? hoverText : activeSlide;

  return (
    <section className="relative bg-black w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.src})`,
              transform: currentSlide === index ? "scale(1)" : "scale(1.1)",
              transition: "transform 5s ease-in-out",
            }}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-4">
        {/* Logo */}
        <div className="mb-4 md:mb-8 relative w-[250px] h-[75px] md:w-[400px] md:h-[120px] lg:w-[500px] lg:h-[150px] mt-16 md:mt-28">
          <Image
            src="/logo-school.png"
            alt="School Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 pt-2 md:pt-4 w-full max-w-4xl justify-center items-center">
          {texts.map((text, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`cursor-pointer text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-300 ${
                  currentSlide === index
                    ? "text-[#4A6FA5]"
                    : "text-white hover:text-gray-300"
                }`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => setHoverText(null)}
              >
                {text}
              </span>

              {index < texts.length - 1 && (
                <div className="hidden sm:block w-0.5 h-8 md:h-10 bg-white mx-4 md:mx-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-6 md:gap-12 lg:gap-20 mt-12 md:mt-20 w-full max-w-4xl justify-center">
          <Link
            href="/admission/inquire"
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <span className="text-base sm:text-lg md:text-xl font-medium">
              Inquire
            </span>
            <MoveRight className="mt-1 text-amber-500" />
          </Link>

          <div className="hidden sm:block w-px h-8 bg-white/50"></div>

          <Link
            href="/admission/visit"
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <span className="text-base sm:text-lg md:text-xl font-medium">
              Visit
            </span>
            <MoveRight className="mt-1 text-amber-500" />
          </Link>

          <div className="hidden sm:block w-px h-8 bg-white/50"></div>

          <Link
            href="/admission/application"
            className="flex flex-col items-center hover:scale-105 transition-transform"
          >
            <span className="text-base sm:text-lg md:text-xl font-medium">
              Apply
            </span>
            <MoveRight className="mt-1 text-amber-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}