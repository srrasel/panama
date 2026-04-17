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
        title="Harkness Travel Program"
        description="Embark on a transformative experience abroad with Pamavambo. From Bali to Brazil, our travel program offers an educational opportunity that will expand your view of the world and of yourself."
        buttonText="Learn More"
        imagePath="/new/image4.jpeg"
        imageAlt="Students hiking"
      />
      <ResearchInstitutes />
      <EnvironmentalSections />
      <CallToActionButton
        title="Outdoor Classroom"
        description="The Pamavambo School’s Outdoor Programs provide students with adventures in the outdoor environment that enhance both academic and non-academic skills like  leadership, community engagement, and character development"
        buttonText="Learn More"
        buttonHref="/life/leadership"
        imagePath="/new/image5.jpeg"
        imageAlt="Students hiking"
      />
      <StudentClubsAccordion />
  <Footer/>
    </>
  );
}
