"use client"

import Link from "next/link"
 import Image from "next/image"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const[navclass,setNavClass]=useState("relative")

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
      setNavClass(scrolled ? "fixed top-0 w-full z-50 backdrop-blur-sm border-b border-stone-100 transition-all duration-300 bg-white/95 shadow-sm" : "relative w-full z-50 backdrop-blur-sm border-b border-stone-100 transition-all duration-300 bg-white/80")
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`${navclass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            
            <Link href="/" className="font-bold text-xl tracking-tight text-stone-900">
           <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>
          </div>

          <div className="md:hidden flex items-center ml-auto">
            <button
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="text-stone-700 hover:text-stone-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/" className="text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors">
              Courses
            </Link>
            <Link href="/admission" className="text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors">
              Admission
            </Link>
            <Link href="/academic" className="text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors">
              Academic
            </Link>
            <Link href="/contact" className="text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors">
              Contact
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-[rgb(127,29,29)] text-white font-medium rounded-lg hover:bg-[rgb(107,24,24)] transition-all shadow-lg"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-stone-100`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <Link href="/" className="block py-3 text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors border-b border-stone-100">
            Home
          </Link>
          <Link href="/courses" className="block py-3 text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors border-b border-stone-100">
            Courses
          </Link>
          <Link href="/admission" className="block py-3 text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors border-b border-stone-100">
            Admission
          </Link>
          <Link href="/academic" className="block py-3 text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors border-b border-stone-100">
            Academic
          </Link>
          <Link href="/contact" className="block py-3 text-stone-700 hover:text-[rgb(127,29,29)] font-medium transition-colors border-b border-stone-100">
            Contact
          </Link>
          <div className="pt-4">
            <Link
              href="/login"
              className="block w-full text-center px-5 py-3 bg-[rgb(127,29,29)] text-white font-medium rounded-lg hover:bg-[rgb(107,24,24)] transition-all shadow-lg"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
