"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Bell, Rss } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SchoolNewsCarousel = ({
  title = "School News",
  description = "Stories of the community members, programs, and happenings that shape life at Pamavambo.",
  buttonText = "Read All News Stories",
  buttonLink = "#",
  newsPosts = [],
}) => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Handle Pagination Logic
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto font-serif">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-4xl md:text-5xl text-[#0a2540] tracking-tight">
            {title}
          </h2>
          <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <Button
          asChild
          className="bg-[#b31b1b] hover:bg-[#8c1515] text-white rounded-none px-7 py-6 text-sm font-sans font-bold transition-colors shrink-0"
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>

      {/* Social Icons Strip */}
      <div className="flex justify-end gap-1.5 mb-4">
        <div className="bg-gray-500 p-1 rounded-sm cursor-pointer hover:bg-gray-600 transition-colors">
          <Rss className="w-3.5 h-3.5 text-white fill-current" />
        </div>
        <div className="bg-[#f08a00] p-1 rounded-sm cursor-pointer hover:bg-[#d97d00] transition-colors">
          <Bell className="w-3.5 h-3.5 text-white fill-current" />
        </div>
      </div>

      {/* Carousel Container */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-6">
          {newsPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="pl-6 md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex flex-col gap-4 group/card cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>
                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-[20px] font-bold leading-snug text-[#1a1a1a] group-hover/card:underline decoration-1 underline-offset-4 transition-all">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-sans font-semibold">
                    {post.date}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows - Centered on the Image height specifically */}
        <CarouselPrevious className="absolute -left-8 top-[35%] h-12 w-12 border-none bg-gray-200 rounded-full   text-black" />
        <CarouselNext className="absolute -right-8 top-[35%] h-12 w-12 border-none bg-gray-200 rounded-full   text-black" />
      </Carousel>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all duration-300",
              current === i ? "bg-[#4a4a4a]" : "bg-gray-300",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default SchoolNewsCarousel;
