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
    <section className="bg-[#2d2e33] max-w-7xl mx-auto py-24 mb-12 px-6 md:px-20 lg:px-32 text-white">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Application Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="font-serif text-4xl mb-6">Application</h2>

            <div className="space-y-6 text-gray-300 font-light leading-relaxed">
              <p>
                The pamavambo application deadline is based on the school terms
              </p>
            </div>

            {/* Supplemental Materials Accordion */}
            <div className="pt-12 space-y-8">
              <h3 className="font-serif text-2xl italic">
                Supplemental Application Materials
              </h3>

              <Accordion
                type="single"
                collapsible
                defaultValue="recommendations"
                className="space-y-4"
              >
                <AccordionItem value="recommendations" className="border-none">
                  <AccordionTrigger className="bg-[#8c122a] text-white px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-6">
                      <ChevronRight
                        size={16}
                        className="transition-transform duration-200 group-data-[state=open]:rotate-90"
                      />
                      <span className="text-xs font-bold tracking-widest uppercase">
                        Recommendations
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-transparent pt-8 pb-4 px-12">
                    <ul className="list-disc space-y-4 text-sm font-light text-gray-300 ml-4">
                      <li>
                        School report ( current
                        year)
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="requirement" className="border-none">
                  <AccordionTrigger className="bg-[#8c122a] text-white px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-6">
                      <ChevronRight
                        size={16}
                        className="transition-transform duration-200 group-data-[state=open]:rotate-90"
                      />
                      <span className="text-xs font-bold tracking-widest uppercase">
                        REQUIREMENTS BY GRADE LEVEL
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-transparent pt-8 pb-4 px-12">
                    <ul className="list-disc space-y-4 text-sm font-light text-gray-300 ml-4">
                      <li>
                        All transfer students entering Grade 3 and above will
                        complete an academic assessment as part of the enrollment process to ensure they are prepared for our Cambridge-aligned curriculum and Zimbabwe curriculum to identify the best placement for their success at Pamavambo.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <button className="w-full bg-[#C5A059] hover:bg-[#b38f4d] transition-colors py-5 px-8 flex justify-between items-center group">
                <span className="text-black font-bold text-xs tracking-[0.2em] uppercase">
                  Apply Here
                </span>
                <ArrowRight
                  size={18}
                  className="text-black group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Fees and CTA */}
        </div>
      </div>
    </section>
  );
};

export default ApplicationMaterials;
