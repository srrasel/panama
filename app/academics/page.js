import AcademicDepartments from "@/components/academic/AcademicDepartment";
import AcademicSection from "@/components/academic/AcademicsSection";
import { CommunityHighlights } from "@/components/academic/CommunityHighlights";
import HarknessSection from "@/components/academic/HarknessSection";
import ResourceSection from "@/components/academic/ResourseSection";
import CallToActionButton from "@/components/common/CallToActionButton";
import SecondHero from "@/components/common/SecondHero";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function Academics() {
  return (
    <>
    <Navbar/>
      <SecondHero
        title="Academics"
        subtitle="Empowered students reach further, look deeper, and achieve to their fullest potential. Thoughtful inquiry fosters curiosity, empathy, and a lifelong love of learning"
        backgroundImage="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
    
      <HarknessSection />
      <AcademicSection />
      <AcademicDepartments />
      <CallToActionButton
        title="Beyond the Classroom"
        description="Pamavambo, there are many opportunities for students to apply and expand their knowledge beyond the classroom."
        buttonText="Go Beyond"
        imagePath="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Students hiking"
      />
      <ResourceSection />
      <CallToActionButton
        title="Leadership"
        description="At Pamavambo is cultivated through example, opportunity, and responsibility. Students develop essential leadership skills through student government, peer mentoring, service projects, and daily practice of our core values in action"
        buttonText="Learn More"
        imagePath="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2070&auto=format&fit=crop"
        imageAlt="leadership"
      />
      <CommunityHighlights />
     <Footer/>
    </>
  );
}
