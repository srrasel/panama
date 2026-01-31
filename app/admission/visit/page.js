import AdmissionsCTA from "@/components/admission/AdmissionCTA";
import ExploreSection from "@/components/campusVisit/ExploreSection";
import VirtualTourSection from "@/components/campusVisit/VirtualTourSection";
import VisitorPlanningAccordion from "@/components/campusVisit/VisitorPlanningAccordion";
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
  backgroundImage: "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=2070&auto=format&fit=crop",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Admission", href: "/admission" },
  ],
  title: "Campus Visits",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#7e0b1a",
  tintOpacity: 95,
};

export default function VisitPage() {
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />
      <SubNav subNavItems={subNavItems} />
      <AdmissionsCTA />
      <VisitorPlanningAccordion />
      <ExploreSection />
      {/* <CampusToursSection /> */}
      <VirtualTourSection />

      <div className="max-w-7xl mx-auto py-10 px-6 md:px-20 lg:px-32  bg-white">
        <h1 className="text-xl font-bold mb-8">Meet us on the Road</h1>
        <p className="text-[11px] italic text-gray-500 leading-relaxed max-w-5xl">
          There are no events to display
        </p>
      </div>
      <Footer />
    </>
  );
}
