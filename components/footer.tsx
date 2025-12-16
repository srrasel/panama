"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from "lucide-react"
export default function Footer({ accentColor = "#282423" }: { accentColor?: string }) {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="reveal-on-scroll is-visible">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-brand-900 rounded-md flex items-center justify-center text-white font-bold shadow-md">
                            P</div>
                        <span className="font-bold text-xl text-white">Pamavambo<span className="text-brand-700">Schools</span></span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed mb-5">
                        Empowering students with knowledge, integrity, and the skills to succeed in a global society.
                    </p>
                    <div className="space-y-2 text-sm text-stone-300">
                        <p>123 Education Drive, Marondera, Zimbabwe</p>
                        <p><a href="tel:+263123456789" className="hover:text-white transition-colors">+263 12 345 6789</a>
                        </p>
                        <p><a href="mailto:info@panamaschool.zw" className="hover:text-white transition-colors">info@panamaschool.zw</a></p>
                    </div>
                    <div className="mt-6 h-0.5 w-24 bg-brand-700"></div>
                </div>

                <div className="reveal-on-scroll is-visible" style={{ transitionDelay: "100ms" }}>
                    <div className="mb-5">
                        <h3 className="text-white font-semibold text-base">Our Campus</h3>
                        <div className="mt-2 h-0.5 w-16 bg-brand-700"></div>
                    </div>
                    <ul className="space-y-3 text-stone-400">
                        <li><Link href="#" className="hover:text-white transition-colors">Planning &amp; Administration</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Campus Safety</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Office of the Chancellor</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Facility Services</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Human Resources</Link></li>
                    </ul>
                </div>

                <div className="reveal-on-scroll is-visible" style={{ transitionDelay: "200ms" }}>
                    <div className="mb-5">
                        <h3 className="text-white font-semibold text-base">Campus Life</h3>
                        <div className="mt-2 h-0.5 w-16 bg-brand-700"></div>
                    </div>
                    <ul className="space-y-3 text-stone-400">
                        <li><Link href="#" className="hover:text-white transition-colors">Accessibility</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Financial Aid</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Food Services</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Housing</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Information Technologies</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Student Life</Link></li>
                    </ul>
                </div>

                <div className="reveal-on-scroll is-visible" style={{ transitionDelay: "300ms" }}>
                    <div className="mb-5">
                        <h3 className="text-white font-semibold text-base">Academics</h3>
                        <div className="mt-2 h-0.5 w-16 bg-brand-700"></div>
                    </div>
                    <ul className="space-y-3 text-stone-400">
                        <li><Link href="#" className="hover:text-white transition-colors">Canvas</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Library</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Time Schedule</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Apply For Admissions</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Pay My Tuition</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                <p className="text-stone-500">© 2025 Panama School. All rights reserved.</p>
                <div className="flex items-center gap-4 text-brand-700">
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                        </svg>
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.25 8.25h4.5v13.5H.25V8.25zm7.5 0h4.31v1.85h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9v7.07h-4.5v-6.27c0-1.5-.03-3.42-2.09-3.42-2.09 0-2.41 1.63-2.41 3.31v6.38h-4.5V8.25z"></path>
                        </svg>
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.5 2.25a1 1 0 110 2 1 1 0 010-2zm-4.5 1a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    </footer>
  )
}
