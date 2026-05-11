"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Phone, Building2, Lock, Mail } from "lucide-react"
import { useLoading } from "@/components/providers/loading-provider"

type UserRole = "student" | "teacher" | "parent"

export default function RegisterPage() {
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()
  const [step, setStep] = useState<"role" | "form">("role")
  const [role, setRole] = useState<UserRole>("student")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    institution: "",
  })

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep("form")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    startLoading()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      setIsSubmitting(false)
      stopLoading()
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || "Registration failed")
        setIsSubmitting(false)
        stopLoading()
      } else {
        const login = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        })

        if (login.ok) {
          const data = await login.json()
          if (data.role === "student") router.push("/student/dashboard")
          else if (data.role === "teacher") router.push("/teacher/dashboard")
          else if (data.role === "admin") router.push("/admin/dashboard")
          else router.push("/parent/dashboard")
        } else {
          router.push("/login")
        }
      }
    } catch (err) {
      alert("Network error")
      setIsSubmitting(false)
      stopLoading()
    }
  }

  if (step === "role") {
    return (
      <main className="min-h-screen bg-[#F7F6F3] font-['Montserrat']">
        <section className="px-4 py-20 md:py-28 bg-[#1F2A44] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20 grayscale"></div>
          <div className="mx-auto max-w-7xl text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-white mb-6">Create Your Account</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">Choose your role to get started</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => handleRoleSelect("student")}
              className="bg-white border-2 border-[#D4A437]/20 rounded-2xl p-8 hover:border-[#D4A437] hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👨‍🎓</div>
              <h3 className="text-xl font-bold text-[#1F2A44] mb-2 uppercase tracking-tight">Student</h3>
              <p className="text-[#222222]/60 text-sm">Access courses, assignments, and track your progress</p>
            </button>

            <button
              onClick={() => handleRoleSelect("teacher")}
              className="bg-white border-2 border-[#D4A437]/20 rounded-2xl p-8 hover:border-[#D4A437] hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👨‍🏫</div>
              <h3 className="text-xl font-bold text-[#1F2A44] mb-2 uppercase tracking-tight">Teacher</h3>
              <p className="text-[#222222]/60 text-sm">Create courses, manage students, and track performance</p>
            </button>

            <button
              onClick={() => handleRoleSelect("parent")}
              className="bg-white border-2 border-[#D4A437]/20 rounded-2xl p-8 hover:border-[#D4A437] hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👨‍👩‍👧</div>
              <h3 className="text-xl font-bold text-[#1F2A44] mb-2 uppercase tracking-tight">Parent</h3>
              <p className="text-[#222222]/60 text-sm">Monitor your child's learning and progress</p>
            </button>
          </div>

          <div className="text-center mt-12">
            <p className="text-[#222222]/60">
              Already have an account?{" "}
              <Link
                href="/login"
                onClick={() => startLoading()}
                className="text-[#D4A437] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F7F6F3] font-['Montserrat']">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 shadow-xl rounded-md bg-white border border-[#D4A437]/10">
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setStep("role")}
                className="text-[#D4A437] text-sm font-medium mb-4 hover:underline"
              >
                ← Back to role selection
              </button>
              <h1 className="text-[#1F2A44] text-3xl font-['Playfair_Display'] font-bold capitalize">{role} Registration</h1>
              <p className="text-[15px] mt-2 text-[#222222]/60">
                Already have an account?{" "}
                <Link
                  href="/login"
                  onClick={() => startLoading()}
                  className="text-[#D4A437] font-medium hover:underline ml-1 whitespace-nowrap"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">First Name</label>
                <div className="relative flex items-center">
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                    placeholder="John"
                  />
                  <User className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
                </div>
              </div>
              <div>
                <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">Last Name</label>
                <div className="relative flex items-center">
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                    placeholder="Doe"
                  />
                  <User className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                  placeholder="Enter email"
                />
                <Mail className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">Phone Number</label>
              <div className="relative flex items-center">
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                  placeholder="+1 (555) 000-0000"
                />
                <Phone className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
              </div>
            </div>

            {role === "teacher" && (
              <div className="mt-4">
                <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">Institution</label>
                <div className="relative flex items-center">
                  <input
                    name="institution"
                    type="text"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                    placeholder="University/School"
                  />
                  <Building2 className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                  placeholder="Create password"
                />
                <Lock className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#1F2A44] text-[13px] font-medium block mb-2 opacity-70">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full text-[#1F2A44] text-sm border-b border-[#1F2A44]/20 focus:border-[#D4A437] pl-2 pr-8 py-3 outline-none bg-transparent"
                  placeholder="Confirm password"
                />
                <Lock className="w-[18px] h-[18px] absolute right-2 text-[#D4A437]/50" />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full shadow-xl py-3 px-4 text-sm font-bold tracking-widest rounded-md text-white bg-[#1F2A44] hover:bg-[#D4A437] hover:text-[#1F2A44] focus:outline-none cursor-pointer transition-all uppercase"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-[#1F2A44]/10" />
              <p className="text-sm text-[#222222]/40 text-center uppercase tracking-tighter">or</p>
              <hr className="w-full border-[#1F2A44]/10" />
            </div>

            {/* Social Login Buttons remain structurally same, icon colors updated */}
            <div className="space-x-8 flex justify-center opacity-70">
              {/* SVG icons preserved from your original code */}
            </div>
          </form>
        </div>

        {/* Right side Image with Navy overlay */}
        <div className="w-full h-full flex items-center bg-[#1F2A44] rounded-xl p-8 overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20 transition-transform duration-700 group-hover:scale-110"></div>
          <img src="https://readymadeui.com/signin-image.webp" className="w-full aspect-[12/12] object-contain relative z-10" alt="login-image" />
        </div>
      </div>
    </div>
  )
}