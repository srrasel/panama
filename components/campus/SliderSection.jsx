"use client";
import Image from "next/image";
import { useState } from "react";

const SliderSection = ({
  // Main header data
  title = "Houses",
  descriptionParagraphs = [
    "Each Pamavambo student belongs to a House. A House is a residential building which also serves as home base for our day students.",
    "Our 18 residential Houses are intentionally designed to support growth and engagement at each grade level.",
  ],
  learnMoreText = "LEARN MORE ABOUT STUDENT LIFE",
  learnMoreLink = "/student-life",

  // Slider data
  sliderImages = [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
    "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=1000",
  ],

  // Styling
  sectionBgColor = "bg-[#f2e9d9]",
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = (newIndex) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveSlide(newIndex);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const goToPrevious = () => {
    const newIndex =
      (activeSlide - 1 + sliderImages.length) % sliderImages.length;
    handleSlideChange(newIndex);
  };

  const goToNext = () => {
    const newIndex = (activeSlide + 1) % sliderImages.length;
    handleSlideChange(newIndex);
  };

  return (
    <section className={`${sectionBgColor} py-20 mt-10 px-6 md:px-20 lg:px-32`}>
      <div className="max-w-7xl mx-auto">
        {/* Header & Slider Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="font-serif text-5xl text-gray-900 font-bold">
              {title}
            </h2>
            <div className="space-y-6 text-gray-800 font-light leading-relaxed text-lg">
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <button
              onClick={() => (window.location.href = learnMoreLink)}
              className="text-[10px] font-bold tracking-[0.25em] uppercase border-b-2 border-black pb-1 hover:text-red-800 hover:border-red-800 transition-all cursor-pointer"
            >
              {learnMoreText}
            </button>
          </div>

          {/* Right-side Slider */}
          <div className="relative group">
            <div className="relative aspect-[16/10] overflow-hidden shadow-sm">
              {/* All slides in a container with opacity transition */}
              <div className="relative w-full h-full">
                {sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-400 ease-in-out ${
                      activeSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`House slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-2.5 mt-6">
              {sliderImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSlideChange(i)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlide === i ? "bg-gray-800 scale-125" : "bg-gray-400"
                  } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
