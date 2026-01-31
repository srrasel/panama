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
    <section className="bg-[#2d2e33] max-w-7xl mx-auto py-24 px-6 md:px-20 lg:px-32 text-white">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Application Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="font-serif text-4xl mb-6">Application</h2>

            <div className="space-y-6 text-gray-300 font-light leading-relaxed">
              <p>
                The Pamavambo application deadline is{" "}
                <span className="font-bold text-white">January 15.</span>
              </p>

              <p>
                To apply to Pamavambo please use the{" "}
                <a
                  href="#"
                  className="font-bold text-white italic border-b border-white/30 hover:border-white transition-all"
                >
                  Gateway to Prep School Application.
                </a>
              </p>

              <p className="text-sm">
                You can see the steps to completing a Gateway application in
                this video. Please refer to the Gateway checklist to make sure
                you've submitted all required documents for the Pamavambo
                application process.
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
                {/* Recommendations - Active Crimson State */}
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
                      <li>Principal/Counselor Recommendation (current year)</li>
                      <li>
                        English Teacher Recommendation (This can also be
                        submitted by a teacher from Humanities -
                        English/History/Social Studies/Social Sciences).
                      </li>
                      <li>
                        Math Teacher Recommendation (This can also be submitted
                        by a teacher from STEM - Math/Science/Engineering).
                      </li>
                    </ul>
                    <p className="mt-8 text-xs italic text-gray-400">
                      All recommendations are to be submitted by the current
                      teachers during the time of applying to Pamavambo.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                {/* Transcripts - Inactive State */}
                <AccordionItem value="transcripts" className="border-none">
                  <AccordionTrigger className="bg-white text-gray-500 px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-6">
                      <ChevronRight size={16} className="text-gray-400" />
                      <span className="text-xs font-medium tracking-widest uppercase">
                        Transcripts
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white/5 p-6 text-sm text-gray-300">
                    Details regarding transcript submission...
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Column: Fees and CTA */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                Application Fee
              </h4>
              <div className="text-sm font-light text-gray-300 space-y-1">
                <p>
                  <span className="font-bold text-white">$50</span> for Domestic
                  Candidates
                </p>
                <p>
                  <span className="font-bold text-white">$100</span> for
                  International Candidates
                </p>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed pt-4">
                Domestic candidates, please email our office at{" "}
                <a
                  href="mailto:admission@pamavambo.org"
                  className="text-white border-b border-white/20"
                >
                  admission@pamavambo.org
                </a>{" "}
                to request an application fee waiver if you are experiencing
                financial hardship.
              </p>
            </div>

            {/* Gold CTA Button */}
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
      </div>
    </section>
  );
};

export default ApplicationMaterials;
