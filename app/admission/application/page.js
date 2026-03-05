import AdmissionsCTA from "@/components/admission/AdmissionCTA";
import AdmissionDecisions from "@/components/application/AdmissionDecisions";
import ApplicationMaterials from "@/components/application/ApllicaionMetarials";
import CampusInterviewSection from "@/components/application/CampusInterview";
import ScholarshipAidSection from "@/components/application/ScholarshipAidSection";
import TestingRequirements from "@/components/application/TestingRequirements";
import SubNav from "@/components/common/SubNav";
import ThirdHero from "@/components/common/ThirdHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const subNavItems = [
  { label: "CAMPUS", href: "/campus" },
  { label: "DINING", href: "/dining" },
  { label: "HEALTH AND WELLNESS", href: "/health" },
  { label: "PUBLIC SAFETY", href: "/safety" },
  { label: "DIVERSITY AND BELONGING", href: "/diversity" },
  { label: "NEWS AND MEDIA", href: "/news" },
];
const heroData = {
  backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Admission", href: "/admission" },
  ],
  title: "Application Process",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#7e0b1a",
  tintOpacity: 95,
};

export default function ApplicationProcessPage() {
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />
      <SubNav subNavItems={subNavItems} />
      <AdmissionsCTA />
      <CampusInterviewSection />
      <ApplicationMaterials />
      <ScholarshipAidSection />
      <TestingRequirements />
      <AdmissionDecisions />
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-20 lg:px-32  bg-white">
        <p className="text-[11px] italic text-gray-500 leading-relaxed max-w-5xl">
          The Pamavambo School does not discriminate on the basis of race,
          color, national or ethnic origin, religion, gender, gender expression,
          sexual orientation, genetic information, or physical or mental
          disabilities in the administration of its admission and scholarship
          aid programs.
        </p>
      </div>
      <Footer />
    </>
  );
}
