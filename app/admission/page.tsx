"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle2, Calendar, Users, TrendingUp, ArrowRight } from "lucide-react"
import { useState } from "react"
import AdmissionSection from "@/components/sections/admission"

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentType: "student",
    program: "computer-science",
    qualifications: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Admission form submitted:", formData)
    alert("Application submitted successfully!")
  }

  const requirements = [
    { icon: CheckCircle2, title: "High School Diploma", description: "Or equivalent qualification" },
    { icon: Calendar, title: "Application Deadline", description: "Submit before Dec 31, 2025" },
    { icon: Users, title: "Recommendation Letters", description: "2 letters from educators" },
    { icon: TrendingUp, title: "Entrance Assessment", description: "Language & aptitude test" },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="px-4 py-20 md:py-28 bg-[rgb(127,29,29)]">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">Join Our Learning Community</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto text-balance">Take the first step toward your educational goals. Our comprehensive admission process ensures we find the right fit for every student.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <Users className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">12k+</div>
                    <div className="text-white/80 text-sm">Active Students</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-white/80 text-sm">Placement Rate</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">Dec 31</div>
                    <div className="text-white/80 text-sm">Application Deadline</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AdmissionSection/>

      

        {/* Application Form */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-border bg-card p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">Application Form</h2>
              <p className="text-foreground/60 mb-8">Complete this form to begin your admission journey</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Student Type</label>
                    <select
                      value={formData.studentType}
                      onChange={(e) => setFormData({ ...formData, studentType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="student">Student</option>
                      <option value="working">Working Professional</option>
                      <option value="international">International Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Program</label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="computer-science">Computer Science</option>
                      <option value="business">Business Administration</option>
                      <option value="engineering">Engineering</option>
                      <option value="arts">Arts & Humanities</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Previous Qualifications</label>
                  <textarea
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe your educational background..."
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                >
                  Submit Application <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
