"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowRight, GraduationCap } from "lucide-react";

const carouselImages = [
  "/new/image3.jpeg",
  "/new/Picture5.png",
  "/new/Picture2.jpg",
];

export default function HeroSection() {
  const [api, setApi] = React.useState();

  React.useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="relative w-full h-150 md:h-175 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{
            loop: true,
            duration: 30,
          }}
        >
          <CarouselContent className="ml-0">
            {carouselImages.map((src, index) => (
              <CarouselItem
                key={index}
                className="relative h-150 md:h-175 w-full pl-0"
              >
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-top"
                />

                <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/40 to-transparent" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="container relative z-10 mx-auto h-full flex flex-col justify-center px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-[#C5A059] font-semibold tracking-[0.2em] uppercase mb-4 text-xs md:text-sm">
            Excellence. Character. Purpose.
          </p>

          <h1 className="text-[#1A2B49] text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6">
            EDUCATING <br />
            TOMORROW&apos;S <br />
            <span className="text-[#C5A059] italic font-medium">
              LEADERS
            </span>
          </h1>

          <p className="text-gray-700 text-lg mb-8 max-w-md leading-relaxed">
            At Pamavambo Private Schools, we nurture curiosity, build strong
            character, and empower students to lead and make a difference.
          </p>

         
        </div>

        <div className="absolute bottom-4 right-6 lg:right-12 bg-[#1A2B49] text-white p-6 max-w-sm hidden md:block">
          <div className="flex flex-col gap-5">
            <div className="w-12 h-12 border border-yellow-500/30 flex items-center justify-center mb-1">
              <GraduationCap className="text-[#C5A059] w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold uppercase tracking-wider leading-snug">
              Building Brighter <br /> Futures
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed">
              A holistic education rooted in values, innovation, and excellence.
            </p>

           
          </div>
        </div>
      </div>
    </section>
  );
}