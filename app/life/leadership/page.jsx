import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import DualActionCards from "@/components/common/DualActionCards";
import HeadOfSchool from "@/components/leadership/HeadOfSchool";
import HeadOfSchoolCommunications from "@/components/leadership/HeadOfSchoolCommunications";
import SeniorStaff from "@/components/leadership/SeniorStaff";
import BoardOfTrustees from "@/components/leadership/BoardOfTrustees";
import TrusteesEmeriti from "@/components/leadership/TrusteesEmeriti";

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <SecondHero
        title="Leadership"
        subtitle="Guiding Pamavambo into the future"
        backgroundImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Life", href: "/life" }]}
      />
      <HeadOfSchool />
      <HeadOfSchoolCommunications />
      <SeniorStaff />
      <BoardOfTrustees />
      <TrusteesEmeriti />
      <DualActionCards />
      <Footer />
    </>
  );
}
