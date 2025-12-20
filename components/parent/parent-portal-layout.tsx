"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  UserCircle, 
  MessageSquare, 
  CalendarDays, 
  Award, 
  Calendar, 
  LogOut,
  Users,
  Library
} from "lucide-react"
import { useParent } from "@/app/parent/ParentContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ParentPortalLayoutProps {
  children: React.ReactNode
  title: string
  breadcrumbs: { label: string; href?: string }[]
}

export default function ParentPortalLayout({ children, title, breadcrumbs }: ParentPortalLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ name: string; email: string; imageUrl?: string } | null>(null)
  
  // Parent Context for Child Switcher
  const { childrenList, selectedChild, setSelectedChild, isLoading } = useParent()

  useEffect(() => {
    // Fetch User Info
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data?.name) setUser(data)
      })
      .catch(err => console.error("Error fetching user:", err))
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      localStorage.removeItem("userRole")
      localStorage.removeItem("userName")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const navLinks = [
    { href: "/parent/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/parent/profile", label: "My Profile", icon: UserCircle },
    { href: "/parent/communication", label: "Communication", icon: MessageSquare },
    { href: "/parent/grades", label: "Grades & Reports", icon: Award },
    { href: "/parent/library", label: "Library", icon: Library },
    { href: "/parent/attendance", label: "Attendance", icon: CalendarDays },
    { href: "/parent/events", label: "Upcoming Events", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Navigation /> */}
       {/* Red Header */}
      <section className="bg-[#7f1d1d] py-28 px-6">
        <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-6xl font-extrabold tracking-tight">{title}</h1>
            <nav className="flex items-center text-lg mt-3 font-semibold">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="text-slate-600 mx-2">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-white hover:text-yellow-500 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-amber-600">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="max-w-[1520px] mx-auto px-6 -mt-16 flex flex-col lg:flex-row gap-6 pb-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-36 h-36 rounded-full border-4 border-white shadow-md overflow-hidden relative">
                    <Image 
                        src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.name || 'Parent'}&background=random`} 
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800">{user?.name || "Parent Name"}</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">
                {user?.email || "parent@example.com"}
              </p>
            </div>

            <hr className="w-4/5 mx-auto" />
            
            {/* Child Switcher Section */}
            {childrenList.length > 0 && (
              <div className="px-4 py-4">
                <p className="text-[10px] uppercase font-bold text-slate-400 px-4 mb-2 tracking-widest">
                   Viewing Child
                </p>
                <Select
                    value={selectedChild?.id}
                    onValueChange={(val) => {
                      const child = childrenList.find((c) => c.id === val)
                      if (child) setSelectedChild(child)
                    }}
                  >
                    <SelectTrigger className="w-full bg-slate-50 border-slate-200 rounded-xl">
                      <SelectValue placeholder="Select Child">
                        <div className="flex items-center gap-2">
                           <span className="truncate font-semibold text-slate-700">{selectedChild?.name}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {childrenList.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            )}

            <nav className="p-4 space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 px-4 mb-2 tracking-widest">
                Menu
              </p>
              {navLinks.map(link => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                 const activeClass = isActive
                    ? "bg-[#007bff] text-white shadow-lg shadow-blue-200 font-semibold" 
                    : "text-slate-500 hover:bg-[#007bff] hover:text-white font-medium"

                return (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl duration-300 transition-all ${activeClass}`}
                  >
                    <link.icon className="w-5 h-5" /> {link.label}
                  </Link>
                )
              })}
              
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl duration-300 hover:text-red-600 transition-all font-medium mt-4"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
            {children}
        </div>
      </section>
    </div>
  )
}
