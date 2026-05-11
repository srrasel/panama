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
        backgroundImage="/new/Picture14.png"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />
      <HarknessSection />
      <AcademicSection />
      <AcademicDepartments />
      <CallToActionButton
        title="Beyond the Classroom"
        description="Learning at Pamavambo, there are many opportunities for students to apply and expand their knowledge beyond the classroom."
        buttonText="Go Beyond"
        buttonHref="/beyond-the-classroom"
        imagePath="/new/image26.jpeg"
        imageAlt="Students hiking"
      />
      <ResourceSection />
      <CallToActionButton
        title="Leadership"
        description="At Pamavambo is cultivated through example, opportunity, and responsibility. Students develop essential leadership skills through student government, peer mentoring, service projects, and daily practice of our core values in action."
        buttonText="Learn More"
        imagePath="/new/image5.jpeg"
        imageAlt="Students hiking"
      />
      <CommunityHighlights />
     <Footer/>
    </>
  );
}
