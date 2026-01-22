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
    <section className="w-full bg-[#bc1a31] text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
        {/* Header Section */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-serif">
            Inquire
          </h2>
          <p className="text-sm sm:text-sm md:text-base opacity-90 leading-relaxed sm:leading-relaxed font-light">
            To begin the admission process, please complete The Lawrenceville
            School inquiry form. Once completed, we will send you additional
            information about our School and also connect you with members of
            our community.
          </p>
        </div>

        {/* First Accordion - "Should You Apply..." */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="boarding-vs-day"
            className="border border-amber-500/50 bg-[#a0162a] px-3 sm:px-4"
          >
            <AccordionTrigger className="hover:no-underline py-3 sm:py-4 text-left">
              <span className="text-xs sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest text-amber-400 uppercase">
                Should You Apply as a Boarding or Day Student?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm opacity-90 pb-4 sm:pb-6 leading-relaxed">
              <div className="space-y-6 sm:space-y-8 pt-3 sm:pt-4">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-xl font-serif">
                    Day Student Applicants
                  </h3>
                  <p className="text-xs sm:text-xs md:text-sm opacity-80 leading-relaxed font-light">
                    The following parameters define the boundaries within which
                    families are expected to apply as day student candidates.
                    All candidates outside those boundaries will be considered
                    boarding applicants.
                  </p>
                </div>

                {/* Perimeter Map Image */}
                <div className="relative w-full aspect-4/3 border-2 sm:border-3 md:border-4 border-[#a0162a] shadow-lg sm:shadow-xl md:shadow-2xl">
                  <Image
                    src="/admission/map.jpg"
                    alt="Day Student Perimeter Map"
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
            className="bg-white text-black border-none rounded-sm overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline py-3 sm:py-4 px-4 sm:px-6 group flex-row-reverse justify-between">
              {/* Custom Trigger with Left-Side Icon as per design */}
              <div className="flex items-center gap-3 sm:gap-4 w-full">
                <div className="border-r border-gray-200 pr-3 sm:pr-4">
                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-data-[state=open]:rotate-90 transition-transform"
                  />
                </div>
                <span className="text-xs font-bold tracking-wider sm:tracking-widest uppercase">
                  Submit Your Inquiry
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 pt-2 bg-[#a0162a] pb-4 sm:pb-6">
              <div className="w-full text-white font-sans">
                <form className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                  {/* SECTION: Prospective Student Information */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-[#d1d5db] text-[#1a1a1a] px-3 py-1 text-[10px] font-bold tracking-wider sm:tracking-widest uppercase">
                      Prospective Student Information
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8 md:gap-x-12">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Student First Name*
                        </label>
                        <input
                          type="text"
                          className="w-full sm:w-2/3 h-8 bg-white text-black px-2 outline-none"
                          required
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Student Preferred Name
                        </label>
                        <input
                          type="text"
                          className="w-full sm:w-2/3 h-8 bg-white text-black px-2 outline-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Student Last Name*
                        </label>
                        <input
                          type="text"
                          className="w-full sm:w-2/3 h-8 bg-white text-black px-2 outline-none"
                          required
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Student Email Address*
                        </label>
                        <input
                          type="email"
                          className="w-full sm:w-2/3 h-8 bg-white text-black px-2 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <p className="text-[10px] italic opacity-70 border-t border-white/20 pt-2">
                      Please list the Student's Permanent Address:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8 md:gap-x-12">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Country
                        </label>
                        <select className="w-full sm:w-2/3 h-8 bg-white text-black px-1 outline-none appearance-none cursor-pointer">
                          <option>United States</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90 mt-1 sm:mt-2">
                          Street
                        </label>
                        <textarea className="w-full sm:w-2/3 h-16 bg-white text-black p-2 outline-none resize-none" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION: Application Information */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-[#d1d5db] text-[#1a1a1a] px-3 py-1 text-[10px] font-bold tracking-wider sm:tracking-widest uppercase">
                      Application Information
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8 md:gap-x-12">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Grade Applying for*
                        </label>
                        <select
                          className="w-full sm:w-2/3 h-8 bg-white text-black px-1 outline-none"
                          required
                        >
                          <option value=""></option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90">
                          Residential Status Applying for*
                        </label>
                        <div className="w-full sm:w-2/3 flex flex-col sm:flex-row gap-2 sm:gap-4 text-[11px]">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="residency"
                              className="accent-[#1a1a1a]"
                            />{" "}
                            Boarding
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="residency"
                              className="accent-[#1a1a1a]"
                            />{" "}
                            Day
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION: Interests */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-[#d1d5db] text-[#1a1a1a] px-3 py-1 text-[10px] font-bold tracking-wider sm:tracking-widest uppercase">
                      Interests
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8 md:gap-x-12">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90 mt-1">
                          Additional Academic Interests
                        </label>
                        <div className="w-full sm:w-2/3 bg-white h-20 sm:h-24 overflow-y-scroll text-black text-[11px]">
                          {[
                            "English",
                            "Foreign Language",
                            "History",
                            "Math",
                            "Science",
                          ].map((item) => (
                            <div
                              key={item}
                              className="px-2 py-1 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                        <label className="text-[11px] leading-tight opacity-90 mt-1">
                          Extra-Curricular Interests
                        </label>
                        <div className="w-full sm:w-2/3 bg-white h-20 sm:h-24 overflow-y-scroll text-black text-[11px]">
                          {[
                            "Athletics",
                            "Community Service",
                            "Dance",
                            "Design",
                            "Music",
                          ].map((item) => (
                            <div
                              key={item}
                              className="px-2 py-1 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-4 sm:pt-6">
                    <button
                      type="submit"
                      className="bg-white text-black px-4 sm:px-6 py-1 text-[11px] font-bold uppercase shadow-sm hover:bg-gray-100 transition-colors w-full sm:w-auto"
                    >
                      Submit
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
