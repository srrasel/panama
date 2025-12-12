import type React from "react"

export default function AdmissionSection(): React.ReactElement {
  return (
    <section id="admissions" className="py-24 bg-stone-50 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll is-visible">
          <h2 className="text-brand-900 font-bold tracking-wide uppercase text-sm mb-3">Admissions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Admissions Process — Step-by-step guide for prospective families</h3>
          <p className="text-stone-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Follow this simple pathway to join the Thornhill High School community. Our team is here to support you at every step.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <li className="reveal-on-scroll is-visible">
            <div className="h-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-brand-900 text-white flex items-center justify-center font-bold shadow-md">1</div>
              <div className="w-12 h-12 rounded-lg bg-brand-900/10 text-brand-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">Inquiry &amp; Campus Tour</h4>
              <p className="text-stone-600">Submit an inquiry and book a campus or virtual tour to explore our classrooms, labs, and facilities.</p>
            </div>
          </li>

          <li className="reveal-on-scroll is-visible" style={{ transitionDelay: "60ms" }}>
            <div className="h-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">2</div>
              <div className="w-12 h-12 rounded-lg bg-amber-600/10 text-amber-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">Submit Application</h4>
              <p className="text-stone-600">Complete the online form and upload required documents. Applications are reviewed on a rolling basis.</p>
            </div>
          </li>

          <li className="reveal-on-scroll is-visible" style={{ transitionDelay: "120ms" }}>
            <div className="h-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-brand-900 text-white flex items-center justify-center font-bold shadow-md">3</div>
              <div className="w-12 h-12 rounded-lg bg-brand-900/10 text-brand-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">Entrance Assessment</h4>
              <p className="text-stone-600">Age-appropriate assessments help us understand readiness and ensure appropriate placement.</p>
            </div>
          </li>

          <li className="reveal-on-scroll is-visible" style={{ transitionDelay: "180ms" }}>
            <div className="h-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">4</div>
              <div className="w-12 h-12 rounded-lg bg-amber-600/10 text-amber-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">Family Interview</h4>
              <p className="text-stone-600">Meet with our admissions team to discuss your child’s goals and answer any questions.</p>
            </div>
          </li>

          <li className="reveal-on-scroll is-visible" style={{ transitionDelay: "240ms" }}>
            <div className="h-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-brand-900 text-white flex items-center justify-center font-bold shadow-md">5</div>
              <div className="w-12 h-12 rounded-lg bg-brand-900/10 text-brand-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">Decision &amp; Offer</h4>
              <p className="text-stone-600">Admissions decisions are communicated by email. Accepted families receive an offer package.</p>
            </div>
          </li>

          <li className="reveal-on-scroll is-visible" style={{ transitionDelay: "300ms" }}>
            <div className="h-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">6</div>
              <div className="w-12 h-12 rounded-lg bg-amber-600/10 text-amber-600 flex items                center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" /></svg>
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">Enrollment &amp; Orientation</h4>
              <p className="text-stone-600">Confirm your place, submit fees, and attend orientation to begin your journey with us.</p>
            </div>
          </li>
        </ol>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-200 rounded-2xl p-8 reveal-on-scroll is-visible">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-900 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-stone-900">Application Requirements</h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4 text-stone-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-900 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Completed online application form
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-900 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Previous school reports (last 2 years)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-900 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Copy of birth certificate / passport
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-900 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Immunization record
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-900 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Recommendation letter (optional)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-900 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Application fee payment proof
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-900 text-white font-semibold rounded-lg hover:bg-brand-800 transition-colors shadow">
                  Apply Online
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors">
                  Download Checklist (PDF)
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6 reveal-on-scroll is-visible" style={{ transitionDelay: "120ms" }}>
              <h4 className="text-lg font-bold text-stone-900 mb-4">Frequently Asked Questions</h4>
              <div className="space-y-3">
                <details className="group border border-stone-200 rounded-lg p-4">
                  <summary className="flex justify-between items-center cursor-pointer font-medium text-stone-800">
                    When should we apply?
                    <span className="ml-3 text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600">We encourage applications at least 6–9 months prior to the desired start date. Limited mid-year places may be available.</p>
                </details>
                <details className="group border border-stone-200 rounded-lg p-4">
                  <summary className="flex justify-between items-center cursor-pointer font-medium text-stone-800">
                    Are scholarships available?
                    <span className="ml-3 text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600">Yes. Merit- and need-based scholarships are offered. Visit the Admissions &gt; Fees &amp; Scholarships page for details.</p>
                </details>
                <details className="group border border-stone-200 rounded-lg p-4">
                  <summary className="flex justify-between items-center cursor-pointer font-medium text-stone-800">
                    Is there a waiting list?
                    <span className="ml-3 text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600">If a grade is full, qualified applicants may be placed on a waitlist and contacted as places become available.</p>
                </details>
              </div>
              <div className="mt-6">
                <a href="#" className="inline-flex items-center gap-2 text-brand-900 font-semibold hover:gap-3 transition-all">
                  View all Admissions FAQs
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
