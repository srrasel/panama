import { CommunityHighlights } from "@/components/academic/CommunityHighlights";
import CallToActionButton from "@/components/common/CallToActionButton";
import ThirdHero from "@/components/common/ThirdHero";
import AcademicLeadership from "@/components/community/AcademicLeaderShip";
import FacultySection from "@/components/community/FacultySection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const heroData = {
  backgroundImage: "/beyond/BeyondHero.jpg",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Academics", href: "/academics" },
  ],
  title: "Academic Community",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#7e0b1a",
  tintOpacity: 95,
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />
      <FacultySection />
      <CallToActionButton
        title="
Academic Advising and Support"
        description="Our academic advising structure, peer tutoring, and learning support for qualified individuals encourages students to self-advocate and seek help when they need it."
        buttonText="Learn More"
        imagePath="/academic/GOPR0138.jpg"
        imageAlt="Students hiking"
      />
      <AcademicLeadership />
      <CommunityHighlights />
      <Footer />
    </>
  );
}
