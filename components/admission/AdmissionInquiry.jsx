"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AdmissionInquiry() {
  return (
    <section className="w-full bg-[#1F2A44] text-[#F7F6F3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 font-['Montserrat']">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
        {/* Header Section */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold">
            Inquire
          </h2>
          <p className="text-sm sm:text-base opacity-90 leading-relaxed font-light">
            To begin the admission process, please complete The Pamavambo
            School inquiry form. Once completed, we will send you additional
            information about our School and also connect you with members of
            our community.
          </p>
        </div>

        {/* First Accordion - "Should You Apply..." */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="boarding-vs-day"
            className="border border-[#D4A437]/30 bg-[#0F1B2D] px-3 sm:px-4 rounded-none"
          >
            <AccordionTrigger className="hover:no-underline py-3 sm:py-4 text-left">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D4A437] uppercase">
                Should You Apply as a Boarding or Day Student?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm opacity-90 pb-4 sm:pb-6 leading-relaxed">
              <div className="space-y-6 sm:space-y-8 pt-3 sm:pt-4">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-['Playfair_Display'] font-bold text-[#F7F6F3]">
                    Day Student Applicants
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-light">
                    The following parameters define the boundaries within which
                    families are expected to apply as day student candidates.
                    All candidates outside those boundaries will be considered
                    boarding applicants.
                  </p>
                </div>

                {/* Perimeter Map Image */}
                <div className="relative w-full aspect-4/3 border-4 border-[#0F1B2D] shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop"
                    alt="Admission Planning"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Second Accordion - "Submit Your Inquiry" */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="submit-inquiry"
            className="bg-[#F7F6F3] text-[#1F2A44] border-none rounded-none overflow-hidden shadow-xl"
          >
            <AccordionTrigger className="hover:no-underline py-4 sm:py-6 px-4 sm:px-8 group flex-row-reverse justify-between">
              <div className="flex items-center gap-3 sm:gap-4 w-full">
                <div className="border-r border-[#D4A437]/30 pr-3 sm:pr-4">
                  <ChevronRight
                    size={20}
                    className="text-[#D4A437] group-data-[state=open]:rotate-90 transition-transform"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#1F2A44]">
                  Submit Your Inquiry
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-8 pt-2 bg-[#0F1B2D] pb-6 sm:pb-10">
              <div className="w-full text-[#F7F6F3]">
                <form className="max-w-4xl mx-auto space-y-6 sm:space-y-10 mt-6">
                  {/* SECTION: Prospective Student Information */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-[#D4A437] text-[#0F1B2D] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase">
                      Prospective Student Information
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-8 md:gap-x-16">
                      {[
                        { label: "Student First Name*", required: true },
                        { label: "Student Preferred Name", required: false },
                        { label: "Student Last Name*", required: true },
                        { label: "Student Email Address*", required: true, type: "email" }
                      ].map((field, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 w-full sm:w-1/3">
                            {field.label}
                          </label>
                          <input
                            type={field.type || "text"}
                            className="w-full sm:w-2/3 h-10 bg-[#F7F6F3] text-[#1F2A44] px-3 outline-none border-b-2 border-transparent focus:border-[#D4A437] transition-all"
                            required={field.required}
                          />
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] uppercase tracking-widest text-[#D4A437] border-t border-[#F7F6F3]/10 pt-4 font-bold">
                      Please list the Student&apos;s Permanent Address:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 md:gap-x-16">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 w-full sm:w-1/3">
                          Country
                        </label>
                        <select className="w-full sm:w-2/3 h-10 bg-[#F7F6F3] text-[#1F2A44] px-2 outline-none appearance-none cursor-pointer">
                          <option>United States</option>
                          <option>Zimbabwe</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 w-full sm:w-1/3 mt-2">
                          Street
                        </label>
                        <textarea className="w-full sm:w-2/3 h-20 bg-[#F7F6F3] text-[#1F2A44] p-3 outline-none resize-none" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION: Application Information */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-[#D4A437] text-[#0F1B2D] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase">
                      Application Information
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 md:gap-x-16">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 w-full sm:w-1/3">
                          Grade Applying for*
                        </label>
                        <select className="w-full sm:w-2/3 h-10 bg-[#F7F6F3] text-[#1F2A44] px-2 outline-none" required>
                          <option value=""></option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 w-full sm:w-1/3">
                          Residential Status*
                        </label>
                        <div className="w-full sm:w-2/3 flex gap-6 text-[11px] font-bold">
                          {["Boarding", "Day"].map((status) => (
                            <label key={status} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="residency" className="accent-[#D4A437] h-4 w-4" /> {status}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION: Interests */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-[#D4A437] text-[#0F1B2D] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase">
                      Interests
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-16">
                      {[
                        { label: "Academic Interests", items: ["English", "Foreign Language", "History", "Math", "Science"] },
                        { label: "Extra-Curricular", items: ["Athletics", "Community Service", "Dance", "Design", "Music"] }
                      ].map((sect, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-start justify-between gap-2">
                          <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 w-full sm:w-1/3 mt-1">
                            {sect.label}
                          </label>
                          <div className="w-full sm:w-2/3 bg-[#F7F6F3] h-28 overflow-y-scroll text-[#1F2A44] text-[11px] font-medium border border-[#D4A437]/20">
                            {sect.items.map((item) => (
                              <div key={item} className="px-3 py-2 hover:bg-[#D4A437]/10 cursor-pointer border-b border-[#1F2A44]/5 transition-colors">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-6 border-t border-[#F7F6F3]/10">
                    <button
                      type="submit"
                      className="bg-[#D4A437] text-[#0F1B2D] px-12 py-4 text-[12px] font-bold uppercase tracking-widest shadow-xl hover:bg-[#E6C26A] transition-all w-full sm:w-auto"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}