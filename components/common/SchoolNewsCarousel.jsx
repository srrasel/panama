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
import Link from "next/link";
import { useEffect, useState } from "react";

const SchoolNewsCarousel = ({
  title = "School News",
  description = "Stories of the community members, programs, and happenings that shape life at Pamavambo.",
  buttonText = "Read All News Stories",
  buttonLink = "/news",
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
    <section className="w-full bg-[#F7F6F3] font-['Montserrat']">
      <div className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-[#1F2A44] tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-[#222222] opacity-80 text-sm md:text-base leading-relaxed max-w-lg italic">
            {description}
          </p>
        </div>
        <Button
          asChild
          className="bg-[#1F2A44] hover:bg-[#0F1B2D] text-[#F7F6F3] rounded-none px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] transition-all shrink-0 shadow-lg"
        >
          <Link href={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      </div>

      {/* Social Icons Strip - Using Brand Colors */}
      <div className="flex justify-end gap-2 mb-6">
        <div className="bg-[#1F2A44]/10 p-2 rounded-none cursor-pointer hover:bg-[#D4A437] hover:text-white transition-all group">
          <Rss className="w-4 h-4 text-[#1F2A44] group-hover:text-white" />
        </div>
        <div className="bg-[#D4A437] p-2 rounded-none cursor-pointer hover:bg-[#E6C26A] transition-all">
          <Bell className="w-4 h-4 text-[#0F1B2D]" />
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
              <Link href={post.href || "#"}>
                <div className="flex flex-col gap-6 group/card cursor-pointer bg-white p-2 border border-transparent hover:border-[#D4A437]/20 transition-all duration-500">
                  {/* Image Container with Brand Border Effect */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#1F2A44]/10 group-hover/card:bg-transparent transition-colors duration-500" />
                  </div>
                  {/* Text Content */}
                  <div className="space-y-3 pb-4 px-2">
                    <p className="text-[10px] text-[#D4A437] uppercase tracking-[0.25em] font-bold">
                      {post.date}
                    </p>
                    <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold leading-snug text-[#1F2A44] group-hover/card:text-[#D4A437] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows - Using Navy and Gold Accents */}
        <CarouselPrevious className="absolute -left-4 md:-left-12 top-[40%] h-14 w-14 border-none bg-[#1F2A44] text-[#D4A437] hover:bg-[#D4A437] hover:text-[#0F1B2D] rounded-none shadow-xl transition-all opacity-0 group-hover:opacity-100" />
        <CarouselNext className="absolute -right-4 md:-right-12 top-[40%] h-14 w-14 border-none bg-[#1F2A44] text-[#D4A437] hover:bg-[#D4A437] hover:text-[#0F1B2D] rounded-none shadow-xl transition-all opacity-0 group-hover:opacity-100" />
      </Carousel>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-4 mt-16">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-none",
              current === i ? "w-12 bg-[#D4A437]" : "w-6 bg-[#1F2A44]/20 hover:bg-[#1F2A44]/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      </div>
    </section>
  );
};

export default SchoolNewsCarousel;