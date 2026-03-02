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

      <ResearchInstitutes />
      <EnvironmentalSections />
     
      <StudentClubsAccordion />
      <Footer />
    </>
  );
}
