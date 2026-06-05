"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, Globe, Briefcase } from "lucide-react";

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
        backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Employment", href: "/life/employment" }]}
      />

      <main className="bg-white min-h-screen">
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
            
              <p className="text-lg text-gray-700 leading-relaxed">
              Pamavambo's faculty combine academic expertise with genuine care for each student's holistic development. Our teachers are skilled educators who make learning engaging and relevant, connecting rigorous academics to real-world application and cultural context. They create classroom environments where students feel safe to ask questions, make mistakes, and grow intellectually and morally. With commitment extending beyond the classroom, our faculty mentor students, lead extracurricular activities, and partner with families to support each child's journey. Their dedication to inspiring the best in each student defines the Pamavambo educational experience.              </p>
              
            </div>
            <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
                alt="Pamavambo staff at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        

        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop"
                alt="Background pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Join Our Team
                </h2>
                <p className="text-white/80 text-lg mb-8">
                If you're inspired by our mission to challenge young people to lead lives of learning, integrity, and high purpose—developing the whole child through academic excellence rooted in Christian values and cultural identity—we want to hear from you. Send us your resume regardless of whether there is a current opening that matches your background and expertise.  </p>
                <p className="text-white/80 text-lg mb-8">We seek educators and staff who embody our core values of integrity, accountability, spiritual development, and service, and who are committed to inspiring the best in each to seek the best for all.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold">
                    View Open Positions
                  </button>
                  <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors font-semibold">
                    Submit Application
                  </button>
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
