"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLoading } from "@/components/providers/loading-provider"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()
  const [email, setEmail] = useState("student@demo.com")
  const [password, setPassword] = useState("demo123")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    startLoading()
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Login failed")
        setIsSubmitting(false)
        stopLoading()
      } else {
        const data = await res.json()
        const role = data.role
        if (role === "student") router.push("/student/dashboard")
        else if (role === "teacher") router.push("/teacher/dashboard")
        else if (role === "admin") router.push("/admin/dashboard")
        else router.push("/parent/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Network error")
      setIsSubmitting(false)
      stopLoading()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F6F3] font-['Montserrat']">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white shadow-2xl overflow-hidden border border-[#D4A437]/10">
        
        {/* Left Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-[#1F2A44] text-4xl font-['Playfair_Display'] font-bold mb-4 italic">
              Welcome <span className="text-[#D4A437]">Back</span>
            </h1>
            <p className="text-sm text-[#222222]/60">
              Continue your journey of excellence with Pamavambo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-xs text-red-700 font-bold uppercase tracking-wider">{error}</p>
              </div>
            )}

            <div className="group">
              <label className="text-[#1F2A44] text-[11px] font-bold uppercase tracking-widest block mb-2 opacity-70">
                Institutional Email
              </label>
              <div className="relative border-b border-[#1F2A44]/20 group-focus-within:border-[#D4A437] transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-3 pl-0 pr-8 outline-none text-[#1F2A44] text-sm"
                  placeholder="name@pamavambo.org"
                />
                <Mail size={18} className="absolute right-0 top-3 text-[#1F2A44]/30 group-focus-within:text-[#D4A437] transition-colors" />
              </div>
            </div>

            <div className="group">
              <label className="text-[#1F2A44] text-[11px] font-bold uppercase tracking-widest block mb-2 opacity-70">
                Password
              </label>
              <div className="relative border-b border-[#1F2A44]/20 group-focus-within:border-[#D4A437] transition-colors">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent py-3 pl-0 pr-8 outline-none text-[#1F2A44] text-sm"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-[#1F2A44]/30 hover:text-[#D4A437] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="accent-[#D4A437] w-4 h-4 rounded-none border-[#1F2A44]/20" />
                <span className="ml-2 text-[11px] text-[#222222]/70 uppercase tracking-wider font-semibold">Remember Me</span>
              </label>
              <a href="#" className="text-[11px] text-[#D4A437] uppercase tracking-wider font-bold hover:text-[#1F2A44] transition-colors">
                Forgot Access?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1F2A44] text-[#F7F6F3] py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#D4A437] hover:text-[#1F2A44] transition-all duration-500 shadow-xl disabled:opacity-50 group"
            >
              {isSubmitting ? "Authenticating..." : "Sign In"}
            </button>

            <p className="text-center text-[11px] text-[#222222]/60 uppercase tracking-widest pt-4">
              New to the community?{" "}
              <Link href="/register" className="text-[#D4A437] font-bold hover:underline">
                Register Here
              </Link>
            </p>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-10 p-6 bg-[#F7F6F3] border border-[#D4A437]/20">
            <h4 className="text-[10px] font-bold text-[#D4A437] uppercase tracking-[0.2em] mb-3">Demo Portal Access</h4>
            <div className="grid grid-cols-1 gap-2 text-[10px] text-[#1F2A44]/70 font-semibold uppercase tracking-wider">
              <p>Student: student@demo.com / demo123</p>
              <p>Teacher: teacher@demo.com / demo123</p>
              <p>Admin: admin@demo.com / demo123</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image/Branding */}
        <div className="hidden md:block relative group">
          <div className="absolute inset-0 bg-[#1F2A44] z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-700"></div>
          <img 
            src="/new/login.jpeg" 
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
            alt="Pamavambo Campus" 
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-[#F7F6F3] bg-gradient-to-t from-[#1F2A44] to-transparent">
            <h2 className="text-5xl font-['Playfair_Display'] font-bold leading-tight mb-4 italic">
              Excellence <br /> <span className="text-[#D4A437] lowercase">with</span> Purpose.
            </h2>
            <div className="w-20 h-1 bg-[#D4A437] mb-6"></div>
            <p className="text-xs uppercase tracking-[0.3em] font-light opacity-80 leading-loose">
              Join the future of <br /> global learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}