import Navbar from "@/components/Navbar";
import DualActionCards from "@/components/common/DualActionCards";
import SecondHero from "@/components/common/SecondHero";
import Footer from "@/components/footer";
import Founder from "@/components/leadership/Founder";
import HeadOfSchool from "@/components/leadership/HeadOfSchool";
import HeadOfSchoolCommunications from "@/components/leadership/HeadOfSchoolCommunications";

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <SecondHero
        title="Leadership"
        subtitle="Guiding Pamavambo into the future"
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Life", href: "/life" },
        ]}
      />
      <HeadOfSchool />
      <Founder />
     

      <DualActionCards />
      <Footer />
    </>
  );
}
