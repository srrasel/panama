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
        backgroundImage="/new/image36.jpeg"
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
