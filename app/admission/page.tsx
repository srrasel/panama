import AdmissionsCTA from "@/components/admission/AdmissionCTA";
import AdmissionInquiry from "@/components/admission/AdmissionInquiry";
import AdmissionMessages from "@/components/admission/AdmissionMessages";
import AdmissionTeam from "@/components/admission/AdmissionTeam";
import ApplicationProcess from "@/components/admission/ApplicationProcess";
import VisitUsSection from "@/components/admission/VisitUsSection";
import SecondHero from "@/components/common/SecondHero";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function Admission() {
  return (
    <>
    <Navbar/>
      <SecondHero
        title="Admission"
        subtitle=""
        backgroundImage="/new/image2.jpeg"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
      <AdmissionsCTA />
      <AdmissionInquiry />
      <VisitUsSection />
      <ApplicationProcess />
      <AdmissionTeam />
      <AdmissionMessages />
     <Footer/>
    </>
  );
}
