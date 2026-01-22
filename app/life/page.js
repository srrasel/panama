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

export default function Life() {
  return (
    <>
    <Navbar/>
      <SecondHero
        title="Student
Life"
        subtitle="Are you ready to become a Lawrentian?"
        backgroundImage="/student_life/students-laughing.jpg" // Ensure this file is in your /public folder
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
