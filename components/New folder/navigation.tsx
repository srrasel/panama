"use client"

import Link from "next/link"
import { Menu, X, LayoutDashboard, BookOpen, CalendarDays, ClipboardList, Award, User2 } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isStudent = pathname?.startsWith("/student")
  const studentLinks = [
    { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/courses", label: "Courses", icon: BookOpen },
    { href: "/student/continue-learning", label: "Continue", icon: BookOpen },
    { href: "/student/assignments", label: "Assignments", icon: ClipboardList },
    { href: "/student/grades", label: "Grades", icon: Award },
    { href: "/student/schedule", label: "Schedule", icon: CalendarDays },
    { href: "/student/profile", label: "Profile", icon: User2 },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground">
              EduLMS
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Home
            </Link>
            <Link href="/courses" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Courses
            </Link>
            <Link href="/admission" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Admission
            </Link>
            <Link href="/academic" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Academic
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Contact
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              About
            </Link>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isStudent && (
          <div className="hidden md:flex items-center gap-2 py-2 overflow-x-auto">
            {studentLinks.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border ${active ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted"}`}>
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Home
            </Link>
            <Link href="/courses" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Courses
            </Link>
            <Link href="/admission" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Admission
            </Link>
            <Link href="/academic" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Academic
            </Link>
            <Link href="/contact" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Contact
            </Link>
            <Link href="/about" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              About
            </Link>
            {isStudent && (
              <div className="pt-3 border-t border-border space-y-2">
                {studentLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-border hover:bg-muted">
                      <Icon className="h-4 w-4" /> {item.label}
                    </Link>
                  )
                })}
              </div>
            )}
            <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
