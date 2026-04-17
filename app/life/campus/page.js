import FeaturedSpaces from "@/components/campus/FesturedSpaces";
import OurLocation from "@/components/campus/OurLocation";
import DualActionCards from "@/components/common/DualActionCards";
import SchoolNewsCarousel from "@/components/common/SchoolNewsCarousel";
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
  backgroundImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Student Life", href: "/life/student-life" },
    { label: "News and Events" }, // Last item without link
  ],
  title: "campus",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#4A6FA5",
  tintOpacity: 95,
};



export default function CampusPage() {
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />
      <SubNav subNavItems={subNavItems} />
      <OurLocation/>
      <FeaturedSpaces/>
      <Footer />
    </>
  );
}
