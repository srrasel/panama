

import Features from "@/components/sections/features"
import Courses from "@/components/sections/courses"
import CTA from "@/components/sections/cta"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import AboutSection from "@/components/sections/about"
import LeadershipSection from "@/components/sections/leadership"
import CommunityVoiceSection from "@/components/sections/communityvoice"
import CampusSection from "@/components/sections/campus"
import AcademicSection from "@/components/sections/academic"
import BlogSection from "@/components/sections/blog"

export default function Home() {
  return (
    <main className="min-h-screen">
  <Navigation/>
      <HeroCarousel/>
      <AboutSection/>
      <LeadershipSection/>
      <CommunityVoiceSection/>
      <CampusSection/>
      <AcademicSection/>
      <BlogSection/>
      
      <Footer />
    </main>
  )
}
