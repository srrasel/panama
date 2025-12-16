


import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import AboutSection from "@/components/sections/about"
import LeadershipSection from "@/components/sections/leadership"
import CommunityVoiceSection from "@/components/sections/communityvoice"
import AcademicSection from "@/components/sections/academic"
import BlogSection from "@/components/sections/blog"
import Community from "@/components/community"
import Stat from "@/components/stat"
import CampusLife from "@/components/sections/campuslife"
import Subscribe from "@/components/sections/subscribe"
import HomeHero from "@/components/homehero"
import School from "@/components/school"

export default function Home() {
  return (
    <main className="min-h-screen">
  <Navigation/>
     
      <HomeHero/>
      <School/>

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
