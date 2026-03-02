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
        subtitle="Are you ready to become a Lawrentian?"
        backgroundImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
      <AdmissionsCTA />
      <AdmissionInquiry />
      <VisitUsSection />
      <ApplicationProcess />
      <AdmissionTeam />
      
     <Footer/>
    </>
  );
}
