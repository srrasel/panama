"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from "lucide-react"
export default function Footer({ accentColor = "#282423" }: { accentColor?: string }) {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="text-white" style={{ backgroundColor: accentColor }}>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Thornhill High School</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Excellence Through Knowledge • Per Spinas Ad Culmina
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Gweru, Zimbabwe</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#academics" className="text-white/80 hover:text-white transition">
                  Academics
                </a>
              </li>
              <li>
                <a href="#admissions" className="text-white/80 hover:text-white transition">
                  Admissions
                </a>
              </li>
              <li>
                <a href="#life" className="text-white/80 hover:text-white transition">
                  Student Life
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-white/80">+263 (0)54 223 345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@thornhill.zw" className="text-white/80 hover:text-white transition">
                  info@thornhill.zw
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="h-10 w-10 rounded-lg border border-white/30 flex items-center justify-center text-white/90 hover:bg-white hover:text-black transition" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-lg border border-white/30 flex items-center justify-center text-white/90 hover:bg-white hover:text-black transition" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-lg border border-white/30 flex items-center justify-center text-white/90 hover:bg-white hover:text-black transition" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <p>&copy; {currentYear} Thornhill High School. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
