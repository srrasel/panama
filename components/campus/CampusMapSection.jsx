"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CloudSun, Download } from "lucide-react";
import Image from "next/image";

const CampusMapSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="font-serif text-5xl text-gray-900 mb-16">Campus Map</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Main Campus Map Illustration */}
          <div className="lg:col-span-8 border-4 border-[#C5A059]/30 p-2 relative aspect-4/3 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1200" // Placeholder for detailed campus map
              alt="Detailed Campus Map"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Sidebar: Download & Google Maps */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#D9F2F1] p-1 border-2 border-[#9b031f]">
              <button className="w-full flex items-center justify-center gap-3 py-4 bg-white text-[#9b031f] font-bold text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors">
                <Download size={18} />
                Download a Campus Map
              </button>
            </div>

            <div className="bg-[#D9F2F1] p-6 space-y-4">
              <h3 className="text-gray-800 font-serif text-2xl italic leading-tight">
                Get Directions to Campus
              </h3>
              {/* Google Maps Embed */}
              <div className="relative aspect-3/4 w-full border border-gray-200">
                <iframe
                  src="https://www.google.com/maps?q=Pamavambo%20School%20New%20Jersey&output=embed"
                  className="absolute inset-0 w-full h-full grayscale-[0.5]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Grid: Planning Your Visit & Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Planning Your Visit Accordion */}
          <div className="space-y-8">
            <h3 className="font-serif text-3xl text-gray-900 italic">
              Planning Your Visit
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {[
                "Accommodations for Overnight Visitors",
                "Local Transportation Services",
                "Other Schools Nearby",
              ].map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-gray-100"
                >
                  <AccordionTrigger className="text-sm font-medium text-gray-700 hover:no-underline hover:text-[#00A3A1] transition-colors py-5 text-left">
                    {item}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                    Pamavambo provides special rates for campus visitors at
                    partner hotels. Please contact our Admissions office for
                    more details.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Weather Display */}
          <div className="space-y-8">
            <h3 className="font-serif text-3xl text-gray-900 italic">
              How's the Weather?
            </h3>
            <div className="bg-linear-to-br from-[#4A90E2] to-[#2B6CB0] p-8 text-white shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1">
                    Lawrence Township
                  </p>
                  <p className="text-2xl font-light">WEATHER</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold">18°F</p>
                  <p className="text-xs font-light">clear sky</p>
                </div>
              </div>

              {/* 7-Day Mini Forecast */}
              <div className="grid grid-cols-7 gap-2 border-t border-white/20 pt-6">
                {["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map(
                  (day, i) => (
                    <div key={i} className="text-center space-y-2">
                      <p className="text-[10px] opacity-80">{day}</p>
                      <CloudSun size={14} className="mx-auto" />
                      <p className="text-[10px] font-bold">{18 + i}°F</p>
                    </div>
                  ),
                )}
              </div>
            </div>
            {/* Weather Station Accordion Link */}
            <Accordion
              type="single"
              collapsible
              className="w-full bg-gray-50/50"
            >
              <AccordionItem value="station-data" className="border-none">
                <AccordionTrigger className="px-4 py-4 text-xs font-bold tracking-widest text-gray-500 uppercase hover:no-underline">
                  Data from our Weather Station
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-xs text-gray-400">
                  Live data provided by the Environmental Studies department.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusMapSection;
