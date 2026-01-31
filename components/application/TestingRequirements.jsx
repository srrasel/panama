"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";

const TestingRequirements = () => {
  // All accordion data in one array
  const accordionItems = [
    {
      id: "requirements",
      title: "Requirements by Grade Level",
      isBold: true,
      content: [
        {
          form: "SECOND FORM (9TH GRADE) CANDIDATES",
          detail:
            "You must submit the results of your SSAT or ISEE scores taken on or after June.",
        },
        {
          form: "THIRD FORM (10TH GRADE) CANDIDATES",
          detail:
            "You must submit the results of your SSAT, ISEE, PSAT, SAT, or ACT scores taken on or after June.",
        },
        {
          form: "FOURTH FORM (11TH GRADE) CANDIDATES",
          detail:
            "You must submit the results of your SSAT, ISEE, PSAT, SAT, or ACT scores.",
        },
        {
          form: "FIFTH FORM (12TH GRADE) AND POSTGRADUATE CANDIDATES",
          detail:
            "You must submit the results of your PSAT, SAT, or ACT scores.",
        },
      ],
    },
    {
      id: "international",
      title: "International Applicants",
      isBold: false,
      content: "Content for International Applicants goes here.",
    },
    {
      id: "test-codes",
      title: "Pamavambo School Test Codes",
      isBold: false,
      content: "Content for Test Codes goes here.",
    },
    {
      id: "fee-waiver",
      title: "Fee Waiver",
      isBold: false,
      content: "Content for Fee Waiver goes here.",
    },
  ];

  const leftColumnItems = accordionItems.slice(0, 2);
  const rightColumnItems = accordionItems.slice(2);

  return (
    <section className="bg-[#2d2e33] max-w-7xl mx-auto py-24 px-6 md:px-20 lg:px-32 text-white">
      <div className="">
        <h2 className="font-serif text-4xl mb-4">Testing</h2>
        <p className="text-sm font-light text-gray-300 mb-12 italic">
          Required testing must be completed by January 15.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 items-start">
          {/* Left Column */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {leftColumnItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-none"
                >
                  <AccordionTrigger className="bg-white text-gray-500 data-[state=open]:bg-[#8c122a] data-[state=open]:text-white px-6 py-4 hover:no-underline group transition-all duration-200">
                    <div className="flex items-center gap-6">
                      <ChevronRight
                        size={16}
                        className="text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
                      />
                      <span
                        className={`text-xs tracking-widest uppercase ${item.isBold ? "font-bold" : "font-medium"}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-8">
                    {item.id === "requirements" ? (
                      <div className="space-y-10">
                        {item.content.map((req, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                              {req.form}
                            </h4>
                            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-md">
                              {req.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-300">{item.content}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {rightColumnItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-none"
                >
                  <AccordionTrigger className="bg-white text-gray-500 data-[state=open]:bg-[#8c122a] data-[state=open]:text-white px-6 py-4 hover:no-underline group transition-all duration-200">
                    <div className="flex items-center gap-6">
                      <ChevronRight
                        size={16}
                        className="text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-white"
                      />
                      <span
                        className={`text-xs tracking-widest uppercase ${item.isBold ? "font-bold" : "font-medium"}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-8">
                    <p className="text-sm text-gray-300">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingRequirements;
