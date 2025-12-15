


import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import AboutSection from "@/components/sections/about"
import LeadershipSection from "@/components/sections/leadership"
import CommunityVoiceSection from "@/components/sections/communityvoice"
import CampusSection from "@/components/sections/campus"
import AcademicSection from "@/components/sections/academic"
import BlogSection from "@/components/sections/blog"
import Hero from "@/components/hero"
import Overview from "@/components/overview"
import Community from "@/components/community"
import Stat from "@/components/stat"
import CampusLife from "@/components/sections/campuslife"
import Subscribe from "@/components/sections/subscribe"

export default function Home() {
  return (
    <main className="min-h-screen">
  <Navigation/>
      <Hero/>
      <Overview/>
      <Community/>
      <Stat/>
      <AboutSection/>
      <LeadershipSection/>
      <CommunityVoiceSection/>
      <CampusLife/>
      <AcademicSection/>
      <BlogSection/>
      <Subscribe/>
      <Footer />
    </main>
  )
}
