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
        imagePath="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
        imageAlt="Students hiking"
      />
      <ResearchInstitutes />
      <EnvironmentalSections />
      <CallToActionButton
        title="Outdoor Classroom"
        description="The Pamavambo School’s Outdoor Programs provide students with adventures in the outdoor environment that enhance both academic and non-academic skills like  leadership, community engagement, and character development"
        buttonText="Learn More"
        buttonHref="/life/leadership"
        imagePath="https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Students hiking"
      />
      <StudentClubsAccordion />
  <Footer/>
    </>
  );
}
