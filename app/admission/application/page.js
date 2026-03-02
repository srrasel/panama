import ApplicationMaterials from "@/components/application/ApllicaionMetarials";
import ApplicationCTA from "@/components/application/ApplicationCTA";
import SubNav from "@/components/common/SubNav";
import ThirdHero from "@/components/common/ThirdHero";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const subNavItems = [
  { label: "CAMPUS", href: "/campus" },
  { label: "DINING", href: "/dining" },

  { label: "NEWS AND MEDIA", href: "/news" },
];
const heroData = {
  backgroundImage:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
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
      <ApplicationCTA />

      <ApplicationMaterials />

      <Footer />
    </>
  );
}
