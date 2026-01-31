"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, Globe, Briefcase } from "lucide-react";

export default function CareersPage() {
  const services = [
    {
      title: "College Counseling",
      description: "Personalized guidance to help students navigate the college admissions process, from list building to application submission.",
      icon: <BookOpen className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Internship Programs",
      description: "Opportunities for students to gain real-world experience through summer internships and partnerships with local businesses.",
      icon: <Briefcase className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Alumni Mentorship",
      description: "Connecting current students with successful alumni for mentorship, career advice, and networking opportunities.",
      icon: <Users className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Global Pathways",
      description: "Exploring international university options and gap year programs for students interested in studying abroad.",
      icon: <Globe className="w-8 h-8 text-amber-600" />,
    },
  ];

  return (
    <>
      <Navbar />
      <SecondHero
        title="Career Services"
        subtitle="Preparing students for success beyond the classroom through comprehensive counseling and experiential learning."
        backgroundImage="/life/readingtable.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers", href: "/life/careers" }]}
      />

      <main className="bg-white min-h-screen">
        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
                Building Your Future
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Pamavambo, we believe that education extends far beyond graduation. Our Career Services team is dedicated to empowering students with the tools, resources, and confidence they need to pursue their passions and achieve their professional goals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're exploring potential career paths, preparing for university applications, or seeking internship opportunities, we are here to support you every step of the way.
              </p>
              <button className="flex items-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-full hover:bg-amber-800 transition-colors font-semibold">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/life/grid_library.jpg"
                alt="Students studying in library"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-gray-50 py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Our Programs & Services</h2>
              <p className="text-gray-600 text-lg">Comprehensive support tailored to each student's unique journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 group">
                  <div className="mb-6 bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Resources Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
               <Image
                src="/life/students-laughing.webp"
                alt="Background pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Career Resource Center</h2>
                <p className="text-white/80 text-lg mb-8">
                  Access our digital library of career guides, resume templates, and interview preparation materials available exclusively for students.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold">
                    Access Portal
                  </button>
                  <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors font-semibold">
                    View Upcoming Workshops
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial / Success Story */}
        <section className="bg-white py-16 md:py-24 px-4 md:px-8 border-t border-gray-100">
           <div className="max-w-5xl mx-auto text-center">
             <div className="mb-8">
               <Image
                 src="/life/grid_advisors.webp" 
                 alt="Alumni Portrait"
                 width={120}
                 height={120}
                 className="rounded-full mx-auto object-cover border-4 border-amber-100"
               />
             </div>
             <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 italic mb-8">
               "The guidance I received from the Career Services team was instrumental in helping me secure my dream internship. They didn't just help with my resume; they helped me understand my own strengths."
             </blockquote>
             <cite className="not-italic">
               <span className="block font-bold text-gray-900 text-lg">Sarah Jenkins '23</span>
               <span className="block text-amber-600">Pre-Law Student</span>
             </cite>
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
