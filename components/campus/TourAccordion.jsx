"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ToursAccordion = ({
  // Accordion data
  accordionTitle = "Virtual House Tours",
  virtualTours = [
    {
      house: "DAWES HOUSE",
      location: "GIRLS' LOWER",
      thumb:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE",
    },
    {
      house: "DICKINSON HOUSE",
      location: "THE CIRCLE",
      thumb:
        "https://images.unsplash.com/photo-1580587767303-9cd3f02e6462?q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE",
    },
    {
      house: "RAYMOND HOUSE",
      location: "BOYS' LOWER",
      thumb:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE",
    },
    {
      house: "STEPHENS HOUSE",
      location: "THE CRESCENT",
      thumb:
        "https://images.unsplash.com/photo-1448630360428-65ff2f0a57e7?q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE",
    },
  ],

  // Styling
  sectionBgColor = "bg-[#f2e9d9]",
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className={`${sectionBgColor} px-6 md:px-20 lg:px-32 pb-20`}>
      <div className="max-w-7xl mx-auto">
        {/* Shadcn Accordion */}
        <Accordion type="single" collapsible className="w-full  ">
          <AccordionItem value="virtual-tours" className="border-none">
            <AccordionTrigger className="px-8 py-4 bg-gray-100 rounded text-gray-700 hover:no-underline font-medium ">
              <span className="flex items-center gap-4">{accordionTitle}</span>
            </AccordionTrigger>

            <AccordionContent className={`${sectionBgColor} p-0`}>
              <h3 className="font-bold text-xl mt-2 p-4">{accordionTitle}</h3>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {virtualTours.map((tour, idx) => (
                  <div key={idx} className="space-y-4">
                    {/* Header Text */}
                    <div className="text-[11px] font-bold tracking-[0.15em] text-gray-800 leading-tight">
                      <p>{tour.house}</p>
                      <p className="text-gray-500 font-medium">
                        {tour.location}
                      </p>
                    </div>

                    {/* Video Container */}
                    <div
                      className="relative aspect-video group cursor-pointer overflow-hidden shadow-md"
                      onClick={() => handleVideoClick(tour.videoUrl)}
                    >
                      <Image
                        src={tour.thumb}
                        alt={tour.house}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                        <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white opacity-90 group-hover:scale-110 transition-transform">
                          <Play fill="currentColor" size={24} />
                        </div>
                      </div>

                      {/* Top Branding Bar */}
                      <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 bg-linear-to-b from-black/60 to-transparent">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs"
                          style={{ backgroundColor: "#9b031f" }}
                        >
                          L
                        </div>
                        <span className="text-white text-sm font-medium truncate drop-shadow-sm">
                          Virtual Tour: {tour.house}, {tour.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
              <iframe
                src={selectedVideo}
                className="w-full h-full"
                title="Virtual House Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToursAccordion;
