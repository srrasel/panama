import BeyondContent from "@/components/beyond/BeyondContent";
import BeyondHero from "@/components/beyond/BeyondHero";
import EnvironmentalSections from "@/components/beyond/EnvironmentalSections";
import ResearchInstitutes from "@/components/beyond/ResearchInstitutes";
import StudentClubsAccordion from "@/components/beyond/StudentClubsAccordion";
import CallToActionButton from "@/components/common/CallToActionButton";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function Beyond() {
  return (
    <>
    <Navbar />
      <BeyondHero />
      <BeyondContent />
      <CallToActionButton
        title="Pamavambo Travel Program"
        description="Embark on a transformative experience abroad with Pamavambo."
        buttonText="Learn More"
        imagePath="/new/travals.jpg"
        imageAlt="Students hiking"
      />
      <ResearchInstitutes />
      <EnvironmentalSections />
      <CallToActionButton
        title="Outdoor Classroom"
        description="The Pamavambo Private School’s Outdoor Programs provide students with adventures in the outdoor environment that enhance both academic and non-academic skills like  leadership, community engagement, and character development"
        buttonText="Learn More"
        buttonHref="/life/leadership"
        imagePath="/new/bgoutdoor.jpeg"
        imageAlt="Students hiking"
      />
      <StudentClubsAccordion />
  <Footer/>
    </>
  );
}
