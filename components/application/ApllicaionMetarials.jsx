"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ChevronRight } from "lucide-react";

const ApplicationMaterials = () => {
  return (
    <section className="bg-[#0F1B2D] max-w-7xl mx-auto py-24 mb-12 px-6 md:px-20 lg:px-32 text-[#F7F6F3] font-['Montserrat']">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Application Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="font-['Playfair_Display'] font-bold text-4xl md:text-5xl mb-6 text-[#F7F6F3]">
              Application
            </h2>

            <div className="space-y-6 text-[#F7F6F3]/80 font-light leading-relaxed border-l-2 border-[#D4A437] pl-6 italic">
              <p>
                The Pamavambo application deadline is based on the school terms.
              </p>
            </div>

            {/* Supplemental Materials Accordion */}
            <div className="pt-12 space-y-8">
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl italic text-[#D4A437]">
                Supplemental Application Materials
              </h3>

              <Accordion
                type="single"
                collapsible
                defaultValue="recommendations"
                className="space-y-4"
              >
                <AccordionItem value="recommendations" className="border-none">
                  <AccordionTrigger className="bg-[#1F2A44] text-[#F7F6F3] px-6 py-5 hover:no-underline group rounded-none border-b border-[#D4A437]/20">
                    <div className="flex items-center gap-6">
                      <ChevronRight
                        size={18}
                        className="text-[#D4A437] transition-transform duration-300 group-data-[state=open]:rotate-90"
                      />
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">
                        Recommendations
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-transparent pt-8 pb-4 px-12">
                    <ul className="list-disc space-y-4 text-sm font-light text-[#F7F6F3]/70 ml-4 marker:text-[#D4A437]">
                      <li>School report (current year)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="requirement" className="border-none">
                  <AccordionTrigger className="bg-[#1F2A44] text-[#F7F6F3] px-6 py-5 hover:no-underline group rounded-none border-b border-[#D4A437]/20">
                    <div className="flex items-center gap-6">
                      <ChevronRight
                        size={18}
                        className="text-[#D4A437] transition-transform duration-300 group-data-[state=open]:rotate-90"
                      />
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">
                        Requirements by Grade Level
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-transparent pt-8 pb-4 px-12">
                    <ul className="list-disc space-y-4 text-sm font-light text-[#F7F6F3]/70 ml-4 marker:text-[#D4A437]">
                      <li>
                        All transfer students entering Grade 3 and above will
                        complete an academic assessment as part of the enrollment process to ensure they are prepared for our Cambridge-aligned curriculum and Zimbabwe curriculum to identify the best placement for their success at Pamavambo.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Apply Button using Primary Gold (#D4A437) */}
              <button className="w-full bg-[#D4A437] hover:bg-[#E6C26A] transition-all duration-300 py-6 px-8 flex justify-between items-center group shadow-xl">
                <span className="text-[#0F1B2D] font-bold text-xs tracking-[0.3em] uppercase">
                  Apply Here
                </span>
                <ArrowRight
                  size={20}
                  className="text-[#0F1B2D] group-hover:translate-x-2 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Fees and CTA (Placeholder as per original structure) */}
        </div>
      </div>
    </section>
  );
};

export default ApplicationMaterials;