"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";

const HeadOfSchoolCommunications = () => {
  const addresses = {
    convocation: [
      { year: "2025", title: "On Laughter" },
      { year: "2023", title: "On Being Kind" },
      { year: "2022", title: "On Faith" },
      { year: "2021", title: "On Hope" },
      { year: "2020", title: "On Truth" },
      {
        year: "2019",
        title: "Stuck on a Rock, Midstream: Moments to Test Your Mettle",
      },
      { year: "2018", title: "Speaking Truth to Power" },
      { year: "2017", title: "Mending Wall" },
      { year: "2016", title: "1925 Seagrave" },
    ],
    baccalaureate: [
      { year: "2025", title: "On Leading" },
      { year: "2024", title: "On Trust" },
      { year: "2023", title: "On Certainty" },
      { year: "2022", title: "On Courage" },
      { year: "2021", title: "On Justice" },
      { year: "2020", title: "On Love" },
      { year: "2019", title: "Through a Whole New Lens" },
      {
        year: "2018",
        title: "Ordinary Stories: The Tragic and the Heroic in Everyday Lives",
      },
      { year: "2017", title: "To Seek the Best for All" },
    ],
  };

  return (
    <section className="bg-white py-12 px-6 md:px-20 lg:px-32">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h3 className="font-bold text-gray-900 text-xl mb-8 tracking-tight">
          Key Communications from our Head of School
        </h3>

        <Accordion type="single" collapsible className="w-full space-y-px">
          {/* Main Accordion Item: Addresses */}
          <AccordionItem value="addresses" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline group data-[state=open]:bg-[#8c122a] data-[state=open]:text-white transition-colors duration-200">
              <div className="flex items-center gap-6">
                <ChevronRight
                  size={16}
                  className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
                />
                <span className="text-gray-500 font-medium text-sm group-data-[state=open]:text-white">
                  Addresses
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-white px-10 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Convocation Column */}
                <div className="space-y-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">
                    Convocation Addresses
                  </h4>
                  <ul className="space-y-3">
                    {addresses.convocation.map((item, i) => (
                      <li key={i} className="text-sm">
                        <a
                          href="#"
                          className="text-[#9b031f] font-bold border-b border-transparent hover:border-[#9b031f] transition-all"
                        >
                          {item.year} - {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8">
                    <a
                      href="#"
                      className="text-[#9b031f] font-bold text-sm border-b border-[#9b031f] pb-0.5"
                    >
                      Installation Remarks, October 9, 2015
                    </a>
                  </div>
                </div>

                {/* Baccalaureate Column */}
                <div className="space-y-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">
                    Baccalaureate Addresses
                  </h4>
                  <ul className="space-y-3">
                    {addresses.baccalaureate.map((item, i) => (
                      <li key={i} className="text-sm">
                        <a
                          href="#"
                          className="text-[#9b031f] font-bold border-b border-transparent hover:border-[#9b031f] transition-all"
                        >
                          {item.year} - {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* School Meeting Remarks */}
          <AccordionItem value="remarks" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline group data-[state=open]:bg-[#8c122a] data-[state=open]:text-white transition-colors duration-200 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <ChevronRight
                  size={16}
                  className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
                />
                <span className="text-gray-500 font-medium text-sm group-data-[state=open]:text-white">
                  School Meeting Remarks
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-10 py-4 text-sm text-gray-500">
              Content for School Meeting Remarks goes here.
            </AccordionContent>
          </AccordionItem>

          {/* Community Communications */}
          <AccordionItem value="community" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline group data-[state=open]:bg-[#8c122a] data-[state=open]:text-white transition-colors duration-200 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <ChevronRight
                  size={16}
                  className="text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
                />
                <span className="text-gray-500 font-medium text-sm group-data-[state=open]:text-white">
                  Community Communications
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-10 py-4 text-sm text-gray-500">
              Content for Community Communications goes here.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default HeadOfSchoolCommunications;
