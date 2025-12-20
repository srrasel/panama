"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navclass, setNavClass] = useState("relative")
  
  // Auth state
  const [user, setUser] = useState<{ name: string; role: string; imageUrl?: string; email?: string } | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Fetch user data
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (r.ok) return r.json()
        throw new Error("Not logged in")
      })
      .then((data) => {
        if (data?.name && data?.role) {
          setUser({ 
            name: data.name, 
            role: data.role, 
            imageUrl: data.imageUrl,
            email: data.email 
          })
        }
      })
      .catch(() => setUser(null))
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      setUserMenuOpen(false)
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  const getProfileLink = (role: string) => {
    switch (role) {
      case "student": return "/student/profile"
      case "teacher": return "/teacher/profile"
      case "admin": return "/admin/profile"
      case "parent": return "/parent/profile"
      default: return "/profile"
    }
  }

  const getDashboardLink = (role: string) => {
    switch (role) {
      case "student": return "/student/dashboard"
      case "teacher": return "/teacher/dashboard"
      case "admin": return "/admin/dashboard"
      case "parent": return "/parent/dashboard"
      default: return "/"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <nav className={`${navclass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="font-bold text-xl tracking-tight text-stone-900">
              <Image src="/logo.svg" alt="logo" width={80} height={80} />
            </Link>
          </div>

          <div className="md:hidden flex items-center ml-auto gap-4">
             {/* Mobile User Menu Trigger (if logged in) */}
             {user && (
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700"
                >
                   {user.imageUrl ? (
                      <img src={user.imageUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                   ) : (
                      <span className="text-xs font-bold">{getInitials(user.name)}</span>
                   )}
                </button>
             )}

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
            
            {user ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold overflow-hidden border-2 border-background shadow-sm group-hover:shadow-md transition-all">
                    {user.imageUrl ? (
                      <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{user.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-card p-3 shadow">
                    <div className="flex items-center gap-3 p-2">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold overflow-hidden flex-shrink-0">
                        {user.imageUrl ? (
                          <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{getInitials(user.name)}</span>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                      </div>
                    </div>
                    <div className="mt-2 border-t border-border pt-2">
                      <Link 
                        href={getDashboardLink(user.role)}
                        className="block px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href={getProfileLink(user.role)}
                        className="block px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 bg-[rgb(127,29,29)] text-white font-medium rounded-lg hover:bg-[rgb(107,24,24)] transition-all shadow-lg"
              >
                Login Now
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-stone-100`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {user && (
            <div className="py-4 mb-2 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold overflow-hidden">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
              </div>
              <div>
                <div className="font-bold text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
              </div>
            </div>
          )}
          
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
            {user ? (
               <div className="space-y-3">
                 <Link
                   href={getDashboardLink(user.role)}
                   className="block w-full text-center px-5 py-3 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 transition-all"
                 >
                   Go to Dashboard
                 </Link>
                 <button
                   onClick={handleLogout}
                   className="block w-full text-center px-5 py-3 border border-destructive/20 text-destructive font-medium rounded-lg hover:bg-destructive/10 transition-all"
                 >
                   Logout
                 </button>
               </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center px-5 py-3 bg-[rgb(127,29,29)] text-white font-medium rounded-lg hover:bg-[rgb(107,24,24)] transition-all shadow-lg"
              >
                Login Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
