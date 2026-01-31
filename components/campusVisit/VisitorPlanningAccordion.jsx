"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";

const VisitorPlanningAccordion = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h2 className="font-serif text-3xl mb-8">Planning Your Visit</h2>

      <Accordion type="single" collapsible className="space-y-1">
        {/* Transportation Section */}
        <AccordionItem value="transportation" className="border-none">
          <AccordionTrigger className="bg-[#f4f4f4] hover:bg-[#ececec] data-[state=open]:bg-[#8c122a] data-[state=open]:text-white px-6 py-4 hover:no-underline group transition-all duration-200">
            <div className="flex items-center gap-6">
              <ChevronRight
                size={16}
                className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
              />
              <span className="text-xs font-medium tracking-widest text-gray-600 uppercase group-data-[state=open]:text-white">
                Transportation
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white border border-[#f4f4f4] p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Column 1: Airports */}
              <div>
                <h4 className="font-bold text-lg mb-6">Airports</h4>
                <ul className="space-y-4 text-sm text-gray-700 font-light">
                  <li>
                    Philadelphia International Airport (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      PHL
                    </span>
                    )
                  </li>
                  <li>
                    Newark Liberty International Airport (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      EWR
                    </span>
                    )
                  </li>
                  <li>
                    La Guardia International Airport (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      LGA
                    </span>
                    )
                  </li>
                  <li>
                    John F. Kennedy International Airport (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      JFK
                    </span>
                    )
                  </li>
                  <li>
                    Trenton - Mercer Airport (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      TTN
                    </span>
                    ) - Domestic Flights
                  </li>
                </ul>
              </div>

              {/* Column 2: Trains/Buses */}
              <div>
                <h4 className="font-bold text-lg mb-6">Trains and Buses</h4>
                <ul className="space-y-4 text-sm text-gray-700 font-light">
                  <li>
                    Trenton Transit Center (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      TR
                    </span>
                    )
                  </li>
                  <li>
                    Princeton Junction (
                    <span className="text-[#8c122a] border-b border-[#8c122a]">
                      PJ
                    </span>
                    )
                  </li>
                  <li className="text-[#8c122a] border-b border-[#8c122a] w-fit">
                    NJ Transit
                  </li>
                  <li className="text-[#8c122a] border-b border-[#8c122a] w-fit">
                    SEPTA
                  </li>
                </ul>
              </div>

              {/* Column 3: Car Services */}
              <div>
                <h4 className="font-bold text-lg mb-6">Car Services</h4>
                <div className="space-y-6 text-sm">
                  <div>
                    <p className="font-bold border-b border-[#8c122a] w-fit">
                      Spectrum Limousine
                    </p>
                    <p className="text-gray-500">(609) 921-3330</p>
                    <p className="text-[#8c122a] border-b border-[#8c122a] w-fit">
                      mindy@spectrumlimousine.com
                    </p>
                  </div>
                  <div>
                    <p className="font-bold border-b border-[#8c122a] w-fit">
                      A-1 Limousine
                    </p>
                    <p className="text-gray-500">(888) 546-6888</p>
                    <p className="text-[#8c122a] border-b border-[#8c122a] w-fit">
                      info@a1limo.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Accommodations Section */}
        <AccordionItem value="accommodations" className="border-none">
          <AccordionTrigger className="bg-[#f4f4f4] hover:bg-[#ececec] data-[state=open]:bg-[#8c122a] data-[state=open]:text-white px-6 py-4 hover:no-underline group transition-all duration-200">
            <div className="flex items-center gap-6">
              <ChevronRight
                size={16}
                className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
              />
              <span className="text-xs font-medium tracking-widest text-gray-600 uppercase group-data-[state=open]:text-white">
                Accommodations
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white border border-[#f4f4f4] p-10">
            <h4 className="font-bold text-xl mb-8">Nearby Hotels</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {/* Hotel Entry Example */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <p className="font-bold text-[#8c122a] border-b border-[#8c122a] w-fit">
                    The Inn at Glencairn
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    3301 Pamavambo Road, Princeton, NJ 08540
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    (609) 497-1737
                  </p>
                </div>
                <span className="text-xs text-gray-400">2.0 mi</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <p className="font-bold text-[#8c122a] border-b border-[#8c122a] w-fit">
                    The Peacock Inn
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    20 Bayard Lane, Princeton, NJ 08540
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    (609) 924-1707
                  </p>
                </div>
                <span className="text-xs text-gray-400">5.4 mi</span>
              </div>
              {/* Additional hotels would follow this pattern */}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Nearby Schools Section */}
        <AccordionItem value="schools" className="border-none">
          <AccordionTrigger className="bg-[#f4f4f4] hover:bg-[#ececec] data-[state=open]:bg-[#8c122a] data-[state=open]:text-white px-6 py-4 hover:no-underline group transition-all duration-200">
            <div className="flex items-center gap-6">
              <ChevronRight
                size={16}
                className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
              />
              <span className="text-xs font-bold tracking-widest uppercase group-data-[state=open]:text-white">
                Nearby Schools
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white border border-[#f4f4f4] p-10">
            <ul className="space-y-4 text-sm text-gray-700 font-light">
              <li>
                Hun School of Princeton -{" "}
                <span className="italic">8 minutes away</span>
              </li>
              <li>
                Lawrence High School -{" "}
                <span className="italic">5 minutes away</span>
              </li>
              <li>
                Princeton Day School -{" "}
                <span className="italic">12 minutes away</span>
              </li>
              <li>
                Peddie School - <span className="italic">24 minutes away</span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default VisitorPlanningAccordion;
