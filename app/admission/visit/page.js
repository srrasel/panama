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
  
  { label: "NEWS AND MEDIA", href: "/news" },
];
const heroData = {
  backgroundImage: "/new/Picture14.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Admission", href: "/admission" },
  ],
  title: "Campus Visits",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#1F2A44",
  tintOpacity: 80,
};

export default function VisitPage() {
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />
      <SubNav subNavItems={subNavItems} />
      <AdmissionsCTA />
     
      <ExploreSection />
      {/* <CampusToursSection /> */}
      <VirtualTourSection />

      <div className="w-full bg-[#F7F6F3] py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 font-['Montserrat']">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-baseline gap-4 sm:gap-6">
    {/* Heading using Playfair Display */}
    <h1 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#1F2A44] border-l-4 border-[#D4A437] pl-4 sm:pl-6 tracking-tight uppercase">
      Meet us on the <span className="italic font-medium">Road</span>
    </h1>
    
    {/* Placeholder message using Montserrat */}
    <p className="text-[10px] md:text-[11px] italic text-[#222222] opacity-60 leading-relaxed uppercase tracking-[0.2em] font-semibold">
      There are no events to display
    </p>
  </div>
</div>
      <Footer />
    </>
  );
}
