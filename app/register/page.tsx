"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

type UserRole = "student" | "teacher" | "parent"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<"role" | "form">("role")
  const [role, setRole] = useState<UserRole>("student")
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      setLoading(false)
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
    }
    setLoading(false)
  }

  if (step === "role") {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <section className="px-4 py-20 md:py-28 bg-[rgb(127,29,29)]">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Create Your Account</h1>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">Choose your role to get started</p>
            </div>
          </section>
          <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Student Card */}
              <button
                onClick={() => handleRoleSelect("student")}
                className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👨‍🎓</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Student</h3>
                <p className="text-muted-foreground text-sm">Access courses, assignments, and track your progress</p>
              </button>

              {/* Teacher Card */}
              <button
                onClick={() => handleRoleSelect("teacher")}
                className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👨‍🏫</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Teacher</h3>
                <p className="text-muted-foreground text-sm">Create courses, manage students, and track performance</p>
              </button>

              {/* Parent Card */}
              <button
                onClick={() => handleRoleSelect("parent")}
                className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">👨‍👩‍👧</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Parent</h3>
                <p className="text-muted-foreground text-sm">Monitor your child's learning and progress</p>
              </button>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="px-4 py-20 md:py-28 bg-[rgb(127,29,29)]">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{role} Registration</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">Complete your profile to get started</p>
          </div>
        </section>
        <div className="mx-auto max-w-md px-4 py-12">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <button onClick={() => setStep("role")} className="text-primary text-sm font-medium mb-4 hover:underline">
                ← Back to role selection
              </button>
              <h1 className="text-3xl font-bold text-foreground mb-2 capitalize">{role} Registration</h1>
              <p className="text-muted-foreground">Complete your profile</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {role === "instructor" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your University/School"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors mt-6"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-muted-foreground text-sm mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
