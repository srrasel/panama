"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("student@demo.com")
  const [password, setPassword] = useState("demo123")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Login failed")
      } else {
        const data = await res.json()
        const role = data.role
        if (role === "student") router.push("/student/dashboard")
        else if (role === "teacher") router.push("/teacher/dashboard")
        else if (role === "admin") router.push("/admin/dashboard")
        else router.push("/parent/dashboard")
      }
    } catch (err) {
      setError("Network error")
    }
    setLoading(false)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="px-4 py-20 md:py-28 bg-[rgb(127,29,29)] relative overflow-hidden reveal-on-scroll is-visible">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Sign In</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">Access your account to continue learning</p>
          </div>
        </section>
        <div className="mx-auto max-w-md px-4 py-12">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your Panama account</p>
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mb-8">
              <p className="text-sm text-foreground font-semibold mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Student:</span> student@demo.com / demo123
                </p>
              
                <p>
                  <span className="font-medium text-foreground">Teacher:</span> teacher@demo.com / demo123
                </p>
                <p>
                  <span className="font-medium text-foreground">Parent:</span> parent@demo.com / demo123
                </p>
                <p>
                  <span className="font-medium text-foreground">Admin:</span> admin@demo.com / demo123
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              href="/register"
              className="w-full px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors text-center block"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
