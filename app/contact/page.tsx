"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
 
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    alert("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@thornhill.ac.zw",
      description: "We respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+263 71 808 3975",
      description: "Monday to Friday, 9 AM - 6 PM",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Education Lane, Learning City, LC 12345",
      description: "Visit our campus",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon-Fri: 9 AM - 6 PM",
      description: "Sat-Sun: Closed",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative px-4  pt-[100px] pb-[100px] bg-[rgb(127,29,29)] border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1758612898475-6046681acea8?q=80')] bg-cover bg-center bg-no-repeat bg-fixed opacity-5"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-on-scroll is-visible">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Get In Touch</h1>
              <p className="text-lg md:text-xl text-white/60 text-balance">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon
                return (
                  <div key={idx} className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{info.title}</h3>
                    <p className="font-semibold text-foreground mb-2">{info.details}</p>
                    <p className="text-sm text-foreground/60">{info.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="rounded-xl border border-border bg-card p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                <p className="text-foreground/60 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your message..."
                      rows={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                <div className="rounded-lg border border-border bg-card p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Quick Response Time</h3>
                  <p className="text-foreground/60">
                    Our dedicated support team is ready to assist you. We typically respond to all inquiries within 24
                    business hours.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Multiple Departments</h3>
                  <div className="space-y-3">
                    <p className="text-foreground/60">
                      <span className="font-semibold text-foreground">Admissions:</span> admissions@thornhill.zw
                    </p>
                    <p className="text-foreground/60">
                      <span className="font-semibold text-foreground">Academic:</span> academics@thornhill.zw
                    </p>
                    <p className="text-foreground/60">
                      <span className="font-semibold text-foreground">Technical Support:</span> support@thornhill.zw
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Social Media</h3>
                  <p className="text-foreground/60 mb-4">
                    Connect with us on social media for updates and announcements.
                  </p>
                  <div className="flex gap-3">
                    {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                      <button
                        key={social}
                        className="px-4 py-2 rounded-lg bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition"
                      >
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
