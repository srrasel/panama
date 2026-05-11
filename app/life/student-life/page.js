import DualActionCards from "@/components/common/DualActionCards";
import SecondHero from "@/components/common/SecondHero";
import SubNav from "@/components/common/SubNav";
import ActivitySection from "@/components/StudentLife/ActivitySection";
import CampusSection from "@/components/StudentLife/CampusSection";
import CommunalLearningSection from "@/components/StudentLife/CommonalLearningSection";
import CommunitySection from "@/components/StudentLife/CommunitySection";
import CulturalSection from "@/components/StudentLife/CulturalSection";
import SpecialitySection from "@/components/StudentLife/SpecialitySection";
import WelcomeSection from "@/components/StudentLife/WelcomeSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const subNavItems = [
  { label: "CAMPUS", },
  { label: "DINING",},
  { label: "HEALTH AND WELLNESS",},
  { label: "PUBLIC SAFETY", },
  { label: "DIVERSITY AND BELONGING",  },
  { label: "NEWS AND MEDIA",  },
];
export default function StudentLife() {
  return (
    <>
      <Navbar />
      <SecondHero
        title="Student
Life"
        subtitle="Are you ready to become a Panamanian?"
        backgroundImage="/new/image2.jpeg"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
       <SubNav subNavItems={subNavItems} />
      <CommunalLearningSection />
      <ActivitySection />
      <WelcomeSection />
      {/* <CulturalSection />
      <CampusSection />
      <CommunitySection /> */}
      <SpecialitySection />
      <DualActionCards />
      <Footer />
    </>
  );
}
