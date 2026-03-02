import DualActionCards from "@/components/common/DualActionCards";
import SecondHero from "@/components/common/SecondHero";
import Footer from "@/components/footer";
import ImageSection from "@/components/home/ImageSection";
import Navbar from "@/components/Navbar";
import ActivitySection from "@/components/StudentLife/ActivitySection";
import CommunalLearningSection from "@/components/StudentLife/CommonalLearningSection";
import SpecialitySection from "@/components/StudentLife/SpecialitySection";
import WelcomeSection from "@/components/StudentLife/WelcomeSection";

const subNavItems = [
  { label: "CAMPUS", href: "/campus" },
  { label: "DINING", href: "/dining" },
  { label: "HEALTH AND WELLNESS", href: "/health" },
  { label: "PUBLIC SAFETY", href: "/safety" },
  { label: "DIVERSITY AND BELONGING", href: "/diversity" },
  { label: "NEWS AND MEDIA", href: "/news" },
];
export default function StudentLife() {
  return (
    <>
      <Navbar />
      <SecondHero
        title="Student
     Life"
        backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
      <CommunalLearningSection />
      <ActivitySection />
      <WelcomeSection />
      <ImageSection />
      <SpecialitySection />
      <DualActionCards />
      <Footer />
    </>
  );
}
