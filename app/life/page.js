import SecondHero from "@/components/common/SecondHero";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import ActivitySection from "@/components/StudentLife/ActivitySection";
import CampusSection from "@/components/StudentLife/CampusSection";
import CommunalLearningSection from "@/components/StudentLife/CommonalLearningSection";
import CommunitySection from "@/components/StudentLife/CommunitySection";
import CulturalSection from "@/components/StudentLife/CulturalSection";
import DualActionCards from "@/components/StudentLife/DualActionCards";
import SpecialitySection from "@/components/StudentLife/SpecialitySection";
import WelcomeSection from "@/components/StudentLife/WelcomeSection";
import Image from "next/image";
export default function Life() {
  return (
    <>
    <Navbar/>
      <SecondHero
        title="Student
Life"
        subtitle="Are you ready to become a Lawrentian?"
        backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
      <CommunalLearningSection />
      <ActivitySection />
      <WelcomeSection />
      <CulturalSection />
      <CampusSection />
      <CommunitySection />
      <SpecialitySection />
      <DualActionCards />
      <Footer/>
    </>
  );
}
