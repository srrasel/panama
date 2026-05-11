import AdmissionsCTA from "@/components/admission/AdmissionCTA";
import AdmissionInquiry from "@/components/admission/AdmissionInquiry";
import VisitUsSection from "@/components/admission/VisitUsSection";
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
  backgroundImage: "/new/inqureHero.jpg",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Admission", href: "/admission" },
  ],
  title: "Inquire",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#4A6FA5",
  tintOpacity: 80,
};

export default function InquirePage() {
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />
      <SubNav subNavItems={subNavItems} />
      <AdmissionsCTA />
      <AdmissionInquiry />
      <VisitUsSection />
      <Footer />
    </>
  );
}
