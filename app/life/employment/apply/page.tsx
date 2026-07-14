"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import SecondHero from "@/components/common/SecondHero"
import { toast } from "sonner"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"

const POSITIONS = [
  "Teaching Positions",
  "Administrative Roles",
  "Support Staff",
  "Substitute & Part-Time",
  "Other",
]

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  coverLetter: "",
}

export default function EmploymentApplyPage() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.fullName.trim() || !form.email.trim() || !form.position || !form.coverLetter.trim()) {
      toast.error("Please fill in all required fields.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/employment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")

      setSubmitted(true)
      setForm(initialForm)
      toast.success("Application submitted successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <SecondHero
        title="Submit Application"
        subtitle="Join the Pamavambo team. Tell us about yourself and the role you are interested in."
        backgroundImage="/employmentbg.jpeg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Employment", href: "/life/employment" },
          { label: "Apply", href: "/life/employment/apply" },
        ]}
      />

      <main className="bg-[#F7F6F3] min-h-screen py-12 md:py-20 px-4 md:px-8 font-['Montserrat']">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/life/employment"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F2A44] hover:text-[#D4A437] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Employment
          </Link>

          {submitted ? (
            <div className="bg-white border border-[#E5E7EB] p-10 md:p-14 text-center shadow-sm">
              <CheckCircle2 className="w-16 h-16 text-[#D4A437] mx-auto mb-6" />
              <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#1F2A44] mb-4">
                Application Received
              </h2>
              <p className="text-[#222222]/80 leading-relaxed max-w-lg mx-auto mb-8">
                Thank you for your interest in joining Pamavambo Private School.
                Our team will review your application and get back to you soon.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#1F2A44] text-white px-6 py-3 font-semibold text-sm uppercase tracking-wider hover:bg-[#D4A437] hover:text-[#0F1B2D] transition-colors"
                >
                  Submit Another
                </button>
                <Link
                  href="/life/employment"
                  className="border border-[#1F2A44] text-[#1F2A44] px-6 py-3 font-semibold text-sm uppercase tracking-wider hover:bg-[#1F2A44] hover:text-white transition-colors"
                >
                  Back to Employment
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] shadow-sm">
              <div className="bg-[#1F2A44] px-6 md:px-10 py-6">
                <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#F7F6F3]">
                  Employment Application
                </h2>
                <p className="text-[#F7F6F3]/70 text-sm mt-2">
                  Fields marked with * are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className="w-full border border-[#E5E7EB] px-4 py-3 text-sm focus:outline-none focus:border-[#D4A437] bg-[#F7F6F3]"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full border border-[#E5E7EB] px-4 py-3 text-sm focus:outline-none focus:border-[#D4A437] bg-[#F7F6F3]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full border border-[#E5E7EB] px-4 py-3 text-sm focus:outline-none focus:border-[#D4A437] bg-[#F7F6F3]"
                      placeholder="+263 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-2">
                      Position Applied For *
                    </label>
                    <select
                      required
                      value={form.position}
                      onChange={(e) => update("position", e.target.value)}
                      className="w-full border border-[#E5E7EB] px-4 py-3 text-sm focus:outline-none focus:border-[#D4A437] bg-[#F7F6F3]"
                    >
                      <option value="">Select a position</option>
                      {POSITIONS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-2">
                    Experience / Qualifications
                  </label>
                  <textarea
                    rows={3}
                    value={form.experience}
                    onChange={(e) => update("experience", e.target.value)}
                    className="w-full border border-[#E5E7EB] px-4 py-3 text-sm focus:outline-none focus:border-[#D4A437] bg-[#F7F6F3] resize-y"
                    placeholder="Briefly share your relevant experience and qualifications"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2A44] mb-2">
                    Cover Letter / Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.coverLetter}
                    onChange={(e) => update("coverLetter", e.target.value)}
                    className="w-full border border-[#E5E7EB] px-4 py-3 text-sm focus:outline-none focus:border-[#D4A437] bg-[#F7F6F3] resize-y"
                    placeholder="Tell us why you want to join Pamavambo Private School..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E5E7EB]">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#D4A437] text-[#0F1B2D] px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#E6C26A] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <Link
                    href="/life/employment"
                    className="sm:w-auto text-center border border-[#1F2A44]/30 text-[#1F2A44] px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#1F2A44] hover:text-white transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
