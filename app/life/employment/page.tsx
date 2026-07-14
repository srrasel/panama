"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Globe, Briefcase } from "lucide-react";

export default function EmploymentPage() {
  const services = [
    {
      title: "Teaching Positions",
      description: "Join our faculty and help shape the next generation through rigorous academics, mentorship, and a values-driven learning environment.",
      icon: <BookOpen className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Administrative Roles",
      description: "Support school operations across admissions, finance, communications, and student services in a collaborative professional setting.",
      icon: <Briefcase className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Support Staff",
      description: "Contribute to campus life through roles in maintenance, dining, security, transport, and other essential school services.",
      icon: <Users className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Substitute & Part-Time",
      description: "Flexible opportunities for educators and professionals who want to serve the Pamavambo community on a part-time basis.",
      icon: <Globe className="w-8 h-8 text-amber-600" />,
    },
  ];

  return (
    <>
      <Navbar />
      <SecondHero
        title="Employment"
        subtitle="Join the Pamavambo team and help us deliver exceptional education rooted in excellence, character, and purpose."
        backgroundImage="/employmentbg.jpeg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Employment", href: "/life/employment" }]}
      />

      <main className="bg-white min-h-screen">
        <section className="py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="md:w-1/2 space-y-4 sm:space-y-6 w-full">
            
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Pamavambo&apos;s faculty combine academic expertise with genuine care for each student&apos;s holistic development. Our teachers are skilled educators who make learning engaging and relevant, connecting rigorous academics to real-world application and cultural context. They create classroom environments where students feel safe to ask questions, make mistakes, and grow intellectually and morally. With commitment extending beyond the classroom, our faculty mentor students, lead extracurricular activities, and partner with families to support each child&apos;s journey. Their dedication to inspiring the best in each student defines the Pamavambo educational experience.
              </p>
              
            </div>
            <div className="md:w-1/2 relative h-56 sm:h-72 md:h-96 lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/school.jpg"
                alt="Pamavambo staff at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section id="open-positions" className="bg-gray-50 py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-3 sm:mb-4">Current Opportunities</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">Explore roles across teaching, administration, and school support services.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 group">
                  <div className="mb-4 sm:mb-6 bg-amber-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        <section className="py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl sm:rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop"
                alt="Background pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="text-white max-w-5xl w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3 sm:mb-4">Join Our Team
                </h2>
                <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                If you&apos;re inspired by our mission to challenge young people to lead lives of learning, integrity, and high purpose—developing the whole child through academic excellence rooted in Christian values and cultural identity—we want to hear from you. Send us your resume regardless of whether there is a current opening that matches your background and expertise.
                </p>
                <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">We seek educators and staff who embody our core values of integrity, accountability, spiritual development, and service, and who are committed to inspiring the best in each to seek the best for all.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link
                    href="#open-positions"
                    className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold text-center text-sm sm:text-base"
                  >
                    View Open Positions
                  </Link>
                  <Link
                    href="/life/employment/apply"
                    className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors font-semibold text-center text-sm sm:text-base"
                  >
                    Submit Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      
      </main>

      <Footer />
    </>
  );
}
