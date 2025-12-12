"use client"
import Image from "next/image"

import { useState,useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navigation () {
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-primary shadow-lg" : "bg-transparent"
  }`}
      >
        <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center px-5 py-4 lg:px-6 lg:py-5">
          {/* Mobile: Hamburger */}
          <button
            id="mobile-open"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7" />
          </button>

          {/* Desktop: Left links */}
          <ul className="hidden items-center gap-10 justify-self-start lg:flex">
            <li>
              <a
                href="/about"
                className="px-2 py-1 text-lg md:text-xl font-medium text-yellow-400/90 transition hover:text-yellow-400"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/admissions"
                className="px-2 py-1 text-lg md:text-xl font-medium text-yellow-400/90 transition hover:text-yellow-400"
              >
                Admissions
              </a>
            </li>
            <li>
              <a
                href="/academics"
                className="px-2 py-1 text-lg md:text-xl font-medium text-yellow-400/90 transition hover:text-yellow-400"
              >
                Academics
              </a>
            </li>
          </ul>

          {/* Logo */}
          <a href="/" className="shrink-0 justify-self-center">
            <div className="h-20 w-auto lg:h-24 bg-white/10 rounded-lg flex items-center justify-center px-3">
              <Image
                src="/logo.png"
                alt="Thornhill University Logo"
                width={150}
                height={60}
                className="h-12 lg:h-16 w-auto"
              />
            </div>
          </a>

          {/* Desktop: Right links */}
          <ul className="hidden items-center gap-10 justify-self-end lg:flex">
            <li>
              <a
                href="#"
                className="px-2 py-1 text-lg md:text-xl font-medium text-yellow-400/90 transition hover:text-yellow-400"
              >
                Research
              </a>
            </li>
            <li className="relative group">
              <button
                className="inline-flex items-center gap-1 px-2 py-1 text-lg md:text-xl font-medium text-yellow-400/90 transition hover:text-yellow-400"
                aria-haspopup="true"
              >
                Pages
                <ChevronDown className="h-5 w-5" />
              </button>
              <div className="invisible absolute right-0 top-full z-40 mt-2 w-44 rounded-lg border border-white/10 bg-amber-900/95 p-2 opacity-0 shadow-lg backdrop-blur transition group-hover:visible group-hover:opacity-100">
                <a
                  href="#news"
                  className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400"
                >
                  News
                </a>
                <a
                  href="#life"
                  className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400"
                >
                  Student Life
                </a>
              </div>
            </li>
            <li>
              <a
                href="/contact"
                className="px-2 py-1 text-lg md:text-xl font-medium text-yellow-400/90 transition hover:text-yellow-400"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                className="rounded-full bg-yellow-400 px-5 py-2 text-base md:text-lg font-semibold text-amber-900 shadow-sm transition hover:bg-yellow-300"
                href="/login"
              >
                Portal
              </a>
            </li>
          </ul>

          {/* Mobile: placeholder for alignment */}
          <div className="h-10 w-10 lg:hidden"></div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-0 top-0 z-40 h-screen bg-primary backdrop-blur-md transition duration-300 lg:hidden ${
            mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
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
              <a href="#research" className="block rounded-lg px-3 py-2 text-white">
                Research
              </a>
            </li>
            <li className="pt-2">
              <div className="rounded-lg bg-white/5 p-2">
                <div className="px-3 pb-1 text-sm text-yellow-400">Pages</div>
                <a href="#news" className="block rounded-md px-3 py-2 text-white/90 hover:bg-white/10">
                  News
                </a>
                <a href="#life" className="block rounded-md px-3 py-2 text-white/90 hover:bg-white/10">
                  Student Life
                </a>
              </div>
            </li>
            <li>
              <a href="#contact" className="block rounded-lg px-3 py-2 text-white">
                Contact
              </a>
            </li>
            <li>
              <a
                className="mt-2 block rounded-full bg-yellow-400 px-4 py-2 text-center font-semibold text-amber-900"
                href="#portal"
              >
                Portal
              </a>
            </li>
          </ul>
        </div>
      </header>
    
  )
}
