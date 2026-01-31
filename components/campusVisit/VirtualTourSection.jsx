import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, Play } from "lucide-react";
import Image from "next/image";

export default function VirtualTourSection() {
  const tourData = [
    {
      title: "Houses",
      intro:
        "Your House is not just a place to live — it's where you start your journey, form lifelong bonds, and develop values you will carry for life. Each House has its own unique identity, events, and spirit. Whether you are a day or boarding student, your assigned House will become your home.",
      videos: [
        {
          label: "DAWES HOUSE, GIRLS' LOWER",
          image:
            "https://images.unsplash.com/photo-1541339907198-e08756defeec?q=80&w=1000",
        },
        {
          label: "RAYMOND HOUSE, BOYS' LOWER",
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000",
        },
        {
          label: "STEPHENS HOUSE, THE CRESCENT",
          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
        },
        {
          label: "DICKINSON HOUSE, THE CIRCLE",
          image:
            "https://images.unsplash.com/photo-1498243639359-2ead1ca70f45?q=80&w=1000",
        },
      ],
    },
    {
      title: "Classrooms and Library",
      intro:
        "Our academic spaces are designed for the Harkness method, fostering discussion, collaboration, and deep intellectual inquiry across all disciplines.",
      videos: [
        {
          label: "BUNN LIBRARY",
          image:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000",
        },
        {
          label: "HARKNESS CLASSROOMS",
          image:
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
        },
      ],
    },
    {
      title: "Athletics",
      intro:
        "With world-class facilities and a philosophy of 'athletics for all,' our students develop leadership and resilience on and off the field.",
      videos: [
        {
          label: "LAVINO FIELD HOUSE",
          image:
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
        },
        {
          label: "KEUFFEL STADIUM",
          image:
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000",
        },
      ],
    },
    {
      title: "Performing and Visual Arts",
      intro:
        "Creativity thrives here. From the main stage to the studio, students find their voice through a diverse range of artistic expressions.",
      videos: [
        {
          label: "KIRBY ARTS CENTER",
          image:
            "https://images.unsplash.com/photo-1503095394537-8c54d136b04d?q=80&w=1000",
        },
        {
          label: "GRUSS CENTER FOR ART AND DESIGN",
          image:
            "https://images.unsplash.com/photo-1460518451285-cd7afdf195de?q=80&w=1000",
        },
      ],
    },
    {
      title: "Dining and Community",
      intro:
        "Breaking bread together is a cornerstone of our community. Our dining halls are places of fellowship, laughter, and shared stories.",
      videos: [
        {
          label: "IRWIN DINING CENTER",
          image:
            "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1000",
        },
        {
          label: "ABBOTT DINING HALL",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
        },
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white font-sans">
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Too excited to wait? Take our virtual tour!
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-1">
          {tourData.map((section, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="bg-[#f4f4f4] hover:bg-[#ececec] data-[state=open]:bg-[#8c122a] data-[state=open]:text-white px-6 py-4 hover:no-underline group transition-all duration-200">
                <div className="flex items-center gap-6">
                  <ChevronRight
                    size={16}
                    className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
                  />
                  <span className="text-xs font-medium tracking-widest uppercase group-data-[state=open]:text-white">
                    {section.title}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="bg-gray-50  p-8 md:p-14">
                <div className="space-y-12">
                  {/* Introductory Text with Crimson Border */}
                  <div className=" pt-6">
                    <p className="text-[13px] leading-relaxed text-gray-700 font-light italic max-w-5xl">
                      {section.intro}
                    </p>
                  </div>

                  {/* Video/Image Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
                    {section.videos.map((video, vIdx) => (
                      <div key={vIdx} className="group cursor-pointer">
                        <p className="text-[10px] font-bold tracking-tight text-gray-900 uppercase mb-3">
                          {video.label}
                        </p>
                        <div className="relative aspect-video w-full overflow-hidden shadow-sm">
                          <Image
                            src={video.image}
                            alt={video.label}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all duration-300">
                            <div className="w-12 h-8 bg-red-600 rounded-md flex items-center justify-center shadow-lg group-hover:bg-red-700">
                              <Play
                                size={16}
                                className="text-white fill-white ml-0.5"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bottom Hero Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[450px] w-full overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
            alt="Campus Life"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-8 pr-4">
          <h2 className="text-5xl font-serif text-[#1a2b3c] leading-[1.1]">
            Step Into <br /> Pamavambo
          </h2>
          <p className="text-gray-600 text-[19px] leading-relaxed font-light">
            Visiting Pamavambo is just the beginning of discovering what's
            possible. Walking through campus, you'll start to imagine yourself
            diving into classes that challenge you, joining teammates on the
            field, rehearsing on stage, or making an impact through service.
          </p>
        </div>
      </div>
    </section>
  );
}
