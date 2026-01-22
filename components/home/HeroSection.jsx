"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const slides = [
  {
    type: "video",
    src: "https://www.youtube.com/watch?v=wQMGRuVkip8",
  },
  {
    type: "image",
    src: "/Homepage_BRoll_v3.jpg",
  },
  {
    type: "image",
    src: "/home_house.jpg",
  },
  {
    type: "image",
    src: "/home_harkness.jpg",
  },
];

const texts = ["Primary", "Secondary", "Boarding"];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoverText, setHoverText] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 1000);

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleHover = (index) => {
    setHoverText(index);
    setActiveSlide(index + 1);
  };

  const currentSlide = hoverText !== null ? hoverText + 1 : activeSlide;

  return (
    <section className="relative bg-black w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-30 z-20" : "opacity-0 z-0"
          }`}
        >
          {slide.type === "video" ? (
            <ReactPlayer
              url={slide.src}
              playing={isPlaying && currentSlide === index}
              loop
              muted
              width="100%"
              height="100%"
              className="object-cover w-full h-full"
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    loop: 1,
                    playlist: "wQMGRuVkip8",
                    mute: 1,
                  },
                },
              }}
              onReady={() => {
                if (currentSlide === index) {
                  setIsPlaying(true);
                }
              }}
              playsinline
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.src})`,
                transform: currentSlide === index ? "scale(1)" : "scale(1.1)",
                transition: "transform 5s ease-in-out",
              }}
            />
          )}
        </div>
      ))}

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-4">
        {/* Logo */}
        <div className="mb-4 md:mb-8 relative w-62.5 h-18.75 md:w-100 md:h-30 lg:w-125 lg:h-37.5 mt-16 md:mt-28">
          <Image
            src="/logo-school.png"
            alt="School Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 250px, (max-width: 1024px) 400px, 500px"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 pt-2 md:pt-4 w-full max-w-4xl justify-center items-center">
          {texts.map((text, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`cursor-pointer text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-300 whitespace-nowrap ${
                  currentSlide === index + 1
                    ? "text-red-900"
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
        <div className="flex  gap-6 md:gap-12 lg:gap-20 mx-auto items-center mt-12 md:mt-20 w-full max-w-4xl justify-center">
          <Link
            href="/admission/inquire"
            className="text-white flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="text-base sm:text-lg md:text-xl font-medium">
              {" "}
              Inquire
            </span>
            <span className="text-amber-500 mt-1">
              <MoveRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          </Link>

          <div className="hidden sm:block w-px h-8 bg-white/50"></div>

          <Link
            href="/admission/visit"
            className="text-white flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="text-base sm:text-lg md:text-xl font-medium">
              Visit
            </span>
            <span className="text-amber-500 mt-1">
              <MoveRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          </Link>

          <div className="hidden sm:block w-px h-8 bg-white/50"></div>

          <Link
            href="/admission/application"
            className="text-white flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="text-base sm:text-lg md:text-xl font-medium">
              Apply
            </span>
            <span className="text-amber-500 mt-1">
              <MoveRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
