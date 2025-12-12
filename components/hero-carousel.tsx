"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  description: string
  primaryAction: { text: string; href: string }
  secondaryAction: { text: string; href: string }
  bgColor: string,
  bgImageurl: string
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Excellence Through Knowledge",
    subtitle: "Per Spinas Ad Culmina",
    description: "School Building",
    primaryAction: { text: "See Programs", href: "/academics" },
    secondaryAction: { text: "Learn More", href: "/about" },
    bgColor: "from-amber-900/60 to-amber-900/40",
    bgImageurl: "/1.jpg",
  },
  {
    id: 2,
    title: "Academic Excellence",
    subtitle: "Nurturing Minds, Building Futures",
    description: "Academic Excellence",
    primaryAction: { text: "Explore Academics", href: "/academics" },
    secondaryAction: { text: "Apply Now", href: "/admissions" },
    bgColor: "from-amber-900/60 to-amber-900/40",
    bgImageurl: "/2.jpg",
  },
  {
    id: 3,
    title: "Vibrant Student Life",
    subtitle: "Beyond the Classroom",
    description: "Student Life",
    primaryAction: { text: "Discover Activities", href: "#life" },
    secondaryAction: { text: "Latest News", href: "#news" },
    bgColor: "from-amber-900/60 to-amber-900/40",
    bgImageurl: "/3.jpg",
  },
  {
    id: 4,
    title: "Strong Community",
    subtitle: "Building Leaders Together",
    description: "School Community",
    primaryAction: { text: "Join Us", href: "/contact" },
    secondaryAction: { text: "Student Portal", href: "/login" },
    bgColor: "from-amber-900/60 to-amber-900/40",
    bgImageurl: "/4.jpg",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setAutoPlay(false)
  }

  return (
    <section id="home" className="relative min-h-screen w-full ">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-30" : "opacity-0 z-10"
            }`}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-950">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url('${slide.bgImageurl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="mx-auto max-w-7xl px-4 text-center text-white">
                
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{slide.title}</h1>
                <p className="mt-4 text-yellow-400 text-lg sm:text-xl">{slide.subtitle}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={slide.primaryAction.href}
                    className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-amber-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {slide.primaryAction.text}
                  </a>
                  <a
                    href={slide.secondaryAction.href}
                    className="rounded-full border-2 border-yellow-400 px-6 py-3 font-semibold text-white transition hover:bg-yellow-400/10"
                  >
                    {slide.secondaryAction.text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-8 left-1/2 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition ${
                index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setAutoPlay(false)}
          className="absolute top-0 left-0 z-30 flex h-full items-center justify-center px-4 group"
          aria-label="Previous slide"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 transition">
            <ChevronLeft className="w-4 h-4 text-white" />
          </span>
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setAutoPlay(false)}
          className="absolute top-0 right-0 z-30 flex h-full items-center justify-center px-4 group"
          aria-label="Next slide"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 transition">
            <ChevronRight className="w-4 h-4 text-white" />
          </span>
        </button>
      </div>
    </section>
  )
}
