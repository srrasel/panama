import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import DualActionCards from "@/components/common/DualActionCards";
import HeadOfSchool from "@/components/leadership/HeadOfSchool";
import Founder from "@/components/leadership/Founder";


export default function LeadershipPage() {
  const cards = [
  {
    title: "Modern Learning Experience",
    description:
      "Students gain real-world knowledge through interactive learning methods and advanced curriculum.",
    buttonText: "Explore Programs",
    href: "/admission/inquire",
    backgroundImage: "/new/image9.jpeg",
  },
  {
    title: "Build Your Future",
    description:
      "Develop leadership, creativity, and problem-solving skills for tomorrow’s challenges.",
    buttonText: "Student Life",
    href: "/life/student-life",
    backgroundImage: "/new/Picture5.png",
  },
];
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
      <Founder/>
      {/* <HeadOfSchoolCommunications /> */}
      {/* <SeniorStaff />
      <BoardOfTrustees />
      <TrusteesEmeriti /> */}
      <DualActionCards cardData={cards} />
      <Footer />
    </>
  );
}
