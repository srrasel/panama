"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { BookOpen, Users, Award, Clock, FileText, Lightbulb } from "lucide-react"
import AcademicSection from "@/components/sections/academic"

export default function AcademicPage() {
  const programs = [
    {
      icon: BookOpen,
      title: "Undergraduate Programs",
      description: "4-year degree programs with comprehensive curriculum covering theory and practical applications.",
      courses: 50,
    },
    {
      icon: Award,
      title: "Graduate Programs",
      description: "Advanced studies with specialized focus areas and research opportunities.",
      courses: 30,
    },
    {
      icon: Lightbulb,
      title: "Certificate Programs",
      description: "Short-term, focused programs for professional development and skill enhancement.",
      courses: 25,
    },
    {
      icon: Users,
      title: "Professional Workshops",
      description: "Industry-led workshops and seminars with leading experts and practitioners.",
      courses: 40,
    },
  ]

  const academicInfo = [
    {
      icon: Clock,
      title: "Academic Calendar",
      description: "Fall Semester: Aug 15 - Dec 20 | Spring Semester: Jan 10 - May 15 | Summer: Jun 1 - Jul 31",
    },
    {
      icon: FileText,
      title: "Credit System",
      description: "Each course carries specific credits. Minimum 120 credits required for undergraduate degree.",
    },
    {
      icon: Award,
      title: "Grading Scale",
      description: "A (90-100), B (80-89), C (70-79), D (60-69), F (Below 60). GPA calculated from all coursework.",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="px-4 py-20 md:py-28 bg-[rgb(127,29,29)]">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">Academic Excellence</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto text-balance">Comprehensive programs designed to foster critical thinking, innovation, and professional growth.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <BookOpen className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">145+</div>
                    <div className="text-white/80 text-sm">Courses</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <Award className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">Top 5%</div>
                    <div className="text-white/80 text-sm">Graduate Outcomes</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <Users className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">12k+</div>
                    <div className="text-white/80 text-sm">Active Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AcademicSection/>
      </main>
      <Footer />
    </>
  )
}
