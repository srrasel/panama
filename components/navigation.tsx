"use client"


 import Image from "next/image"

import { useState,useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navigation({ accentColor = "#7f1d1d" }: { accentColor?: string }) {



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
   <header
        id="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300`}
        style={{ backgroundColor: isScrolled ? accentColor : "transparent" }}
      >
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-5 py-4 lg:px-6 lg:py-4">
          {/* Mobile: Hamburger */}
          <button
            id="mobile-open"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7" />
          </button>

          {/* Logo */}
          <a href="/" className="shrink-0">
            <div className="h-16 w-auto lg:h-16 bg-white/10 rounded-lg flex items-center justify-center px-3">
              <Image
                src="/logo.png"
                alt="Thornhill University Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </a>

          {/* Desktop: Right links */}
          <ul className="hidden items-center gap-8 lg:flex">
            <li>
              <a href="/" className="px-2 py-1 text-lg md:text-xl font-medium text-white/90 transition hover:text-white">Home</a>
            </li>
            <li>
              <a href="/courses" className="px-2 py-1 text-lg md:text-xl font-medium text-white/90 transition hover:text-white">Courses</a>
            </li>
            <li>
              <a href="/admission" className="px-2 py-1 text-lg md:text-xl font-medium text-white/90 transition hover:text-white">Admission</a>
            </li>
            <li>
              <a href="/academic" className="px-2 py-1 text-lg md:text-xl font-medium text-white/90 transition hover:text-white">Academic</a>
            </li>
          
            

            <li>
              <a
                href="/contact"
                className="px-2 py-1 text-lg md:text-xl font-medium text-white/90 transition hover:text-white"
              >
                Contact
              </a>
            </li>
            <li>
              <a className="rounded-full px-5 py-2 text-base md:text-lg font-semibold text-white shadow-sm transition hover:opacity-90" href="/login" style={{ backgroundColor: accentColor }}>
                Portal
              </a>
            </li>
          </ul>

          {/* Mobile: placeholder removed; layout is logo left, menu right */}
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-0 top-0 z-40 h-screen backdrop-blur-md transition duration-300 lg:hidden ${
            mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
          style={{ backgroundColor: accentColor }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className=" bg-white/10 rounded px-2 flex items-center">
             <Image
                src="/logo.png"
                alt="Thornhill University Logo"
                width={120}
                height={60}
                className="h-10 w-auto"
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-white/90"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          <ul className="mx-auto mt-6 max-w-7xl space-y-2 px-6 text-lg">
            <li>
              <a href="#about" className="block rounded-lg px-3 py-2 text-yellow-400">
                About
              </a>
            </li>
            <li>
              <a href="#admissions" className="block rounded-lg px-3 py-2 text-white">
                Admissions
              </a>
            </li>
            <li>
              <a href="#academics" className="block rounded-lg px-3 py-2 text-white">
                Academics
              </a>
            </li>
          
          
            <li>
              <a href="#contact" className="block rounded-lg px-3 py-2 text-white">
                Contact
              </a>
            </li>
            <li>
              <a className="mt-2 block rounded-full px-4 py-2 text-center font-semibold text-white hover:opacity-90" href="#portal" style={{ backgroundColor: accentColor }}>
                Portal
              </a>
            </li>
          </ul>
        </div>
      </header>

  )
}
