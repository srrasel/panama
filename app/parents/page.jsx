import SubNav from "@/components/common/SubNav";
import ThirdHero from "@/components/common/ThirdHero";
import ParentsLogin from "@/components/parents/ParentsLogin";

const heroData = {
  backgroundImage: "/beyond/BeyondHero.jpg",
  breadcrumbs: [],
  title: "Log In",
  description: "Please log in to view the content on this page. \n\Thank you!",
  tintColor: "#4A6FA5",
  tintOpacity: 80,
};

const subNavItems = [
  { label: "CAMPUS", href: "/campus" },
  { label: "DINING", href: "/dining" },
  { label: "HEALTH AND WELLNESS", href: "/health" },
  { label: "PUBLIC SAFETY", href: "/safety" },
  { label: "DIVERSITY AND BELONGING", href: "/diversity" },
  { label: "NEWS AND MEDIA", href: "/news" },
];

export default function CommunityPage() {
  return (
    <>
      <ThirdHero {...heroData} />
      <SubNav subNavItems={subNavItems} />
      <ParentsLogin />
    </>
  );
}
